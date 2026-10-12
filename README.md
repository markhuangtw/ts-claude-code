# ts-claude-code

用 TypeScript 從零打造的迷你 coding agent，仿照 [Claude Code](https://claude.com/claude-code) 的運作方式，用來學習 AI agent 的核心原理。

在終端機裡跟它對話，它會透過 Claude API 理解你的需求，並自己呼叫工具來讀取、搜尋、修改你電腦上的程式碼，或執行指令。

## 運作方式

核心是一個 **agent loop**：

1. 把你的訊息連同對話歷史送給 Claude
2. 如果 Claude 回覆需要使用工具（`stop_reason === "tool_use"`），就在本機執行該工具
3. 把工具結果送回給 Claude，重複這個流程，直到它給出最終回答

## 可用工具

| 工具         | 說明                             |
| ------------ | -------------------------------- |
| `read_file`  | 讀取檔案內容                     |
| `list_files` | 列出目錄中的檔案                 |
| `edit_file`  | 修改檔案內容                     |
| `bash`       | 執行 shell 指令（執行前會詢問你） |

## 快速開始

```bash
pnpm install
cp .env.example .env   # 填入你的 ANTHROPIC_API_KEY
pnpm start
```
