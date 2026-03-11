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
var import_api2 = require("@raycast/api");
var import_node_child_process2 = require("node:child_process");

// src/finder.ts
var import_api = require("@raycast/api");
var import_node_child_process = require("node:child_process");
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

// src/finder-to-wezterm.ts
async function finder_to_wezterm_default() {
  const targetPath = await getFinderTargetPath();
  if (!targetPath) {
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Failure, title: "No Finder items or window selected" });
    return;
  }
  try {
    (0, import_node_child_process2.execFileSync)("/opt/homebrew/bin/wezterm", ["start", "--cwd", targetPath], { encoding: "utf-8" });
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Done" });
  } catch {
    await (0, import_api2.open)(targetPath, "com.github.wez.wezterm");
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Done" });
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2ZpbmRlci10by13ZXp0ZXJtLnRzIiwgIi4uL3NyYy9maW5kZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IG9wZW4sIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBnZXRGaW5kZXJUYXJnZXRQYXRoIH0gZnJvbSBcIi4vZmluZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdGFyZ2V0UGF0aCA9IGF3YWl0IGdldEZpbmRlclRhcmdldFBhdGgoKTtcblxuICBpZiAoIXRhcmdldFBhdGgpIHtcbiAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSwgdGl0bGU6IFwiTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZFwiIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgZXhlY0ZpbGVTeW5jKFwiL29wdC9ob21lYnJldy9iaW4vd2V6dGVybVwiLCBbXCJzdGFydFwiLCBcIi0tY3dkXCIsIHRhcmdldFBhdGhdLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIkRvbmVcIiB9KTtcbiAgfSBjYXRjaCB7XG4gICAgYXdhaXQgb3Blbih0YXJnZXRQYXRoLCBcImNvbS5naXRodWIud2V6LndlenRlcm1cIik7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIkRvbmVcIiB9KTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGdldFNlbGVjdGVkRmluZGVySXRlbXMgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0KHNjcmlwdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGV4ZWNGaWxlU3luYyhcIi91c3IvYmluL29zYXNjcmlwdFwiLCBbXCItZVwiLCBzY3JpcHRdLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICByZXR1cm4gUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcylcbiAgICAgIGVuZCB0ZWxsXG4gICAgZWxzZVxuICAgICAgZXJyb3IgXCJDb3VsZCBub3QgZ2V0IHRoZSBzZWxlY3RlZCBGaW5kZXIgd2luZG93XCJcbiAgICBlbmQgaWZcbiAgYDtcblxuICByZXR1cm4gcnVuQXBwbGVTY3JpcHQoc2NyaXB0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEZpbmRlclRhcmdldFBhdGgoKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBpdGVtcyA9IGF3YWl0IGdldFNlbGVjdGVkRmluZGVySXRlbXMoKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGl0ZW1zWzBdLnBhdGg7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBJZ25vcmUgc2VsZWN0aW9uIGxvb2t1cCBmYWlsdXJlcyBhbmQgZmFsbCBiYWNrIHRvIHRoZSBmcm9udCBGaW5kZXIgd2luZG93LlxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZ2V0RmluZGVyV2luZG93UGF0aCgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQSxjQUF1QztBQUN2QyxJQUFBQyw2QkFBNkI7OztBQ0Q3QixpQkFBdUM7QUFDdkMsZ0NBQTZCO0FBRTdCLFNBQVMsZUFBZSxRQUF3QjtBQUM5QyxhQUFPLHdDQUFhLHNCQUFzQixDQUFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ3hGO0FBRUEsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV2YsU0FBTyxlQUFlLE1BQU07QUFDOUI7QUFFQSxlQUFzQixzQkFBbUQ7QUFDdkUsTUFBSTtBQUNGLFVBQU0sUUFBUSxVQUFNLG1DQUF1QjtBQUMzQyxRQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGFBQU8sTUFBTSxDQUFDLEVBQUU7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsUUFBUTtBQUFBLEVBRVI7QUFFQSxNQUFJO0FBQ0YsV0FBTyxvQkFBb0I7QUFBQSxFQUM3QixRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjs7O0FEakNBLGVBQU8sNEJBQTBCO0FBQy9CLFFBQU0sYUFBYSxNQUFNLG9CQUFvQjtBQUU3QyxNQUFJLENBQUMsWUFBWTtBQUNmLGNBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLHFDQUFxQyxDQUFDO0FBQzNGO0FBQUEsRUFDRjtBQUVBLE1BQUk7QUFDRixpREFBYSw2QkFBNkIsQ0FBQyxTQUFTLFNBQVMsVUFBVSxHQUFHLEVBQUUsVUFBVSxRQUFRLENBQUM7QUFDL0YsY0FBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0QsUUFBUTtBQUNOLGNBQU0sa0JBQUssWUFBWSx3QkFBd0I7QUFDL0MsY0FBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0Q7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2FwaSIsICJpbXBvcnRfbm9kZV9jaGlsZF9wcm9jZXNzIl0KfQo=
