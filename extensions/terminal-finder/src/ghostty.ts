import { execFileSync, spawnSync } from "node:child_process";
import { open } from "@raycast/api";

const GHOSTTY_APP_NAME = "Ghostty";
const GHOSTTY_APP_PATH = "/Applications/Ghostty.app";
const GHOSTTY_BUNDLE_ID = "com.mitchellh.ghostty";

function runAppleScript(script: string): string {
  return execFileSync("/usr/bin/osascript", ["-e", script], {
    encoding: "utf-8",
  }).trim();
}

function isGhosttyRunning(): boolean {
  return spawnSync("/usr/bin/pgrep", ["-x", "ghostty"]).status === 0;
}

export async function openInGhostty(path: string): Promise<void> {
  await open(path, GHOSTTY_BUNDLE_ID);
}

function getGhosttyWorkingDirectory(): string {
  const script = `
    using terms from application "${GHOSTTY_APP_NAME}"
      tell application (POSIX file "${GHOSTTY_APP_PATH}" as text)
        return working directory of focused terminal of selected tab of front window
      end tell
    end using terms from
  `;

  return runAppleScript(script);
}

export async function openGhosttyDirectoryInFinder(): Promise<void> {
  if (!isGhosttyRunning()) {
    throw new Error("Ghostty is not running");
  }

  const cwd = getGhosttyWorkingDirectory();
  if (!cwd) {
    throw new Error("No active Ghostty directory found");
  }

  await open(cwd, "com.apple.finder");
}
