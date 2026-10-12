import type Anthropic from "@anthropic-ai/sdk";
import { readFileTool } from "./read-file.js";

/**
 * M2/M3：送給 API 的 tool 定義（name、description、input_schema）。
 * 注意：這整個陣列每一輪都會送進 context。
 */
export const tools: Anthropic.Tool[] = [
  {
    name: "read_file",
    description: "讀取指定路徑的檔案內容。路徑相對於目前工作目錄",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "檔案路徑" },
      },
      required: ["path"],
    },
  },
  // TODO(M3): list_files, edit_file, bash
];

/**
 * 依 tool name 分派到對應實作，回傳要放進 tool_result 的字串。
 * 出錯時要讓呼叫端能標成 is_error: true。
 */
export async function runTool(name: string, input: unknown): Promise<string> {
  switch (name) {
    case "read_file":
      return readFileTool(input as { path: string });
    default:
      throw new Error(`unknown tool: ${name}`);
  }
}
