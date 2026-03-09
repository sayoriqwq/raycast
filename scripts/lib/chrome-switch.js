ObjC.import("Foundation");

const Chrome = Application("Google Chrome");
const System = Application.currentApplication();
System.includeStandardAdditions = true;

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

function matchesTargetURL(url, candidateList) {
  if (!url) return false;
  const urlString = String(url);
  
  // Extract hostname: everything between "://" and the first "/", "?", or "#"
  const match = urlString.match(/^https?:\/\/([^\/\?#]+)/i);
  if (!match) return false;
  const hostname = match[1].toLowerCase();

  return candidateList.some((target) => {
    const lowerTarget = target.toLowerCase();
    // Match if hostname is exactly the target or ends with ".target" (subdomain)
    return hostname === lowerTarget || hostname.endsWith("." + lowerTarget);
  });
}

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

function isNormalWindow(window) {
  try {
    return window.mode() === "normal";
  } catch (_) {
    return false;
  }
}

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

    if (candidateWindowIndex === -1 && hasHumanTab) {
      candidateWindowIndex = windowIndex;
    }
  }

  return { windowIndex: candidateWindowIndex, tabIndex: -1 };
}

function ensureCandidateWindow(candidateWindowIndex) {
  const windows = Chrome.windows();
  if (candidateWindowIndex >= 0 && candidateWindowIndex < windows.length) {
    return windows[candidateWindowIndex];
  }

  Chrome.Window().make();
  System.delay(0.1);
  return Chrome.windows()[0];
}

function run(argv) {
  if (argv.length !== 1) {
    throw new Error("Expected exactly one config path");
  }

  const config = loadConfig(argv[0]);

  Chrome.activate();
  if (!Chrome.running()) {
    System.delay(0.2);
  }

  const { windowIndex, tabIndex } = findTargetTab(config.targetList);
  const windows = Chrome.windows();

  if (windowIndex >= 0 && tabIndex >= 0 && windowIndex < windows.length) {
    const window = windows[windowIndex];
    window.activeTabIndex = tabIndex + 1;
    window.index = 1;
    return;
  }

  const candidateWindow = ensureCandidateWindow(windowIndex);
  candidateWindow.tabs.push(Chrome.Tab({ url: config.defaultURL }));
  candidateWindow.activeTabIndex = candidateWindow.tabs().length;
  candidateWindow.index = 1;
}
