import { showHUD, LaunchProps } from "@raycast/api";
import { incrementCounter } from "./lib";

export default async function Command(props: LaunchProps<{ arguments: Arguments.IncrementCounter }>) {
  const name = props.arguments.name;

  const result = await incrementCounter(name);
  await showHUD(`${result.name}：今天第 ${result.count} 次`, {
    clearRootSearch: true,
  });
}