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

// src/ghostty-to-finder.ts
var ghostty_to_finder_exports = {};
__export(ghostty_to_finder_exports, {
  default: () => ghostty_to_finder_default
});
module.exports = __toCommonJS(ghostty_to_finder_exports);
var import_api2 = require("@raycast/api");

// src/ghostty.ts
var import_node_child_process = require("node:child_process");
var import_api = require("@raycast/api");
var GHOSTTY_APP_NAME = "Ghostty";
var GHOSTTY_APP_PATH = "/Applications/Ghostty.app";
function runAppleScript(script) {
  return (0, import_node_child_process.execFileSync)("/usr/bin/osascript", ["-e", script], { encoding: "utf-8" }).trim();
}
function isGhosttyRunning() {
  return (0, import_node_child_process.spawnSync)("/usr/bin/pgrep", ["-x", "ghostty"]).status === 0;
}
function getGhosttyWorkingDirectory() {
  const script = `
    using terms from application "${GHOSTTY_APP_NAME}"
      tell application (POSIX file "${GHOSTTY_APP_PATH}" as text)
        return working directory of focused terminal of selected tab of front window
      end tell
    end using terms from
  `;
  return runAppleScript(script);
}
function revealGhosttyWorkingDirectoryViaShell() {
  if (!isGhosttyRunning()) {
    throw new Error("Ghostty is not running");
  }
  const script = `
    tell application "Finder" to activate
    tell application (POSIX file "${GHOSTTY_APP_PATH}" as text) to activate
    tell application "System Events"
      keystroke "open -a Finder ./"
      key code 76
    end tell
  `;
  runAppleScript(script);
}
async function openGhosttyDirectoryInFinder() {
  try {
    const cwd = getGhosttyWorkingDirectory();
    if (!cwd) {
      throw new Error("No active Ghostty directory found");
    }
    await (0, import_api.open)(cwd);
  } catch {
    revealGhosttyWorkingDirectoryViaShell();
  }
}

// src/ghostty-to-finder.ts
async function ghostty_to_finder_default() {
  try {
    await openGhosttyDirectoryInFinder();
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Done" });
  } catch (error) {
    await (0, import_api2.showToast)({
      style: import_api2.Toast.Style.Failure,
      title: "Failed to get Ghostty directory",
      message: error instanceof Error ? error.message : String(error)
    });
  }
}
