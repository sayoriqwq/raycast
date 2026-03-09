import { getPreferenceValues, LaunchProps, openExtensionPreferences, showHUD, showToast, Toast } from "@raycast/api";
import { incrementCounter } from "./lib";

type CommandArguments = {
  target?: string;
};

type CommandPreferences = {
  defaultCounter?: string;
  counterAliases?: string;
  dataDirectory?: string;
  timeZone?: string;
};

class MissingCounterTargetError extends Error {
  constructor() {
    super("Counter target is missing");
    this.name = "MissingCounterTargetError";
  }
}

function parseAliasMap(raw?: string): Map<string, string> {
  const map = new Map<string, string>();
  if (!raw?.trim()) {
    return map;
  }

  const pairs = raw
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  for (const pair of pairs) {
    const [aliasRaw, targetRaw] = pair.split(/[=:]/, 2);
    const alias = aliasRaw?.trim().toLowerCase();
    const target = targetRaw?.trim();
    if (alias && target) {
      map.set(alias, target);
    }
  }

  return map;
}

function resolveTarget(argumentsValue: string | undefined, preferences: CommandPreferences): string {
  const targetFromArgs = argumentsValue?.trim();
  const sourceTarget = targetFromArgs || preferences.defaultCounter?.trim();

  if (!sourceTarget) {
    throw new MissingCounterTargetError();
  }

  const aliasMap = parseAliasMap(preferences.counterAliases);
  return aliasMap.get(sourceTarget.toLowerCase()) ?? sourceTarget;
}

export default async function Command(props: LaunchProps<{ arguments: CommandArguments }>) {
  const preferences = getPreferenceValues<CommandPreferences>();

  try {
    const target = resolveTarget(props.arguments.target, preferences);
    const result = await incrementCounter(target, {
      dataDirectory: preferences.dataDirectory,
      timeZone: preferences.timeZone,
    });

    await showHUD(`${result.name}：今天第 ${result.count} 次`, {
      clearRootSearch: true,
    });
  } catch (error) {
    if (error instanceof MissingCounterTargetError) {
      await showToast({
        style: Toast.Style.Failure,
        title: "缺少计数目标",
        message: "请先在扩展偏好设置中填写 Default Counter，或传入 target 参数",
      });
      await openExtensionPreferences();
      return;
    }

    await showToast({
      style: Toast.Style.Failure,
      title: "计数失败",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
