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

// src/wezterm-to-finder.ts
var wezterm_to_finder_exports = {};
__export(wezterm_to_finder_exports, {
  default: () => wezterm_to_finder_default
});
module.exports = __toCommonJS(wezterm_to_finder_exports);
var import_node_child_process2 = require("node:child_process");
var import_node_url = require("node:url");
var import_api = require("@raycast/api");

// src/wezterm.ts
var import_node_child_process = require("node:child_process");
var import_node_fs = require("node:fs");
var import_node_os = require("node:os");
function getWezTermExecutable() {
  const loginShell = (0, import_node_os.userInfo)().shell;
  if (!loginShell || !(0, import_node_fs.existsSync)(loginShell)) {
    throw new Error("Could not find the user's login shell");
  }
  const executable = (0, import_node_child_process.execFileSync)(loginShell, ["-lc", "command -v wezterm"], {
    encoding: "utf-8"
  }).trim();
  if (!executable || !(0, import_node_fs.existsSync)(executable)) {
    throw new Error("WezTerm is not available in the login shell PATH");
  }
  return executable;
}

// src/wezterm-to-finder.ts
function getWezTermCwd() {
  const output = (0, import_node_child_process2.execFileSync)(
    getWezTermExecutable(),
    ["cli", "list", "--format", "json"],
    {
      encoding: "utf-8"
    }
  );
  const panes = JSON.parse(output);
  const active = panes.find((p) => p.is_active) ?? panes[0];
  if (!active?.cwd) {
    throw new Error("No active WezTerm pane found");
  }
  return (0, import_node_url.fileURLToPath)(active.cwd);
}
async function wezterm_to_finder_default() {
  try {
    const cwd = getWezTermCwd();
    await (0, import_api.open)(cwd);
    await (0, import_api.showToast)({ style: import_api.Toast.Style.Success, title: "Done" });
  } catch (e) {
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: "Failed to get WezTerm directory",
      message: e instanceof Error ? e.message : String(e)
    });
  }
}
