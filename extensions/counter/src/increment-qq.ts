import { showHUD } from "@raycast/api";
import { incrementCounter } from "./lib";

export default async function Command() {
  const result = await incrementCounter("qq");
  await showHUD(`${result.name}：今天第 ${result.count} 次`, {
    clearRootSearch: true,
  });
}