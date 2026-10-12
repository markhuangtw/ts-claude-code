import Anthropic from "@anthropic-ai/sdk";
import { tools, runTool } from "./tools/index.js";

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
    this.messages.push({ role: "user", content: userInput });

    while (true) {
      const res = await this.client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: this.messages,
        tools,
      });

      this.messages.push({ role: "assistant", content: res.content });

      for (const block of res.content) {
        if (block.type === "text") console.log(block.text);
        if (block.type === "tool_use")
          console.log(`[tool_use] ${block.name}`, block.input);
      }
      console.log(`[stop_reason] ${res.stop_reason}`);
      console.log(
        `[usage] in=${res.usage.input_tokens} out=${res.usage.output_tokens}`,
      );

      if (res.stop_reason !== "tool_use") break;

      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const block of res.content) {
        if (block.type !== "tool_use") continue;

        try {
          const output = await runTool(block.name, block.input);
          results.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: output,
          });
        } catch (err) {
          results.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: String(err),
            is_error: true,
          });
        }
      }
      this.messages.push({ role: "user", content: results });
    }
  }
}
