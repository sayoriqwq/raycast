import { execFileSync } from "node:child_process";
import { open, showToast, Toast } from "@raycast/api";
import { getFinderTargetPath } from "./finder";
import { getWezTermExecutable } from "./wezterm";

export default async function () {
  try {
    const targetPath = await getFinderTargetPath();
    if (!targetPath) {
      await showToast({
        style: Toast.Style.Failure,
        title: "No Finder items or window selected",
      });
      return;
    }

    try {
      execFileSync(getWezTermExecutable(), ["start", "--cwd", targetPath], {
        encoding: "utf-8",
      });
    } catch {
      await open(targetPath, "com.github.wez.wezterm");
    }
    await showToast({ style: Toast.Style.Success, title: "Done" });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to open WezTerm",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
