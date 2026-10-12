import type Anthropic from "@anthropic-ai/sdk";

/**
 * M2/M3：送給 API 的 tool 定義（name、description、input_schema）。
 * 注意：這整個陣列每一輪都會送進 context。
 */
export const tools: Anthropic.Tool[] = [
  // TODO(M2): read_file
  // TODO(M3): list_files, edit_file, bash
];

/**
 * 依 tool name 分派到對應實作，回傳要放進 tool_result 的字串。
 * 出錯時要讓呼叫端能標成 is_error: true。
 */
export async function runTool(name: string, input: unknown): Promise<string> {
  // TODO(M2)
  throw new Error(`unknown tool: ${name}`);
}
