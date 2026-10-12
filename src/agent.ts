import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-5-5";
const MAX_TOKENS = 8192;

export class Agent {
  private client = new Anthropic(); // 自動讀 ANTHROPIC_API_KEY
  private messages: Anthropic.MessageParam[] = [];

  /**
   * 處理一則使用者輸入，直到模型不再要求 tool 為止。
   *
   * M1：把 userInput push 進 messages → 呼叫 API → 把回應 push 回 messages → 印出文字
   * M2：如果 stop_reason === "tool_use"，執行 tool、推回 tool_result，再呼叫一次（迴圈）
   */
  async run(userInput: string): Promise<void> {
    // TODO(M1)
    throw new Error("not implemented");
  }
}
