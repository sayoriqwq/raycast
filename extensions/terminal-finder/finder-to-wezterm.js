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
var import_node_child_process3 = require("node:child_process");

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
  const targetPath = await getFinderTargetPath();
  if (!targetPath) {
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Failure, title: "No Finder items or window selected" });
    return;
  }
  try {
    (0, import_node_child_process3.execFileSync)(getWezTermExecutable(), ["start", "--cwd", targetPath], { encoding: "utf-8" });
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Done" });
  } catch {
    await (0, import_api2.open)(targetPath, "com.github.wez.wezterm");
    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Done" });
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZmluZGVyLXRvLXdlenRlcm0udHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZmluZGVyLnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy90ZXJtaW5hbC1maW5kZXIvc3JjL3dlenRlcm0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IG9wZW4sIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBnZXRGaW5kZXJUYXJnZXRQYXRoIH0gZnJvbSBcIi4vZmluZGVyXCI7XG5pbXBvcnQgeyBnZXRXZXpUZXJtRXhlY3V0YWJsZSB9IGZyb20gXCIuL3dlenRlcm1cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgZ2V0RmluZGVyVGFyZ2V0UGF0aCgpO1xuXG4gIGlmICghdGFyZ2V0UGF0aCkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLCB0aXRsZTogXCJObyBGaW5kZXIgaXRlbXMgb3Igd2luZG93IHNlbGVjdGVkXCIgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBleGVjRmlsZVN5bmMoZ2V0V2V6VGVybUV4ZWN1dGFibGUoKSwgW1wic3RhcnRcIiwgXCItLWN3ZFwiLCB0YXJnZXRQYXRoXSwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pO1xuICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogXCJEb25lXCIgfSk7XG4gIH0gY2F0Y2gge1xuICAgIGF3YWl0IG9wZW4odGFyZ2V0UGF0aCwgXCJjb20uZ2l0aHViLndlei53ZXp0ZXJtXCIpO1xuICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogXCJEb25lXCIgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhlY0ZpbGVTeW5jIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5mdW5jdGlvbiBydW5BcHBsZVNjcmlwdChzY3JpcHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBleGVjRmlsZVN5bmMoXCIvdXNyL2Jpbi9vc2FzY3JpcHRcIiwgW1wiLWVcIiwgc2NyaXB0XSwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmluZGVyV2luZG93UGF0aCgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgaWYgYXBwbGljYXRpb24gXCJGaW5kZXJcIiBpcyBydW5uaW5nIGFuZCBmcm9udG1vc3Qgb2YgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0aGVuXG4gICAgICB0ZWxsIGFwcCBcIkZpbmRlclwiXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3cgdG8gd2luZG93IDFcbiAgICAgICAgcmV0dXJuIFBPU0lYIHBhdGggb2YgKHRhcmdldCBvZiBmaW5kZXJXaW5kb3cgYXMgYWxpYXMpXG4gICAgICBlbmQgdGVsbFxuICAgIGVsc2VcbiAgICAgIGVycm9yIFwiQ291bGQgbm90IGdldCB0aGUgc2VsZWN0ZWQgRmluZGVyIHdpbmRvd1wiXG4gICAgZW5kIGlmXG4gIGA7XG5cbiAgcmV0dXJuIHJ1bkFwcGxlU2NyaXB0KHNjcmlwdCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGaW5kZXJUYXJnZXRQYXRoKCk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKCk7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBpdGVtc1swXS5wYXRoO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gSWdub3JlIHNlbGVjdGlvbiBsb29rdXAgZmFpbHVyZXMgYW5kIGZhbGwgYmFjayB0byB0aGUgZnJvbnQgRmluZGVyIHdpbmRvdy5cbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGdldEZpbmRlcldpbmRvd1BhdGgoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIiwgImltcG9ydCB7IGV4ZWNGaWxlU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgdXNlckluZm8gfSBmcm9tIFwibm9kZTpvc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2V6VGVybUV4ZWN1dGFibGUoKTogc3RyaW5nIHtcbiAgY29uc3QgbG9naW5TaGVsbCA9IHVzZXJJbmZvKCkuc2hlbGw7XG5cbiAgaWYgKCFsb2dpblNoZWxsIHx8ICFleGlzdHNTeW5jKGxvZ2luU2hlbGwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgdGhlIHVzZXIncyBsb2dpbiBzaGVsbFwiKTtcbiAgfVxuXG4gIGNvbnN0IGV4ZWN1dGFibGUgPSBleGVjRmlsZVN5bmMobG9naW5TaGVsbCwgW1wiLWxjXCIsIFwiY29tbWFuZCAtdiB3ZXp0ZXJtXCJdLCB7XG4gICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgfSkudHJpbSgpO1xuXG4gIGlmICghZXhlY3V0YWJsZSB8fCAhZXhpc3RzU3luYyhleGVjdXRhYmxlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIldlelRlcm0gaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgbG9naW4gc2hlbGwgUEFUSFwiKTtcbiAgfVxuXG4gIHJldHVybiBleGVjdXRhYmxlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBQUEsY0FBdUM7QUFDdkMsSUFBQUMsNkJBQTZCOzs7QUNEN0IsaUJBQXVDO0FBQ3ZDLGdDQUE2QjtBQUU3QixTQUFTLGVBQWUsUUFBd0I7QUFDOUMsYUFBTyx3Q0FBYSxzQkFBc0IsQ0FBQyxNQUFNLE1BQU0sR0FBRyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUN4RjtBQUVBLFNBQVMsc0JBQThCO0FBQ3JDLFFBQU0sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdmLFNBQU8sZUFBZSxNQUFNO0FBQzlCO0FBRUEsZUFBc0Isc0JBQW1EO0FBQ3ZFLE1BQUk7QUFDRixVQUFNLFFBQVEsVUFBTSxtQ0FBdUI7QUFDM0MsUUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixhQUFPLE1BQU0sQ0FBQyxFQUFFO0FBQUEsSUFDbEI7QUFBQSxFQUNGLFFBQVE7QUFBQSxFQUVSO0FBRUEsTUFBSTtBQUNGLFdBQU8sb0JBQW9CO0FBQUEsRUFDN0IsUUFBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7OztBQ3JDQSxJQUFBQyw2QkFBNkI7QUFDN0IscUJBQTJCO0FBQzNCLHFCQUF5QjtBQUVsQixTQUFTLHVCQUErQjtBQUM3QyxRQUFNLGlCQUFhLHlCQUFTLEVBQUU7QUFFOUIsTUFBSSxDQUFDLGNBQWMsS0FBQywyQkFBVyxVQUFVLEdBQUc7QUFDMUMsVUFBTSxJQUFJLE1BQU0sdUNBQXVDO0FBQUEsRUFDekQ7QUFFQSxRQUFNLGlCQUFhLHlDQUFhLFlBQVksQ0FBQyxPQUFPLG9CQUFvQixHQUFHO0FBQUEsSUFDekUsVUFBVTtBQUFBLEVBQ1osQ0FBQyxFQUFFLEtBQUs7QUFFUixNQUFJLENBQUMsY0FBYyxLQUFDLDJCQUFXLFVBQVUsR0FBRztBQUMxQyxVQUFNLElBQUksTUFBTSxrREFBa0Q7QUFBQSxFQUNwRTtBQUVBLFNBQU87QUFDVDs7O0FGZkEsZUFBTyw0QkFBMEI7QUFDL0IsUUFBTSxhQUFhLE1BQU0sb0JBQW9CO0FBRTdDLE1BQUksQ0FBQyxZQUFZO0FBQ2YsY0FBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxTQUFTLE9BQU8scUNBQXFDLENBQUM7QUFDM0Y7QUFBQSxFQUNGO0FBRUEsTUFBSTtBQUNGLGlEQUFhLHFCQUFxQixHQUFHLENBQUMsU0FBUyxTQUFTLFVBQVUsR0FBRyxFQUFFLFVBQVUsUUFBUSxDQUFDO0FBQzFGLGNBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLE9BQU8sQ0FBQztBQUFBLEVBQy9ELFFBQVE7QUFDTixjQUFNLGtCQUFLLFlBQVksd0JBQXdCO0FBQy9DLGNBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLE9BQU8sQ0FBQztBQUFBLEVBQy9EO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9hcGkiLCAiaW1wb3J0X25vZGVfY2hpbGRfcHJvY2VzcyIsICJpbXBvcnRfbm9kZV9jaGlsZF9wcm9jZXNzIl0KfQo=
