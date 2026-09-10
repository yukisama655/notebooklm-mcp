import { AuthManager } from "./src/auth/auth-manager.js";
import { ensureDirectories } from "./src/config.js";

async function main() {
  await ensureDirectories();
  const auth = new AuthManager();
  console.log("🚀 Running interactive Google Login for NotebookLM...");
  const success = await auth.performSetup(async (msg) => {
    console.log("[Progress]", msg);
  });
  if (success) {
    console.log("✅ SUCCESS: Google login saved to persistent profile.");
  } else {
    console.log("❌ FAILED: Authentication was not completed.");
  }
}

main().catch(console.error);
