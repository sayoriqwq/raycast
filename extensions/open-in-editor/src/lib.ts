import { getApplications, getSelectedFinderItems, open, showToast, Toast } from "@raycast/api";
import { execSync } from "node:child_process";

function getFinderWindowPath(): string {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        set finderWindow to window 1
        set finderWindowPath to (POSIX path of (target of finderWindow as alias))
        return finderWindowPath
      end tell
    else
      error "Could not get the selected Finder window"
    end if
  `;
  return execSync(`osascript -e '${script.replace(/'/g, "'\\''")}'`, { encoding: "utf-8" }).trim();
}

export async function openInEditor(bundleId: string, appName: string): Promise<void> {
  const apps = await getApplications();
  const app = apps.find((a) => a.bundleId === bundleId);

  if (!app) {
    await showToast({
      style: Toast.Style.Failure,
      title: `${appName} is not installed`,
    });
    return;
  }

  try {
    const items = await getSelectedFinderItems();
    if (items.length > 0) {
      for (const item of items) {
        await open(item.path, app);
      }
      return;
    }
  } catch {
    // No selected items, fall through to window path
  }

  try {
    const windowPath = getFinderWindowPath();
    if (windowPath) {
      await open(windowPath, app);
      return;
    }
  } catch {
    // Could not get window path
  }

  await showToast({
    style: Toast.Style.Failure,
    title: "No Finder items or window selected",
  });
}
