import { open, type Application } from "@raycast/api";
import { openInEditor } from "./lib";

async function openInCodexWorkspace(path: string, app: Application): Promise<void> {
  await open(path, app);

  const deeplink = new URL("codex://threads/new");
  deeplink.searchParams.set("path", path);
  await open(deeplink.toString(), app);
}

export default async function () {
  await openInEditor("com.openai.codex", "Codex", {
    openPath: openInCodexWorkspace,
  });
}
