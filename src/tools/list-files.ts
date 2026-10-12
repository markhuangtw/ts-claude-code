import { readdir } from "node:fs/promises";

export async function listFilesTool(input: { path: string }): Promise<string> {
  const entries = await readdir(input.path, { withFileTypes: true });
  return entries
    .map((e) => (e.isDirectory() ? `${e.name}/` : e.name))
    .join("\n");
}
