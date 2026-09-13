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

// src/finder-to-wezterm.ts
var finder_to_wezterm_exports = {};
__export(finder_to_wezterm_exports, {
  default: () => finder_to_wezterm_default
});
module.exports = __toCommonJS(finder_to_wezterm_exports);
var import_node_child_process3 = require("node:child_process");
var import_api2 = require("@raycast/api");

// src/finder.ts
var import_node_child_process = require("node:child_process");
var import_api = require("@raycast/api");
function runAppleScript(script) {
  return (0, import_node_child_process.execFileSync)("/usr/bin/osascript", ["-e", script], {
    encoding: "utf-8"
  }).trim();
}
function getFinderWindowPath() {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        if (count of windows) is 0 then return ""
        set finderWindow to window 1
        return POSIX path of (target of finderWindow as alias)
      end tell
    else
      return ""
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
  return getFinderWindowPath() || void 0;
}

// src/wezterm.ts
var import_node_child_process2 = require("node:child_process");
var import_node_fs = require("node:fs");
var import_node_os = require("node:os");
function getWezTermExecutable() {
  const loginShell = (0, import_node_os.userInfo)().shell;
  if (!loginShell || !(0, import_node_fs.existsSync)(loginShell)) {
    throw new Error("Could not find the user's login shell");
  }
  const executable = (0, import_node_child_process2.execFileSync)(loginShell, ["-lc", "command -v wezterm"], {
    encoding: "utf-8"
  }).trim();
  if (!executable || !(0, import_node_fs.existsSync)(executable)) {
    throw new Error("WezTerm is not available in the login shell PATH");
  }
  return executable;
}

// src/finder-to-wezterm.ts
async function finder_to_wezterm_default() {
  try {
    const targetPath = await getFinderTargetPath();
    if (!targetPath) {
      await (0, import_api2.showToast)({
        style: import_api2.Toast.Style.Failure,
        title: "No Finder items or window selected"
      });
      return;
    }
    try {
      (0, import_node_child_process3.execFileSync)(getWezTermExecutable(), ["start", "--cwd", targetPath], {
        encoding: "utf-8"
      });
    } catch {
      await (0, import_api2.open)(targetPath, "com.github.wez.wezterm");
    }
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Done" });
  } catch (error) {
    await (0, import_api2.showToast)({
      style: import_api2.Toast.Style.Failure,
      title: "Failed to open WezTerm",
      message: error instanceof Error ? error.message : String(error)
    });
  }
}
