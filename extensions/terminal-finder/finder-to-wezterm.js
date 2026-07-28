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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZmluZGVyLXRvLXdlenRlcm0udHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvZmluZGVyLnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy90ZXJtaW5hbC1maW5kZXIvc3JjL3dlenRlcm0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGV4ZWNGaWxlU3luYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IG9wZW4sIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5pbXBvcnQgeyBnZXRGaW5kZXJUYXJnZXRQYXRoIH0gZnJvbSAnLi9maW5kZXInXG5pbXBvcnQgeyBnZXRXZXpUZXJtRXhlY3V0YWJsZSB9IGZyb20gJy4vd2V6dGVybSdcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCB0YXJnZXRQYXRoID0gYXdhaXQgZ2V0RmluZGVyVGFyZ2V0UGF0aCgpXG5cbiAgaWYgKCF0YXJnZXRQYXRoKSB7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsIHRpdGxlOiAnTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZCcgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRyeSB7XG4gICAgZXhlY0ZpbGVTeW5jKGdldFdlelRlcm1FeGVjdXRhYmxlKCksIFsnc3RhcnQnLCAnLS1jd2QnLCB0YXJnZXRQYXRoXSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KVxuICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogJ0RvbmUnIH0pXG4gIH1cbiAgY2F0Y2gge1xuICAgIGF3YWl0IG9wZW4odGFyZ2V0UGF0aCwgJ2NvbS5naXRodWIud2V6LndlenRlcm0nKVxuICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogJ0RvbmUnIH0pXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBleGVjRmlsZVN5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgeyBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zIH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuXG5mdW5jdGlvbiBydW5BcHBsZVNjcmlwdChzY3JpcHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBleGVjRmlsZVN5bmMoJy91c3IvYmluL29zYXNjcmlwdCcsIFsnLWUnLCBzY3JpcHRdLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnRyaW0oKVxufVxuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICByZXR1cm4gUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcylcbiAgICAgIGVuZCB0ZWxsXG4gICAgZWxzZVxuICAgICAgZXJyb3IgXCJDb3VsZCBub3QgZ2V0IHRoZSBzZWxlY3RlZCBGaW5kZXIgd2luZG93XCJcbiAgICBlbmQgaWZcbiAgYFxuXG4gIHJldHVybiBydW5BcHBsZVNjcmlwdChzY3JpcHQpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGaW5kZXJUYXJnZXRQYXRoKCk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKClcbiAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGl0ZW1zWzBdLnBhdGhcbiAgICB9XG4gIH1cbiAgY2F0Y2gge1xuICAgIC8vIElnbm9yZSBzZWxlY3Rpb24gbG9va3VwIGZhaWx1cmVzIGFuZCBmYWxsIGJhY2sgdG8gdGhlIGZyb250IEZpbmRlciB3aW5kb3cuXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBnZXRGaW5kZXJXaW5kb3dQYXRoKClcbiAgfVxuICBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG4iLCAiaW1wb3J0IHsgZXhlY0ZpbGVTeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyB1c2VySW5mbyB9IGZyb20gJ25vZGU6b3MnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZXpUZXJtRXhlY3V0YWJsZSgpOiBzdHJpbmcge1xuICBjb25zdCBsb2dpblNoZWxsID0gdXNlckluZm8oKS5zaGVsbFxuXG4gIGlmICghbG9naW5TaGVsbCB8fCAhZXhpc3RzU3luYyhsb2dpblNoZWxsKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIHVzZXJcXCdzIGxvZ2luIHNoZWxsJylcbiAgfVxuXG4gIGNvbnN0IGV4ZWN1dGFibGUgPSBleGVjRmlsZVN5bmMobG9naW5TaGVsbCwgWyctbGMnLCAnY29tbWFuZCAtdiB3ZXp0ZXJtJ10sIHtcbiAgICBlbmNvZGluZzogJ3V0Zi04JyxcbiAgfSkudHJpbSgpXG5cbiAgaWYgKCFleGVjdXRhYmxlIHx8ICFleGlzdHNTeW5jKGV4ZWN1dGFibGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZXpUZXJtIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGxvZ2luIHNoZWxsIFBBVEgnKVxuICB9XG5cbiAgcmV0dXJuIGV4ZWN1dGFibGVcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLDZCQUE2QjtBQUM3QixJQUFBQyxjQUF1Qzs7O0FDRHZDLGdDQUE2QjtBQUM3QixpQkFBdUM7QUFFdkMsU0FBUyxlQUFlLFFBQXdCO0FBQzlDLGFBQU8sd0NBQWEsc0JBQXNCLENBQUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxVQUFVLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDeEY7QUFFQSxTQUFTLHNCQUE4QjtBQUNyQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixTQUFPLGVBQWUsTUFBTTtBQUM5QjtBQUVBLGVBQXNCLHNCQUFtRDtBQUN2RSxNQUFJO0FBQ0YsVUFBTSxRQUFRLFVBQU0sbUNBQXVCO0FBQzNDLFFBQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsYUFBTyxNQUFNLENBQUMsRUFBRTtBQUFBLElBQ2xCO0FBQUEsRUFDRixRQUNNO0FBQUEsRUFFTjtBQUVBLE1BQUk7QUFDRixXQUFPLG9CQUFvQjtBQUFBLEVBQzdCLFFBQ007QUFDSixXQUFPO0FBQUEsRUFDVDtBQUNGOzs7QUN2Q0EsSUFBQUMsNkJBQTZCO0FBQzdCLHFCQUEyQjtBQUMzQixxQkFBeUI7QUFFbEIsU0FBUyx1QkFBK0I7QUFDN0MsUUFBTSxpQkFBYSx5QkFBUyxFQUFFO0FBRTlCLE1BQUksQ0FBQyxjQUFjLEtBQUMsMkJBQVcsVUFBVSxHQUFHO0FBQzFDLFVBQU0sSUFBSSxNQUFNLHVDQUF3QztBQUFBLEVBQzFEO0FBRUEsUUFBTSxpQkFBYSx5Q0FBYSxZQUFZLENBQUMsT0FBTyxvQkFBb0IsR0FBRztBQUFBLElBQ3pFLFVBQVU7QUFBQSxFQUNaLENBQUMsRUFBRSxLQUFLO0FBRVIsTUFBSSxDQUFDLGNBQWMsS0FBQywyQkFBVyxVQUFVLEdBQUc7QUFDMUMsVUFBTSxJQUFJLE1BQU0sa0RBQWtEO0FBQUEsRUFDcEU7QUFFQSxTQUFPO0FBQ1Q7OztBRmZBLGVBQU8sNEJBQTBCO0FBQy9CLFFBQU0sYUFBYSxNQUFNLG9CQUFvQjtBQUU3QyxNQUFJLENBQUMsWUFBWTtBQUNmLGNBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLHFDQUFxQyxDQUFDO0FBQzNGO0FBQUEsRUFDRjtBQUVBLE1BQUk7QUFDRixpREFBYSxxQkFBcUIsR0FBRyxDQUFDLFNBQVMsU0FBUyxVQUFVLEdBQUcsRUFBRSxVQUFVLFFBQVEsQ0FBQztBQUMxRixjQUFNLHVCQUFVLEVBQUUsT0FBTyxrQkFBTSxNQUFNLFNBQVMsT0FBTyxPQUFPLENBQUM7QUFBQSxFQUMvRCxRQUNNO0FBQ0osY0FBTSxrQkFBSyxZQUFZLHdCQUF3QjtBQUMvQyxjQUFNLHVCQUFVLEVBQUUsT0FBTyxrQkFBTSxNQUFNLFNBQVMsT0FBTyxPQUFPLENBQUM7QUFBQSxFQUMvRDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfbm9kZV9jaGlsZF9wcm9jZXNzIiwgImltcG9ydF9hcGkiLCAiaW1wb3J0X25vZGVfY2hpbGRfcHJvY2VzcyJdCn0K
