import type { Application } from "@raycast/api";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import {
  getApplications,
  getSelectedFinderItems,
  showToast,
  Toast,
} from "@raycast/api";

type OpenTarget = (path: string, app: Application) => Promise<void> | void;

function getFinderWindowPath(): string {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        if (count of windows) is 0 then return ""
        set finderWindow to window 1
        set finderWindowPath to (POSIX path of (target of finderWindow as alias))
        return finderWindowPath
      end tell
    else
      return ""
    end if
  `;
  return execFileSync("/usr/bin/osascript", ["-e", script], {
    encoding: "utf-8",
  }).trim();
}

export async function openInEditor(
  bundleId: string,
  appName: string,
  openTarget: OpenTarget,
): Promise<void> {
  try {
    await openFinderTarget(bundleId, appName, openTarget);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: `Failed to open ${appName}`,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

async function openFinderTarget(
  bundleId: string,
  appName: string,
  openTarget: OpenTarget,
): Promise<void> {
  const apps = await getApplications();
  const app = apps.find((a) => a.bundleId === bundleId);

  if (!app) {
    await showToast({
      style: Toast.Style.Failure,
      title: `${appName} is not installed`,
    });
    return;
  }

  const items = await (async () => {
    try {
      return await getSelectedFinderItems();
    } catch {
      return [];
    }
  })();

  if (items.length > 0) {
    for (const item of items) {
      await openTarget(item.path, app);
    }
    return;
  }

  const windowPath = getFinderWindowPath();

  if (windowPath) {
    await openTarget(windowPath, app);
    return;
  }

  await showToast({
    style: Toast.Style.Failure,
    title: "No Finder items or window selected",
  });
}

export function openInVSCodeNewWindow(path: string, app: Application): void {
  const codePath = join(
    app.path,
    "Contents",
    "Resources",
    "app",
    "bin",
    "code",
  );

  execFileSync(codePath, ["--new-window", path], {
    stdio: "ignore",
  });
}

export function openInZedNewWindow(path: string, app: Application): void {
  const cliPath = join(app.path, "Contents", "MacOS", "cli");

  execFileSync(cliPath, ["-n", path], {
    stdio: "ignore",
  });
}
