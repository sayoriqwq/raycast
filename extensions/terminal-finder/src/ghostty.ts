import { open } from "@raycast/api";
import { execFileSync, spawnSync } from "node:child_process";

const GHOSTTY_APP_NAME = "Ghostty";
const GHOSTTY_APP_PATH = "/Applications/Ghostty.app";
const GHOSTTY_BUNDLE_ID = "com.mitchellh.ghostty";

function runAppleScript(script: string): string {
  return execFileSync("/usr/bin/osascript", ["-e", script], { encoding: "utf-8" }).trim();
}

function isGhosttyRunning(): boolean {
  return spawnSync("/usr/bin/pgrep", ["-x", "ghostty"]).status === 0;
}

async function openPathInGhostty(path: string, application: string): Promise<void> {
  await open(path, application);
}

export async function openInGhostty(path: string): Promise<void> {
  const attempts: Array<() => Promise<void>> = [
    () => openPathInGhostty(path, GHOSTTY_APP_NAME),
    () => openPathInGhostty(path, GHOSTTY_BUNDLE_ID),
    () => openPathInGhostty(path, GHOSTTY_APP_PATH),
  ];

  let lastError: unknown;

  for (const attempt of attempts) {
    try {
      await attempt();
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to open the directory in Ghostty");
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

function revealGhosttyWorkingDirectoryViaShell(): void {
  if (!isGhosttyRunning()) {
    throw new Error("Ghostty is not running");
  }

  const script = `
    tell application "Finder" to activate
    tell application (POSIX file "${GHOSTTY_APP_PATH}" as text) to activate
    tell application "System Events"
      keystroke "open -a Finder ./"
      key code 76
    end tell
  `;

  runAppleScript(script);
}

export async function openGhosttyDirectoryInFinder(): Promise<void> {
  try {
    const cwd = getGhosttyWorkingDirectory();
    if (!cwd) {
      throw new Error("No active Ghostty directory found");
    }

    await open(cwd);
    return;
  } catch {
    revealGhosttyWorkingDirectoryViaShell();
  }
}
