import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Agent } from "./agent.js";

const rl = readline.createInterface({ input, output });
const agent = new Agent(async (question) => {
  const answer = await rl.question(question);
  return answer.trim().toLowerCase() === "y";
});

console.log("ts-claude-code — 輸入訊息開始對話，Ctrl+C 離開\n");

while (true) {
  const line = await rl.question("> ");
  if (!line.trim()) continue;
  await agent.run(line);
}
