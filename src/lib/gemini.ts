import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Helper function to chunk large text
function chunkText(text: string, maxLength: number): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  return chunks;
}

// Helper function to preprocess code by removing comments and trimming
function preprocessCode(code: string): string {
  return code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "").trim(); // Removes single-line and multi-line comments
}

// Summarize Git diffs
export const aiSummariseCommit = async (diff: string) => {
  const response = await model.generateContent([
    `You are an expert programmer summarizing a git diff.
      [...]
      EXAMPLE SUMMARY COMMENTS:
      \`\`\`
      *Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts]
      *Fixed a typo in the GitHub action named [.github/workflows/gpt-commit-summarizer.yml]
      *Moved the \`octokit\` initialization to a separate file [src/octokit.ts],[src/index.ts]
      *Added an OpenAi API for completions [packages/utils/apis/openai.ts]
      *Lowered numeric tolerance for test files
      \`\`\`
      Do not include parts of the example in your summary. It is only given as an example of appropriate comments.
      Please summarise the following diff file:
      ---
      ${diff}
      ---`,
  ]);
  return response.response.text();
};

// Summarize a code file
export async function summariseCode(doc: Document) {
  console.log("Getting summary for ", doc.metadata.source);
  try {
    const code = preprocessCode(doc.pageContent).slice(0, 10000); // Preprocess and truncate to 10,000 chars
    const chunks = chunkText(code, 3000); // Chunk code into manageable parts
    const summaries = [];

    for (const chunk of chunks) {
      const response = await model.generateContent([
        `You are a senior software engineer onboarding a junior engineer.
        Provide a concise (≤100 words) summary explaining the purpose of the following code chunk:
        ---
        ${chunk}
        ---
        File: ${doc.metadata.source}`,
      ]);
      summaries.push(response.response.text());
    }

    // Combine chunk summaries into a final summary
    const finalSummary = await model.generateContent([
      `Summarise these chunk summaries into one cohesive summary:
      ---
      ${summaries.join("\n")}
      ---`,
    ]);

    return finalSummary.response.text();
  } catch (error: any) {
    console.error("Error in summariseCode:", error.message);
    return "";
  }
}

// Generate embeddings for summaries
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export async function generateEmbedding(summary: string) {
  try {
    const result = await embeddingModel.embedContent(summary);
    const embedding = result.embedding;
    return embedding.values;
  } catch (error: any) {
    console.error("Error in generateEmbedding:", error.message);
    return [];
  }
}
