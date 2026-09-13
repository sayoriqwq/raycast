"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/open-in-vscode.ts
var open_in_vscode_exports = {};
__export(open_in_vscode_exports, {
  default: () => open_in_vscode_default
});
module.exports = __toCommonJS(open_in_vscode_exports);

// src/lib.ts
var import_node_child_process = require("node:child_process");
var import_node_path = require("node:path");
var import_api = require("@raycast/api");
function getFinderWindowPath() {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        if (count of windows) is 0 then return ""
        set finderWindow to window 1
        set finderWindowPath to (POSIX path of (target of finderWindow as alias))
        return finderWindowPath
      end tell
    else
      return ""
    end if
  `;
  return (0, import_node_child_process.execFileSync)("/usr/bin/osascript", ["-e", script], {
    encoding: "utf-8"
  }).trim();
}
async function openInEditor(bundleId, appName, openTarget) {
  try {
    await openFinderTarget(bundleId, appName, openTarget);
  } catch (error) {
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: `Failed to open ${appName}`,
      message: error instanceof Error ? error.message : String(error)
    });
  }
}
async function openFinderTarget(bundleId, appName, openTarget) {
  const apps = await (0, import_api.getApplications)();
  const app = apps.find((a) => a.bundleId === bundleId);
  if (!app) {
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: `${appName} is not installed`
    });
    return;
  }
  const items = await (async () => {
    try {
      return await (0, import_api.getSelectedFinderItems)();
    } catch {
      return [];
    }
  })();
  if (items.length > 0) {
    for (const item of items) {
      await openTarget(item.path, app);
    }
    return;
  }
  const windowPath = getFinderWindowPath();
  if (windowPath) {
    await openTarget(windowPath, app);
    return;
  }
  await (0, import_api.showToast)({
    style: import_api.Toast.Style.Failure,
    title: "No Finder items or window selected"
  });
}
function openInVSCodeNewWindow(path, app) {
  const codePath = (0, import_node_path.join)(
    app.path,
    "Contents",
    "Resources",
    "app",
    "bin",
    "code"
  );
  (0, import_node_child_process.execFileSync)(codePath, ["--new-window", path], {
    stdio: "ignore"
  });
}

// src/open-in-vscode.ts
async function open_in_vscode_default() {
  await openInEditor(
    "com.microsoft.VSCode",
    "Visual Studio Code",
    openInVSCodeNewWindow
  );
}
