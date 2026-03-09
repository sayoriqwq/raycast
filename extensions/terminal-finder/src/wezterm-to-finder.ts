import { open, showToast, Toast } from "@raycast/api";
import { execSync } from "node:child_process";
import { URL } from "node:url";

interface WezTermPane {
  pane_id: number;
  cwd: string;
  is_active: boolean;
}

function getWezTermCwd(): string {
  const output = execSync("/opt/homebrew/bin/wezterm cli list --format json", { encoding: "utf-8" });
  const panes: WezTermPane[] = JSON.parse(output);

  const active = panes.find((p) => p.is_active) ?? panes[0];
  if (!active?.cwd) {
    throw new Error("No active WezTerm pane found");
  }

  // cwd is a file:// URL, convert to path
  return new URL(active.cwd).pathname;
}

export default async function () {
  try {
    const cwd = getWezTermCwd();
    await open(cwd);
    await showToast({ style: Toast.Style.Success, title: "Done" });
  } catch (e) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to get WezTerm directory",
      message: e instanceof Error ? e.message : String(e),
    });
  }
}
