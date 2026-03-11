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
var import_api = require("@raycast/api");
var import_node_child_process = require("node:child_process");
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
    return;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2dob3N0dHktdG8tZmluZGVyLnRzIiwgIi4uL3NyYy9naG9zdHR5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgb3Blbkdob3N0dHlEaXJlY3RvcnlJbkZpbmRlciB9IGZyb20gXCIuL2dob3N0dHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGF3YWl0IG9wZW5HaG9zdHR5RGlyZWN0b3J5SW5GaW5kZXIoKTtcbiAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcywgdGl0bGU6IFwiRG9uZVwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBcIkZhaWxlZCB0byBnZXQgR2hvc3R0eSBkaXJlY3RvcnlcIixcbiAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSxcbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG9wZW4gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjRmlsZVN5bmMsIHNwYXduU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuY29uc3QgR0hPU1RUWV9BUFBfTkFNRSA9IFwiR2hvc3R0eVwiO1xuY29uc3QgR0hPU1RUWV9BUFBfUEFUSCA9IFwiL0FwcGxpY2F0aW9ucy9HaG9zdHR5LmFwcFwiO1xuY29uc3QgR0hPU1RUWV9CVU5ETEVfSUQgPSBcImNvbS5taXRjaGVsbGguZ2hvc3R0eVwiO1xuXG5mdW5jdGlvbiBydW5BcHBsZVNjcmlwdChzY3JpcHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBleGVjRmlsZVN5bmMoXCIvdXNyL2Jpbi9vc2FzY3JpcHRcIiwgW1wiLWVcIiwgc2NyaXB0XSwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gaXNHaG9zdHR5UnVubmluZygpOiBib29sZWFuIHtcbiAgcmV0dXJuIHNwYXduU3luYyhcIi91c3IvYmluL3BncmVwXCIsIFtcIi14XCIsIFwiZ2hvc3R0eVwiXSkuc3RhdHVzID09PSAwO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvcGVuUGF0aEluR2hvc3R0eShwYXRoOiBzdHJpbmcsIGFwcGxpY2F0aW9uOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgb3BlbihwYXRoLCBhcHBsaWNhdGlvbik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5HaG9zdHR5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhdHRlbXB0czogQXJyYXk8KCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBbXG4gICAgKCkgPT4gb3BlblBhdGhJbkdob3N0dHkocGF0aCwgR0hPU1RUWV9BUFBfTkFNRSksXG4gICAgKCkgPT4gb3BlblBhdGhJbkdob3N0dHkocGF0aCwgR0hPU1RUWV9CVU5ETEVfSUQpLFxuICAgICgpID0+IG9wZW5QYXRoSW5HaG9zdHR5KHBhdGgsIEdIT1NUVFlfQVBQX1BBVEgpLFxuICBdO1xuXG4gIGxldCBsYXN0RXJyb3I6IHVua25vd247XG5cbiAgZm9yIChjb25zdCBhdHRlbXB0IG9mIGF0dGVtcHRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGF0dGVtcHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbGFzdEVycm9yID0gZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbGFzdEVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBsYXN0RXJyb3IgOiBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gb3BlbiB0aGUgZGlyZWN0b3J5IGluIEdob3N0dHlcIik7XG59XG5cbmZ1bmN0aW9uIGdldEdob3N0dHlXb3JraW5nRGlyZWN0b3J5KCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICB1c2luZyB0ZXJtcyBmcm9tIGFwcGxpY2F0aW9uIFwiJHtHSE9TVFRZX0FQUF9OQU1FfVwiXG4gICAgICB0ZWxsIGFwcGxpY2F0aW9uIChQT1NJWCBmaWxlIFwiJHtHSE9TVFRZX0FQUF9QQVRIfVwiIGFzIHRleHQpXG4gICAgICAgIHJldHVybiB3b3JraW5nIGRpcmVjdG9yeSBvZiBmb2N1c2VkIHRlcm1pbmFsIG9mIHNlbGVjdGVkIHRhYiBvZiBmcm9udCB3aW5kb3dcbiAgICAgIGVuZCB0ZWxsXG4gICAgZW5kIHVzaW5nIHRlcm1zIGZyb21cbiAgYDtcblxuICByZXR1cm4gcnVuQXBwbGVTY3JpcHQoc2NyaXB0KTtcbn1cblxuZnVuY3Rpb24gcmV2ZWFsR2hvc3R0eVdvcmtpbmdEaXJlY3RvcnlWaWFTaGVsbCgpOiB2b2lkIHtcbiAgaWYgKCFpc0dob3N0dHlSdW5uaW5nKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJHaG9zdHR5IGlzIG5vdCBydW5uaW5nXCIpO1xuICB9XG5cbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIHRlbGwgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0byBhY3RpdmF0ZVxuICAgIHRlbGwgYXBwbGljYXRpb24gKFBPU0lYIGZpbGUgXCIke0dIT1NUVFlfQVBQX1BBVEh9XCIgYXMgdGV4dCkgdG8gYWN0aXZhdGVcbiAgICB0ZWxsIGFwcGxpY2F0aW9uIFwiU3lzdGVtIEV2ZW50c1wiXG4gICAgICBrZXlzdHJva2UgXCJvcGVuIC1hIEZpbmRlciAuL1wiXG4gICAgICBrZXkgY29kZSA3NlxuICAgIGVuZCB0ZWxsXG4gIGA7XG5cbiAgcnVuQXBwbGVTY3JpcHQoc2NyaXB0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5HaG9zdHR5RGlyZWN0b3J5SW5GaW5kZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY3dkID0gZ2V0R2hvc3R0eVdvcmtpbmdEaXJlY3RvcnkoKTtcbiAgICBpZiAoIWN3ZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gYWN0aXZlIEdob3N0dHkgZGlyZWN0b3J5IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IG9wZW4oY3dkKTtcbiAgICByZXR1cm47XG4gIH0gY2F0Y2gge1xuICAgIHJldmVhbEdob3N0dHlXb3JraW5nRGlyZWN0b3J5VmlhU2hlbGwoKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBQUEsY0FBaUM7OztBQ0FqQyxpQkFBcUI7QUFDckIsZ0NBQXdDO0FBRXhDLElBQU0sbUJBQW1CO0FBQ3pCLElBQU0sbUJBQW1CO0FBR3pCLFNBQVMsZUFBZSxRQUF3QjtBQUM5QyxhQUFPLHdDQUFhLHNCQUFzQixDQUFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ3hGO0FBRUEsU0FBUyxtQkFBNEI7QUFDbkMsYUFBTyxxQ0FBVSxrQkFBa0IsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxFQUFFLFdBQVc7QUFDbkU7QUEyQkEsU0FBUyw2QkFBcUM7QUFDNUMsUUFBTSxTQUFTO0FBQUEsb0NBQ21CLGdCQUFnQjtBQUFBLHNDQUNkLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXBELFNBQU8sZUFBZSxNQUFNO0FBQzlCO0FBRUEsU0FBUyx3Q0FBOEM7QUFDckQsTUFBSSxDQUFDLGlCQUFpQixHQUFHO0FBQ3ZCLFVBQU0sSUFBSSxNQUFNLHdCQUF3QjtBQUFBLEVBQzFDO0FBRUEsUUFBTSxTQUFTO0FBQUE7QUFBQSxvQ0FFbUIsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9sRCxpQkFBZSxNQUFNO0FBQ3ZCO0FBRUEsZUFBc0IsK0JBQThDO0FBQ2xFLE1BQUk7QUFDRixVQUFNLE1BQU0sMkJBQTJCO0FBQ3ZDLFFBQUksQ0FBQyxLQUFLO0FBQ1IsWUFBTSxJQUFJLE1BQU0sbUNBQW1DO0FBQUEsSUFDckQ7QUFFQSxjQUFNLGlCQUFLLEdBQUc7QUFDZDtBQUFBLEVBQ0YsUUFBUTtBQUNOLDBDQUFzQztBQUFBLEVBQ3hDO0FBQ0Y7OztBRDlFQSxlQUFPLDRCQUEwQjtBQUMvQixNQUFJO0FBQ0YsVUFBTSw2QkFBNkI7QUFDbkMsY0FBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0QsU0FBUyxPQUFPO0FBQ2QsY0FBTSx1QkFBVTtBQUFBLE1BQ2QsT0FBTyxrQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUyxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsT0FBTyxLQUFLO0FBQUEsSUFDaEUsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2FwaSJdCn0K
