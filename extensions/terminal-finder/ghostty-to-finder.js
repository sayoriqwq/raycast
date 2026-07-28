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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZ2hvc3R0eS10by1maW5kZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZ2hvc3R0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IG9wZW5HaG9zdHR5RGlyZWN0b3J5SW5GaW5kZXIgfSBmcm9tIFwiLi9naG9zdHR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBvcGVuR2hvc3R0eURpcmVjdG9yeUluRmluZGVyKCk7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIkRvbmVcIiB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogXCJGYWlsZWQgdG8gZ2V0IEdob3N0dHkgZGlyZWN0b3J5XCIsXG4gICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvciksXG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBvcGVuIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhlY0ZpbGVTeW5jLCBzcGF3blN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmNvbnN0IEdIT1NUVFlfQVBQX05BTUUgPSBcIkdob3N0dHlcIjtcbmNvbnN0IEdIT1NUVFlfQVBQX1BBVEggPSBcIi9BcHBsaWNhdGlvbnMvR2hvc3R0eS5hcHBcIjtcbmNvbnN0IEdIT1NUVFlfQlVORExFX0lEID0gXCJjb20ubWl0Y2hlbGxoLmdob3N0dHlcIjtcblxuZnVuY3Rpb24gcnVuQXBwbGVTY3JpcHQoc2NyaXB0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZXhlY0ZpbGVTeW5jKFwiL3Vzci9iaW4vb3Nhc2NyaXB0XCIsIFtcIi1lXCIsIHNjcmlwdF0sIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGlzR2hvc3R0eVJ1bm5pbmcoKTogYm9vbGVhbiB7XG4gIHJldHVybiBzcGF3blN5bmMoXCIvdXNyL2Jpbi9wZ3JlcFwiLCBbXCIteFwiLCBcImdob3N0dHlcIl0pLnN0YXR1cyA9PT0gMDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlblBhdGhJbkdob3N0dHkocGF0aDogc3RyaW5nLCBhcHBsaWNhdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IG9wZW4ocGF0aCwgYXBwbGljYXRpb24pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkluR2hvc3R0eShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXR0ZW1wdHM6IEFycmF5PCgpID0+IFByb21pc2U8dm9pZD4+ID0gW1xuICAgICgpID0+IG9wZW5QYXRoSW5HaG9zdHR5KHBhdGgsIEdIT1NUVFlfQVBQX05BTUUpLFxuICAgICgpID0+IG9wZW5QYXRoSW5HaG9zdHR5KHBhdGgsIEdIT1NUVFlfQlVORExFX0lEKSxcbiAgICAoKSA9PiBvcGVuUGF0aEluR2hvc3R0eShwYXRoLCBHSE9TVFRZX0FQUF9QQVRIKSxcbiAgXTtcblxuICBsZXQgbGFzdEVycm9yOiB1bmtub3duO1xuXG4gIGZvciAoY29uc3QgYXR0ZW1wdCBvZiBhdHRlbXB0cykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhdHRlbXB0KCk7XG4gICAgICByZXR1cm47XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxhc3RFcnJvciA9IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHRocm93IGxhc3RFcnJvciBpbnN0YW5jZW9mIEVycm9yID8gbGFzdEVycm9yIDogbmV3IEVycm9yKFwiRmFpbGVkIHRvIG9wZW4gdGhlIGRpcmVjdG9yeSBpbiBHaG9zdHR5XCIpO1xufVxuXG5mdW5jdGlvbiBnZXRHaG9zdHR5V29ya2luZ0RpcmVjdG9yeSgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgdXNpbmcgdGVybXMgZnJvbSBhcHBsaWNhdGlvbiBcIiR7R0hPU1RUWV9BUFBfTkFNRX1cIlxuICAgICAgdGVsbCBhcHBsaWNhdGlvbiAoUE9TSVggZmlsZSBcIiR7R0hPU1RUWV9BUFBfUEFUSH1cIiBhcyB0ZXh0KVxuICAgICAgICByZXR1cm4gd29ya2luZyBkaXJlY3Rvcnkgb2YgZm9jdXNlZCB0ZXJtaW5hbCBvZiBzZWxlY3RlZCB0YWIgb2YgZnJvbnQgd2luZG93XG4gICAgICBlbmQgdGVsbFxuICAgIGVuZCB1c2luZyB0ZXJtcyBmcm9tXG4gIGA7XG5cbiAgcmV0dXJuIHJ1bkFwcGxlU2NyaXB0KHNjcmlwdCk7XG59XG5cbmZ1bmN0aW9uIHJldmVhbEdob3N0dHlXb3JraW5nRGlyZWN0b3J5VmlhU2hlbGwoKTogdm9pZCB7XG4gIGlmICghaXNHaG9zdHR5UnVubmluZygpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiR2hvc3R0eSBpcyBub3QgcnVubmluZ1wiKTtcbiAgfVxuXG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICB0ZWxsIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdG8gYWN0aXZhdGVcbiAgICB0ZWxsIGFwcGxpY2F0aW9uIChQT1NJWCBmaWxlIFwiJHtHSE9TVFRZX0FQUF9QQVRIfVwiIGFzIHRleHQpIHRvIGFjdGl2YXRlXG4gICAgdGVsbCBhcHBsaWNhdGlvbiBcIlN5c3RlbSBFdmVudHNcIlxuICAgICAga2V5c3Ryb2tlIFwib3BlbiAtYSBGaW5kZXIgLi9cIlxuICAgICAga2V5IGNvZGUgNzZcbiAgICBlbmQgdGVsbFxuICBgO1xuXG4gIHJ1bkFwcGxlU2NyaXB0KHNjcmlwdCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuR2hvc3R0eURpcmVjdG9yeUluRmluZGVyKCk6IFByb21pc2U8dm9pZD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGN3ZCA9IGdldEdob3N0dHlXb3JraW5nRGlyZWN0b3J5KCk7XG4gICAgaWYgKCFjd2QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGFjdGl2ZSBHaG9zdHR5IGRpcmVjdG9yeSBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBhd2FpdCBvcGVuKGN3ZCk7XG4gICAgcmV0dXJuO1xuICB9IGNhdGNoIHtcbiAgICByZXZlYWxHaG9zdHR5V29ya2luZ0RpcmVjdG9yeVZpYVNoZWxsKCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLGNBQWlDOzs7QUNBakMsaUJBQXFCO0FBQ3JCLGdDQUF3QztBQUV4QyxJQUFNLG1CQUFtQjtBQUN6QixJQUFNLG1CQUFtQjtBQUd6QixTQUFTLGVBQWUsUUFBd0I7QUFDOUMsYUFBTyx3Q0FBYSxzQkFBc0IsQ0FBQyxNQUFNLE1BQU0sR0FBRyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUN4RjtBQUVBLFNBQVMsbUJBQTRCO0FBQ25DLGFBQU8scUNBQVUsa0JBQWtCLENBQUMsTUFBTSxTQUFTLENBQUMsRUFBRSxXQUFXO0FBQ25FO0FBMkJBLFNBQVMsNkJBQXFDO0FBQzVDLFFBQU0sU0FBUztBQUFBLG9DQUNtQixnQkFBZ0I7QUFBQSxzQ0FDZCxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1wRCxTQUFPLGVBQWUsTUFBTTtBQUM5QjtBQUVBLFNBQVMsd0NBQThDO0FBQ3JELE1BQUksQ0FBQyxpQkFBaUIsR0FBRztBQUN2QixVQUFNLElBQUksTUFBTSx3QkFBd0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sU0FBUztBQUFBO0FBQUEsb0NBRW1CLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPbEQsaUJBQWUsTUFBTTtBQUN2QjtBQUVBLGVBQXNCLCtCQUE4QztBQUNsRSxNQUFJO0FBQ0YsVUFBTSxNQUFNLDJCQUEyQjtBQUN2QyxRQUFJLENBQUMsS0FBSztBQUNSLFlBQU0sSUFBSSxNQUFNLG1DQUFtQztBQUFBLElBQ3JEO0FBRUEsY0FBTSxpQkFBSyxHQUFHO0FBQ2Q7QUFBQSxFQUNGLFFBQVE7QUFDTiwwQ0FBc0M7QUFBQSxFQUN4QztBQUNGOzs7QUQ5RUEsZUFBTyw0QkFBMEI7QUFDL0IsTUFBSTtBQUNGLFVBQU0sNkJBQTZCO0FBQ25DLGNBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLE9BQU8sQ0FBQztBQUFBLEVBQy9ELFNBQVMsT0FBTztBQUNkLGNBQU0sdUJBQVU7QUFBQSxNQUNkLE9BQU8sa0JBQU0sTUFBTTtBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLFNBQVMsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLElBQ2hFLENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9hcGkiXQp9Cg==
