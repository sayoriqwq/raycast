import { showToast, Toast } from "@raycast/api";
import { openGhosttyDirectoryInFinder } from "./ghostty";

export default async function () {
  try {
    await openGhosttyDirectoryInFinder();
    await showToast({ style: Toast.Style.Success, title: "Done" });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to get Ghostty directory",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
