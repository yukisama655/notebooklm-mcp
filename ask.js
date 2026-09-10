import { AuthManager } from "./dist/auth/auth-manager.js";
import { SessionManager } from "./dist/session/session-manager.js";
import { ensureDirectories } from "./dist/config.js";

const DEFAULT_NOTEBOOK_URL = "https://notebook.google.com/notebook/7e83cd00-7b59-44f5-a63c-214c508075b4";

async function main() {
  const question = process.argv.slice(2).join(" ").trim();
  if (!question) {
    console.log("Cách dùng: node ask.js \"<câu hỏi của bạn>\"");
    console.log("Ví dụ:     node ask.js \"Tóm tắt thuật toán Apriori\"");
    process.exit(1);
  }

  await ensureDirectories();
  const auth = new AuthManager();
  const sessionMgr = new SessionManager(auth);

  console.log(`💬 Đang gửi câu hỏi đến NotebookLM: "${question}"...`);
  const session = await sessionMgr.getOrCreateSession(undefined, DEFAULT_NOTEBOOK_URL);

  const answer = await session.ask(question, (msg) => console.log(`  [Tiến trình] ${msg}`));

  console.log("\n==================== PHẢN HỒI ====================\n");
  console.log(answer);
  console.log("\n===================================================\n");

  await sessionMgr.closeAllSessions();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Lỗi:", err);
  process.exit(1);
});
