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
var import_api = require("@raycast/api");
var import_node_child_process = require("node:child_process");
var import_node_url = require("node:url");
function getWezTermCwd() {
  const output = (0, import_node_child_process.execSync)("/opt/homebrew/bin/wezterm cli list --format json", { encoding: "utf-8" });
  const panes = JSON.parse(output);
  const active = panes.find((p) => p.is_active) ?? panes[0];
  if (!active?.cwd) {
    throw new Error("No active WezTerm pane found");
  }
  return new import_node_url.URL(active.cwd).pathname;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dlenRlcm0tdG8tZmluZGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBvcGVuLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW50ZXJmYWNlIFdlelRlcm1QYW5lIHtcbiAgcGFuZV9pZDogbnVtYmVyO1xuICBjd2Q6IHN0cmluZztcbiAgaXNfYWN0aXZlOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBnZXRXZXpUZXJtQ3dkKCk6IHN0cmluZyB7XG4gIGNvbnN0IG91dHB1dCA9IGV4ZWNTeW5jKFwiL29wdC9ob21lYnJldy9iaW4vd2V6dGVybSBjbGkgbGlzdCAtLWZvcm1hdCBqc29uXCIsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KTtcbiAgY29uc3QgcGFuZXM6IFdlelRlcm1QYW5lW10gPSBKU09OLnBhcnNlKG91dHB1dCk7XG5cbiAgY29uc3QgYWN0aXZlID0gcGFuZXMuZmluZCgocCkgPT4gcC5pc19hY3RpdmUpID8/IHBhbmVzWzBdO1xuICBpZiAoIWFjdGl2ZT8uY3dkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gYWN0aXZlIFdlelRlcm0gcGFuZSBmb3VuZFwiKTtcbiAgfVxuXG4gIC8vIGN3ZCBpcyBhIGZpbGU6Ly8gVVJMLCBjb252ZXJ0IHRvIHBhdGhcbiAgcmV0dXJuIG5ldyBVUkwoYWN0aXZlLmN3ZCkucGF0aG5hbWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjd2QgPSBnZXRXZXpUZXJtQ3dkKCk7XG4gICAgYXdhaXQgb3Blbihjd2QpO1xuICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogXCJEb25lXCIgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogXCJGYWlsZWQgdG8gZ2V0IFdlelRlcm0gZGlyZWN0b3J5XCIsXG4gICAgICBtZXNzYWdlOiBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSksXG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF1QztBQUN2QyxnQ0FBeUI7QUFDekIsc0JBQW9CO0FBUXBCLFNBQVMsZ0JBQXdCO0FBQy9CLFFBQU0sYUFBUyxvQ0FBUyxvREFBb0QsRUFBRSxVQUFVLFFBQVEsQ0FBQztBQUNqRyxRQUFNLFFBQXVCLEtBQUssTUFBTSxNQUFNO0FBRTlDLFFBQU0sU0FBUyxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxLQUFLLE1BQU0sQ0FBQztBQUN4RCxNQUFJLENBQUMsUUFBUSxLQUFLO0FBQ2hCLFVBQU0sSUFBSSxNQUFNLDhCQUE4QjtBQUFBLEVBQ2hEO0FBR0EsU0FBTyxJQUFJLG9CQUFJLE9BQU8sR0FBRyxFQUFFO0FBQzdCO0FBRUEsZUFBTyw0QkFBMEI7QUFDL0IsTUFBSTtBQUNGLFVBQU0sTUFBTSxjQUFjO0FBQzFCLGNBQU0saUJBQUssR0FBRztBQUNkLGNBQU0sc0JBQVUsRUFBRSxPQUFPLGlCQUFNLE1BQU0sU0FBUyxPQUFPLE9BQU8sQ0FBQztBQUFBLEVBQy9ELFNBQVMsR0FBRztBQUNWLGNBQU0sc0JBQVU7QUFBQSxNQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLFNBQVMsYUFBYSxRQUFRLEVBQUUsVUFBVSxPQUFPLENBQUM7QUFBQSxJQUNwRCxDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
