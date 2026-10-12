import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function bashTool(input: { command: string }): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(input.command);
    return `exit code: 0\n${stdout}${stderr}`;
  } catch (err: any) {
    return `exit code: ${err.code}\n${err.stdout ?? ""}${err.stderr ?? ""}`;
  }
}
