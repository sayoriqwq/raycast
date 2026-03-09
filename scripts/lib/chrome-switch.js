ObjC.import("Foundation");

const Chrome = Application("Google Chrome");
const System = Application.currentApplication();
System.includeStandardAdditions = true; // 启用 doShellScript 等标准功能

function readTextFile(path) {
  const content = $.NSString.stringWithContentsOfFileEncodingError(
    $(path),
    $.NSUTF8StringEncoding,
    null
  );

  if (!content) {
    throw new Error(`Failed to read config: ${path}`);
  }

  return ObjC.unwrap(content);
}

function loadConfig(configPath) {
  const parsed = JSON.parse(readTextFile(configPath));

  if (!Array.isArray(parsed.targetList) || parsed.targetList.length === 0) {
    throw new Error("Config targetList must be a non-empty array");
  }

  if (typeof parsed.defaultURL !== "string" || parsed.defaultURL.length === 0) {
    throw new Error("Config defaultURL must be a non-empty string");
  }

  return parsed;
}

// 判断 URL 是否匹配目标域名列表（支持子域名，如 xxx.chatgpt.com）
function matchesTargetURL(url, candidateList) {
  if (!url) return false;
  const urlString = String(url);

  // 提取 hostname：取 "://" 到第一个 "/", "?", "#" 之间的部分
  const match = urlString.match(/^https?:\/\/([^\/\?#]+)/i);
  if (!match) return false;
  const hostname = match[1].toLowerCase();

  return candidateList.some((target) => {
    const lowerTarget = target.toLowerCase();
    return hostname === lowerTarget || hostname.endsWith("." + lowerTarget);
  });
}

// 识别自动化/开发相关 URL，避免在 DevTools 等窗口中操作
function looksLikeAutomationURL(url) {
  if (!url) return true;
  const value = String(url);

  return (
    value.startsWith("devtools://") ||
    value.startsWith("chrome://") ||
    value.startsWith("about:blank") ||
    value.startsWith("data:") ||
    value.includes("localhost") ||
    value.includes("127.0.0.1") ||
    value.includes("::1")
  );
}

// 过滤非标准窗口（如最小化、DevTools 面板等）
function isNormalWindow(window) {
  try {
    return window.mode() === "normal";
  } catch (_) {
    return false;
  }
}

// 遍历所有窗口和 tab，查找匹配目标域名的 tab
// 返回 { windowIndex, tabIndex }：找到则两者 >= 0，未找到则 tabIndex = -1
// 同时记录第一个含"人类 tab"的窗口作为候选（用于后续新建 tab）
function findTargetTab(targetList) {
  const windows = Chrome.windows();
  let candidateWindowIndex = -1;

  for (let windowIndex = 0; windowIndex < windows.length; windowIndex += 1) {
    const window = windows[windowIndex];
    if (!isNormalWindow(window)) continue;

    let hasHumanTab = false;
    const tabs = window.tabs();

    for (let tabIndex = 0; tabIndex < tabs.length; tabIndex += 1) {
      const tab = tabs[tabIndex];
      let url = "";

      try {
        url = tab.url();
      } catch (_) {
        url = "";
      }

      if (matchesTargetURL(url, targetList)) {
        return { windowIndex, tabIndex };
      }

      if (!looksLikeAutomationURL(url)) {
        hasHumanTab = true;
      }
    }

    // 记录第一个包含正常网页的窗口，作为新建 tab 的候选
    if (candidateWindowIndex === -1 && hasHumanTab) {
      candidateWindowIndex = windowIndex;
    }
  }

  return { windowIndex: candidateWindowIndex, tabIndex: -1 };
}

// 通过 macOS open 命令打开 URL，Chrome 会直接创建加载该 URL 的窗口
// 比 JXA 的 Chrome.Window().make() 更可靠：无默认 tab 闪烁，无 delay 崩溃
function openViaShell(url) {
  System.doShellScript(`open -a "Google Chrome" "${url}"`);
}

function run(argv) {
  if (argv.length !== 1) {
    throw new Error("Expected exactly one config path");
  }

  const config = loadConfig(argv[0]);

  Chrome.activate();
  if (!Chrome.running()) {
    $.NSThread.sleepForTimeInterval(0.2); // 等 Chrome 启动，不用 System.delay 避免 -1708
  }

  const { windowIndex, tabIndex } = findTargetTab(config.targetList);
  const windows = Chrome.windows();

  // 分支 1：找到已有 tab → 聚焦该窗口和 tab
  if (windowIndex >= 0 && tabIndex >= 0 && windowIndex < windows.length) {
    const window = windows[windowIndex];
    window.activeTabIndex = tabIndex + 1; // JXA 的 tab 索引从 1 开始
    window.index = 1;                     // 将窗口提到最前
    return;
  }

  // 分支 2：Chrome 无窗口 → 用 open -a 直接打开（避免默认 tab 闪烁）
  if (windows.length === 0) {
    openViaShell(config.defaultURL);
    return;
  }

  // 分支 3：有窗口但无匹配 tab → 在候选窗口中新建 tab
  const candidateIndex = windowIndex >= 0 ? windowIndex : 0;
  const candidateWindow = windows[candidateIndex];
  candidateWindow.tabs.push(Chrome.Tab({ url: config.defaultURL }));
  candidateWindow.activeTabIndex = candidateWindow.tabs().length; // 切到新 tab
  candidateWindow.index = 1;
}
