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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZ2hvc3R0eS10by1maW5kZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZ2hvc3R0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IG9wZW5HaG9zdHR5RGlyZWN0b3J5SW5GaW5kZXIgfSBmcm9tICcuL2dob3N0dHknXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBvcGVuR2hvc3R0eURpcmVjdG9yeUluRmluZGVyKClcbiAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcywgdGl0bGU6ICdEb25lJyB9KVxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiAnRmFpbGVkIHRvIGdldCBHaG9zdHR5IGRpcmVjdG9yeScsXG4gICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvciksXG4gICAgfSlcbiAgfVxufVxuIiwgImltcG9ydCB7IGV4ZWNGaWxlU3luYywgc3Bhd25TeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgb3BlbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcblxuY29uc3QgR0hPU1RUWV9BUFBfTkFNRSA9ICdHaG9zdHR5J1xuY29uc3QgR0hPU1RUWV9BUFBfUEFUSCA9ICcvQXBwbGljYXRpb25zL0dob3N0dHkuYXBwJ1xuY29uc3QgR0hPU1RUWV9CVU5ETEVfSUQgPSAnY29tLm1pdGNoZWxsaC5naG9zdHR5J1xuXG5mdW5jdGlvbiBydW5BcHBsZVNjcmlwdChzY3JpcHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBleGVjRmlsZVN5bmMoJy91c3IvYmluL29zYXNjcmlwdCcsIFsnLWUnLCBzY3JpcHRdLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnRyaW0oKVxufVxuXG5mdW5jdGlvbiBpc0dob3N0dHlSdW5uaW5nKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gc3Bhd25TeW5jKCcvdXNyL2Jpbi9wZ3JlcCcsIFsnLXgnLCAnZ2hvc3R0eSddKS5zdGF0dXMgPT09IDBcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlblBhdGhJbkdob3N0dHkocGF0aDogc3RyaW5nLCBhcHBsaWNhdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IG9wZW4ocGF0aCwgYXBwbGljYXRpb24pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5HaG9zdHR5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhdHRlbXB0czogQXJyYXk8KCkgPT4gUHJvbWlzZTx2b2lkPj4gPSBbXG4gICAgKCkgPT4gb3BlblBhdGhJbkdob3N0dHkocGF0aCwgR0hPU1RUWV9BUFBfTkFNRSksXG4gICAgKCkgPT4gb3BlblBhdGhJbkdob3N0dHkocGF0aCwgR0hPU1RUWV9CVU5ETEVfSUQpLFxuICAgICgpID0+IG9wZW5QYXRoSW5HaG9zdHR5KHBhdGgsIEdIT1NUVFlfQVBQX1BBVEgpLFxuICBdXG5cbiAgbGV0IGxhc3RFcnJvcjogdW5rbm93blxuXG4gIGZvciAoY29uc3QgYXR0ZW1wdCBvZiBhdHRlbXB0cykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhdHRlbXB0KClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxhc3RFcnJvciA9IGVycm9yXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbGFzdEVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBsYXN0RXJyb3IgOiBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBvcGVuIHRoZSBkaXJlY3RvcnkgaW4gR2hvc3R0eScpXG59XG5cbmZ1bmN0aW9uIGdldEdob3N0dHlXb3JraW5nRGlyZWN0b3J5KCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICB1c2luZyB0ZXJtcyBmcm9tIGFwcGxpY2F0aW9uIFwiJHtHSE9TVFRZX0FQUF9OQU1FfVwiXG4gICAgICB0ZWxsIGFwcGxpY2F0aW9uIChQT1NJWCBmaWxlIFwiJHtHSE9TVFRZX0FQUF9QQVRIfVwiIGFzIHRleHQpXG4gICAgICAgIHJldHVybiB3b3JraW5nIGRpcmVjdG9yeSBvZiBmb2N1c2VkIHRlcm1pbmFsIG9mIHNlbGVjdGVkIHRhYiBvZiBmcm9udCB3aW5kb3dcbiAgICAgIGVuZCB0ZWxsXG4gICAgZW5kIHVzaW5nIHRlcm1zIGZyb21cbiAgYFxuXG4gIHJldHVybiBydW5BcHBsZVNjcmlwdChzY3JpcHQpXG59XG5cbmZ1bmN0aW9uIHJldmVhbEdob3N0dHlXb3JraW5nRGlyZWN0b3J5VmlhU2hlbGwoKTogdm9pZCB7XG4gIGlmICghaXNHaG9zdHR5UnVubmluZygpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdHaG9zdHR5IGlzIG5vdCBydW5uaW5nJylcbiAgfVxuXG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICB0ZWxsIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdG8gYWN0aXZhdGVcbiAgICB0ZWxsIGFwcGxpY2F0aW9uIChQT1NJWCBmaWxlIFwiJHtHSE9TVFRZX0FQUF9QQVRIfVwiIGFzIHRleHQpIHRvIGFjdGl2YXRlXG4gICAgdGVsbCBhcHBsaWNhdGlvbiBcIlN5c3RlbSBFdmVudHNcIlxuICAgICAga2V5c3Ryb2tlIFwib3BlbiAtYSBGaW5kZXIgLi9cIlxuICAgICAga2V5IGNvZGUgNzZcbiAgICBlbmQgdGVsbFxuICBgXG5cbiAgcnVuQXBwbGVTY3JpcHQoc2NyaXB0KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3Blbkdob3N0dHlEaXJlY3RvcnlJbkZpbmRlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjd2QgPSBnZXRHaG9zdHR5V29ya2luZ0RpcmVjdG9yeSgpXG4gICAgaWYgKCFjd2QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIEdob3N0dHkgZGlyZWN0b3J5IGZvdW5kJylcbiAgICB9XG5cbiAgICBhd2FpdCBvcGVuKGN3ZClcbiAgfVxuICBjYXRjaCB7XG4gICAgcmV2ZWFsR2hvc3R0eVdvcmtpbmdEaXJlY3RvcnlWaWFTaGVsbCgpXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLGNBQWlDOzs7QUNBakMsZ0NBQXdDO0FBQ3hDLGlCQUFxQjtBQUVyQixJQUFNLG1CQUFtQjtBQUN6QixJQUFNLG1CQUFtQjtBQUd6QixTQUFTLGVBQWUsUUFBd0I7QUFDOUMsYUFBTyx3Q0FBYSxzQkFBc0IsQ0FBQyxNQUFNLE1BQU0sR0FBRyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUN4RjtBQUVBLFNBQVMsbUJBQTRCO0FBQ25DLGFBQU8scUNBQVUsa0JBQWtCLENBQUMsTUFBTSxTQUFTLENBQUMsRUFBRSxXQUFXO0FBQ25FO0FBNEJBLFNBQVMsNkJBQXFDO0FBQzVDLFFBQU0sU0FBUztBQUFBLG9DQUNtQixnQkFBZ0I7QUFBQSxzQ0FDZCxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1wRCxTQUFPLGVBQWUsTUFBTTtBQUM5QjtBQUVBLFNBQVMsd0NBQThDO0FBQ3JELE1BQUksQ0FBQyxpQkFBaUIsR0FBRztBQUN2QixVQUFNLElBQUksTUFBTSx3QkFBd0I7QUFBQSxFQUMxQztBQUVBLFFBQU0sU0FBUztBQUFBO0FBQUEsb0NBRW1CLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPbEQsaUJBQWUsTUFBTTtBQUN2QjtBQUVBLGVBQXNCLCtCQUE4QztBQUNsRSxNQUFJO0FBQ0YsVUFBTSxNQUFNLDJCQUEyQjtBQUN2QyxRQUFJLENBQUMsS0FBSztBQUNSLFlBQU0sSUFBSSxNQUFNLG1DQUFtQztBQUFBLElBQ3JEO0FBRUEsY0FBTSxpQkFBSyxHQUFHO0FBQUEsRUFDaEIsUUFDTTtBQUNKLDBDQUFzQztBQUFBLEVBQ3hDO0FBQ0Y7OztBRC9FQSxlQUFPLDRCQUEwQjtBQUMvQixNQUFJO0FBQ0YsVUFBTSw2QkFBNkI7QUFDbkMsY0FBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0QsU0FDTyxPQUFPO0FBQ1osY0FBTSx1QkFBVTtBQUFBLE1BQ2QsT0FBTyxrQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUyxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsT0FBTyxLQUFLO0FBQUEsSUFDaEUsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2FwaSJdCn0K
