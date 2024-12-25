import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summariseCode } from "./gemini";
import { db } from "@/server/db";

export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
      ".gitignore",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  console.log(`Loaded ${docs.length} documents from the GitHub repository.`);
  return docs;
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);
  const allEmbeddings = await generateEmbeddings(docs);

  await Promise.allSettled(
    allEmbeddings.map(async (embedding, index) => {
      console.log(
        `Processing ${index + 1} of ${allEmbeddings.length} embeddings.`,
      );
      if (!embedding) {
        console.warn(
          `Skipping document ${index + 1} due to missing embedding.`,
        );
        return;
      }

      try {
        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
          data: {
            summary: embedding.summary,
            sourceCode: embedding.sourceCode,
            fileName: embedding.filename,
            projectId,
          },
        });

        // Prisma doesn't support direct vector insertion, so we use raw SQL for vector update
        await db.$executeRaw`
          UPDATE "SourceCodeEmbedding"
          SET "summaryEmbedding" = ${embedding.embedding}::vector
          WHERE "id" = ${sourceCodeEmbedding.id}
        `;
      } catch (error) {
        console.error(
          `Error inserting embedding for document ${index + 1}:`,
          error,
        );
      }
    }),
  );
};

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc, index) => {
      try {
        console.log(
          `Summarizing code for document ${index + 1}: ${doc.metadata.source}`,
        );
        const summary = await summariseCode(doc);
        if (!summary) {
          console.warn(
            `No summary generated for document ${doc.metadata.source}`,
          );
          return null;
        }

        console.log(
          `Generating embedding for document ${index + 1}: ${doc.metadata.source}`,
        );
        const embedding = await generateEmbedding(summary);
        if (!embedding) {
          console.warn(
            `No embedding generated for document ${doc.metadata.source}`,
          );
          return null;
        }

        return {
          summary,
          embedding,
          sourceCode: JSON.parse(
            JSON.stringify(doc.pageContent.replace(/\x00/g, "")),
          ),
          filename: doc.metadata.source,
        };
      } catch (error) {
        console.error(
          `Error processing document ${doc.metadata.source}:`,
          error,
        );
        return null; // Skip this document on error
      }
    }),
  );
};
