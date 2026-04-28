import { openInEditor, openInZedNewWindow } from "./lib";

export default async function () {
  await openInEditor("dev.zed.Zed-Preview", "Zed Preview", {
    openPath: openInZedNewWindow,
  });
}
