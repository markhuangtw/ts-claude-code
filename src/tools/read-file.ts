import { readFile } from "node:fs/promises";

export async function readFileTool(input: { path: string }): Promise<string> {
  return await readFile(input.path, "utf8");
}
