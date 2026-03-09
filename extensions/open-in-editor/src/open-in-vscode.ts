import { openInEditor } from "./lib";

export default async function () {
  await openInEditor("com.microsoft.VSCode", "Visual Studio Code");
}
