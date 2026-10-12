import type Anthropic from "@anthropic-ai/sdk";
import { readFileTool } from "./read-file.js";
import { listFilesTool } from "./list-files.js";
import { editFileTool } from "./edit-file.js";
import { bashTool } from "./bash.js";

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
  {
    name: "list_files",
    description:
      "列出指定目錄底下的檔案和子目錄（不遞迴）。目錄名稱結尾會有 /。",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "目錄路徑，目前目錄用 ." },
      },
      required: ["path"],
    },
  },
  {
    name: "edit_file",
    description:
      "編輯檔案：把 old_string 替換成 new_string。old_string 必須和檔案內容完全一致（含空白縮排）。old_string 為空字串時會用 new_string 建立新檔案。",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "檔案路徑" },
        old_string: { type: "string", description: "要被取代的原始字串" },
        new_string: { type: "string", description: "新的字串" },
      },
      required: ["path", "old_string", "new_string"],
    },
  },
  {
    name: "bash",
    description:
      "在目前工作目錄執行一個 shell 指令，回傳 exit code、stdout 和 stderr。",
    input_schema: {
      type: "object",
      properties: {
        command: { type: "string", description: "要執行的指令" },
      },
      required: ["command"],
    },
  },
];

/**
 * 依 tool name 分派到對應實作，回傳要放進 tool_result 的字串。
 * 出錯時要讓呼叫端能標成 is_error: true。
 */
export async function runTool(name: string, input: unknown): Promise<string> {
  switch (name) {
    case "read_file":
      return readFileTool(input as { path: string });
    case "list_files":
      return listFilesTool(input as { path: string });
    case "edit_file":
      return editFileTool(
        input as { path: string; old_string: string; new_string: string },
      );
    case "bash":
      return bashTool(input as { command: string });
    default:
      throw new Error(`unknown tool: ${name}`);
  }
}
