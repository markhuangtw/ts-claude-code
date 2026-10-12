import { readFile, writeFile } from "node:fs/promises";

export async function editFileTool(input: {
  path: string;
  old_string: string;
  new_string: string;
}): Promise<string> {
  if (input.old_string === "") {
    await writeFile(input.path, input.new_string);
    return `已建立 ${input.path}`;
  }

  const content = await readFile(input.path, "utf8");
  if (!content.includes(input.old_string)) {
    throw new Error(`在 ${input.path} 找不到 old_string`);
  }
  // 用函式當 replacement，避免 new_string 裡的 $$、$&、$'、$` 被當成替換指令
  await writeFile(
    input.path,
    content.replace(input.old_string, () => input.new_string),
  );
  return `已修改 ${input.path}`;
}
