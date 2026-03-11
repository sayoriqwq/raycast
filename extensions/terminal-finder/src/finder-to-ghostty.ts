import { showToast, Toast } from "@raycast/api";
import { getFinderTargetPath } from "./finder";
import { openInGhostty } from "./ghostty";

export default async function () {
  const targetPath = await getFinderTargetPath();

  if (!targetPath) {
    await showToast({ style: Toast.Style.Failure, title: "No Finder items or window selected" });
    return;
  }

  try {
    await openInGhostty(targetPath);
    await showToast({ style: Toast.Style.Success, title: "Done" });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to open Ghostty",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
