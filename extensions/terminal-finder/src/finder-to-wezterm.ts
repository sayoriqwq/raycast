import { getSelectedFinderItems, open, showToast, Toast } from "@raycast/api";
import { execSync } from "node:child_process";

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
  return execSync(`osascript -e '${script.replace(/'/g, "'\\''")}'`, { encoding: "utf-8" }).trim();
}

export default async function () {
  let targetPath: string | undefined;

  try {
    const items = await getSelectedFinderItems();
    if (items.length > 0) {
      targetPath = items[0].path;
    }
  } catch {
    // no selection
  }

  if (!targetPath) {
    try {
      targetPath = getFinderWindowPath();
    } catch {
      // no window
    }
  }

  if (!targetPath) {
    await showToast({ style: Toast.Style.Failure, title: "No Finder items or window selected" });
    return;
  }

  try {
    execSync(`/opt/homebrew/bin/wezterm start --cwd "${targetPath}"`, { encoding: "utf-8" });
    await showToast({ style: Toast.Style.Success, title: "Done" });
  } catch {
    await open(targetPath, "com.github.wez.wezterm");
    await showToast({ style: Toast.Style.Success, title: "Done" });
  }
}
