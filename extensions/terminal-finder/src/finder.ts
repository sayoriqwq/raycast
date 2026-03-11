import { getSelectedFinderItems } from "@raycast/api";
import { execFileSync } from "node:child_process";

function runAppleScript(script: string): string {
  return execFileSync("/usr/bin/osascript", ["-e", script], { encoding: "utf-8" }).trim();
}

function getFinderWindowPath(): string {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        set finderWindow to window 1
        return POSIX path of (target of finderWindow as alias)
      end tell
    else
      error "Could not get the selected Finder window"
    end if
  `;

  return runAppleScript(script);
}

export async function getFinderTargetPath(): Promise<string | undefined> {
  try {
    const items = await getSelectedFinderItems();
    if (items.length > 0) {
      return items[0].path;
    }
  } catch {
    // Ignore selection lookup failures and fall back to the front Finder window.
  }

  try {
    return getFinderWindowPath();
  } catch {
    return undefined;
  }
}
