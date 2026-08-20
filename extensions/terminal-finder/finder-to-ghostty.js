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

// src/finder-to-ghostty.ts
var finder_to_ghostty_exports = {};
__export(finder_to_ghostty_exports, {
  default: () => finder_to_ghostty_default
});
module.exports = __toCommonJS(finder_to_ghostty_exports);
var import_api3 = require("@raycast/api");

// src/finder.ts
var import_node_child_process = require("node:child_process");
var import_api = require("@raycast/api");
function runAppleScript(script) {
  return (0, import_node_child_process.execFileSync)("/usr/bin/osascript", ["-e", script], { encoding: "utf-8" }).trim();
}
function getFinderWindowPath() {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        set finderWindow to window 1
        return POSIX path of (target of finderWindow as alias)
      end tell
    else
      error "Could not get the selected Finder window"
    end if
  `;
  return runAppleScript(script);
}
async function getFinderTargetPath() {
  try {
    const items = await (0, import_api.getSelectedFinderItems)();
    if (items.length > 0) {
      return items[0].path;
    }
  } catch {
  }
  try {
    return getFinderWindowPath();
  } catch {
    return void 0;
  }
}

// src/ghostty.ts
var import_api2 = require("@raycast/api");
var GHOSTTY_APP_NAME = "Ghostty";
var GHOSTTY_APP_PATH = "/Applications/Ghostty.app";
var GHOSTTY_BUNDLE_ID = "com.mitchellh.ghostty";
async function openPathInGhostty(path, application) {
  await (0, import_api2.open)(path, application);
}
async function openInGhostty(path) {
  const attempts = [
    () => openPathInGhostty(path, GHOSTTY_APP_NAME),
    () => openPathInGhostty(path, GHOSTTY_BUNDLE_ID),
    () => openPathInGhostty(path, GHOSTTY_APP_PATH)
  ];
  let lastError;
  for (const attempt of attempts) {
    try {
      await attempt();
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Failed to open the directory in Ghostty");
}

// src/finder-to-ghostty.ts
async function finder_to_ghostty_default() {
  const targetPath = await getFinderTargetPath();
  if (!targetPath) {
    await (0, import_api3.showToast)({ style: import_api3.Toast.Style.Failure, title: "No Finder items or window selected" });
    return;
  }
  try {
    await openInGhostty(targetPath);
    await (0, import_api3.showToast)({ style: import_api3.Toast.Style.Success, title: "Done" });
  } catch (error) {
    await (0, import_api3.showToast)({
      style: import_api3.Toast.Style.Failure,
      title: "Failed to open Ghostty",
      message: error instanceof Error ? error.message : String(error)
    });
  }
}
