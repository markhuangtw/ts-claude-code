import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Agent } from "./agent.js";

const agent = new Agent();
const rl = readline.createInterface({ input, output });

console.log("ts-claude-code — 輸入訊息開始對話，Ctrl+C 離開\n");

while (true) {
  const line = await rl.question("> ");
  if (!line.trim()) continue;
  await agent.run(line);
}
