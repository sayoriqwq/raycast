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
var import_api = require("@raycast/api");
var import_node_child_process = require("node:child_process");
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
  return (0, import_node_child_process.execSync)(`osascript -e '${script.replace(/'/g, "'\\''")}'`, { encoding: "utf-8" }).trim();
}
async function finder_to_wezterm_default() {
  let targetPath;
  try {
    const items = await (0, import_api.getSelectedFinderItems)();
    if (items.length > 0) {
      targetPath = items[0].path;
    }
  } catch {
  }
  if (!targetPath) {
    try {
      targetPath = getFinderWindowPath();
    } catch {
    }
  }
  if (!targetPath) {
    await (0, import_api.showToast)({ style: import_api.Toast.Style.Failure, title: "No Finder items or window selected" });
    return;
  }
  try {
    (0, import_node_child_process.execSync)(`/opt/homebrew/bin/wezterm start --cwd "${targetPath}"`, { encoding: "utf-8" });
    await (0, import_api.showToast)({ style: import_api.Toast.Style.Success, title: "Done" });
  } catch {
    await (0, import_api.open)(targetPath, "com.github.wez.wezterm");
    await (0, import_api.showToast)({ style: import_api.Toast.Style.Success, title: "Done" });
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2ZpbmRlci10by13ZXp0ZXJtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zLCBvcGVuLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5cbmZ1bmN0aW9uIGdldEZpbmRlcldpbmRvd1BhdGgoKTogc3RyaW5nIHtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIGlmIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgaXMgcnVubmluZyBhbmQgZnJvbnRtb3N0IG9mIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdGhlblxuICAgICAgdGVsbCBhcHAgXCJGaW5kZXJcIlxuICAgICAgICBzZXQgZmluZGVyV2luZG93IHRvIHdpbmRvdyAxXG4gICAgICAgIHJldHVybiBQT1NJWCBwYXRoIG9mICh0YXJnZXQgb2YgZmluZGVyV2luZG93IGFzIGFsaWFzKVxuICAgICAgZW5kIHRlbGxcbiAgICBlbHNlXG4gICAgICBlcnJvciBcIkNvdWxkIG5vdCBnZXQgdGhlIHNlbGVjdGVkIEZpbmRlciB3aW5kb3dcIlxuICAgIGVuZCBpZlxuICBgO1xuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCBcIidcXFxcJydcIil9J2AsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KS50cmltKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRhcmdldFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcygpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICB0YXJnZXRQYXRoID0gaXRlbXNbMF0ucGF0aDtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIG5vIHNlbGVjdGlvblxuICB9XG5cbiAgaWYgKCF0YXJnZXRQYXRoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRhcmdldFBhdGggPSBnZXRGaW5kZXJXaW5kb3dQYXRoKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBubyB3aW5kb3dcbiAgICB9XG4gIH1cblxuICBpZiAoIXRhcmdldFBhdGgpIHtcbiAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSwgdGl0bGU6IFwiTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZFwiIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgZXhlY1N5bmMoYC9vcHQvaG9tZWJyZXcvYmluL3dlenRlcm0gc3RhcnQgLS1jd2QgXCIke3RhcmdldFBhdGh9XCJgLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIkRvbmVcIiB9KTtcbiAgfSBjYXRjaCB7XG4gICAgYXdhaXQgb3Blbih0YXJnZXRQYXRoLCBcImNvbS5naXRodWIud2V6LndlenRlcm1cIik7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIkRvbmVcIiB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQStEO0FBQy9ELGdDQUF5QjtBQUV6QixTQUFTLHNCQUE4QjtBQUNyQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNqRztBQUVBLGVBQU8sNEJBQTBCO0FBQy9CLE1BQUk7QUFFSixNQUFJO0FBQ0YsVUFBTSxRQUFRLFVBQU0sbUNBQXVCO0FBQzNDLFFBQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsbUJBQWEsTUFBTSxDQUFDLEVBQUU7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsUUFBUTtBQUFBLEVBRVI7QUFFQSxNQUFJLENBQUMsWUFBWTtBQUNmLFFBQUk7QUFDRixtQkFBYSxvQkFBb0I7QUFBQSxJQUNuQyxRQUFRO0FBQUEsSUFFUjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLENBQUMsWUFBWTtBQUNmLGNBQU0sc0JBQVUsRUFBRSxPQUFPLGlCQUFNLE1BQU0sU0FBUyxPQUFPLHFDQUFxQyxDQUFDO0FBQzNGO0FBQUEsRUFDRjtBQUVBLE1BQUk7QUFDRiw0Q0FBUywwQ0FBMEMsVUFBVSxLQUFLLEVBQUUsVUFBVSxRQUFRLENBQUM7QUFDdkYsY0FBTSxzQkFBVSxFQUFFLE9BQU8saUJBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0QsUUFBUTtBQUNOLGNBQU0saUJBQUssWUFBWSx3QkFBd0I7QUFDL0MsY0FBTSxzQkFBVSxFQUFFLE9BQU8saUJBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0Q7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
