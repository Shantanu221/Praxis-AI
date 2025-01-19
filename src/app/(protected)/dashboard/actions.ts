"use server";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import { db } from "@/server/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askQuestion(question: string, projectId: string) {
  if (!question.trim()) {
    throw new Error("Question cannot be empty or only whitespace.");
  }

  if (!projectId) {
    throw new Error("Project ID is required.");
  }

  const stream = createStreamableValue();

  //console.log("projectId", projectId);

  try {
    // Generate query vector for the question
    const queryVector = await generateEmbedding(question);
    const vectorQuery = `[${queryVector.join(",")}]`;

    // Query the database for relevant files
    const result = (await db.$queryRaw`
      SELECT "fileName", "sourceCode", "summary",
      1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
      FROM "SourceCodeEmbedding"
      WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
      AND "projectId" = ${projectId}
      ORDER BY similarity DESC
      LIMIT 10
    `) as { fileName: string; sourceCode: string; summary: string }[];

    // Build context block from query results
    let context = result
      .map(
        (doc) =>
          `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\nsummary of file: ${doc.summary}\n\n`,
      )
      .join("");

    // Stream the AI response asynchronously
    (async () => {
      const { textStream } = await streamText({
        model: google("gemini-1.5-flash"),
        prompt: `
          You are an AI code assistant who answers questions about a codebase. Your target audience is a technical intern who is trying to understand the codebase.
          The AI assistant has expert knowledge, is helpful, and provides detailed, step-by-step explanations, including code snippets when necessary.

          AI is professional, precise, and well-mannered.
          If a question asks about a specific file or code, provide a detailed answer with step-by-step instructions. Use markdown syntax, and include code snippets where needed.

          START OF CONTEXT BLOCK
          ${context}
          END OF CONTEXT BLOCK

          If the context does not provide the answer to the question, the AI assistant will say: "I'm sorry, but I don't know the answer based on the provided context." 
          The assistant will not apologize for previous responses but will adjust based on new context provided. It will never invent information that is not explicitly drawn from the context.
          QUESTION:${question}
        `,
      });

      for await (const delta of textStream) {
        stream.update(delta);
      }
      stream.done();
    })();

    return {
      output: stream.value,
      fileReferences: result,
    };
  } catch (error) {
    console.error("Error processing the question:", error);
    stream.done();
    throw new Error("An error occurred while processing the question.");
  }
}
