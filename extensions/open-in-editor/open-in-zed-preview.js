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

// src/open-in-zed-preview.ts
var open_in_zed_preview_exports = {};
__export(open_in_zed_preview_exports, {
  default: () => Command
});
module.exports = __toCommonJS(open_in_zed_preview_exports);

// src/lib.ts
var import_node_child_process = require("node:child_process");
var import_node_path = require("node:path");
var import_api = require("@raycast/api");
function getFinderWindowPath() {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        set finderWindow to window 1
        set finderWindowPath to (POSIX path of (target of finderWindow as alias))
        return finderWindowPath
      end tell
    else
      error "Could not get the selected Finder window"
    end if
  `;
  return (0, import_node_child_process.execSync)(`osascript -e '${script.replace(/'/g, "'\\''")}'`, { encoding: "utf-8" }).trim();
}
async function openInEditor(bundleId, appName, openTarget) {
  const apps = await (0, import_api.getApplications)();
  const app = apps.find((a) => a.bundleId === bundleId);
  if (!app) {
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: `${appName} is not installed`
    });
    return;
  }
  const items = await (async () => {
    try {
      return await (0, import_api.getSelectedFinderItems)();
    } catch {
      return [];
    }
  })();
  if (items.length > 0) {
    for (const item of items) {
      await openTarget(item.path, app);
    }
    return;
  }
  let windowPath = "";
  try {
    windowPath = getFinderWindowPath();
  } catch {
  }
  if (windowPath) {
    await openTarget(windowPath, app);
    return;
  }
  await (0, import_api.showToast)({
    style: import_api.Toast.Style.Failure,
    title: "No Finder items or window selected"
  });
}
function openInZedNewWindow(path, app) {
  const cliPath = (0, import_node_path.join)(app.path, "Contents", "MacOS", "cli");
  (0, import_node_child_process.execFileSync)(cliPath, ["-n", path], {
    stdio: "ignore"
  });
}

// src/open-in-zed-preview.ts
async function Command() {
  await openInEditor("dev.zed.Zed-Preview", "Zed Preview", openInZedNewWindow);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpLy5jb2RleC93b3JrdHJlZXMvcmF5Y2FzdC16ZWQtcHJldmlldy9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL29wZW4taW4temVkLXByZXZpZXcudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpLy5jb2RleC93b3JrdHJlZXMvcmF5Y2FzdC16ZWQtcHJldmlldy9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL2xpYi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgb3BlbkluRWRpdG9yLCBvcGVuSW5aZWROZXdXaW5kb3cgfSBmcm9tICcuL2xpYidcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgYXdhaXQgb3BlbkluRWRpdG9yKCdkZXYuemVkLlplZC1QcmV2aWV3JywgJ1plZCBQcmV2aWV3Jywgb3BlbkluWmVkTmV3V2luZG93KVxufVxuIiwgImltcG9ydCB0eXBlIHsgQXBwbGljYXRpb24gfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5pbXBvcnQgeyBleGVjRmlsZVN5bmMsIGV4ZWNTeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGdldEFwcGxpY2F0aW9ucywgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcywgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gJ0ByYXljYXN0L2FwaSdcblxudHlwZSBPcGVuVGFyZ2V0ID0gKHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbikgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWRcblxuZnVuY3Rpb24gZ2V0RmluZGVyV2luZG93UGF0aCgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgaWYgYXBwbGljYXRpb24gXCJGaW5kZXJcIiBpcyBydW5uaW5nIGFuZCBmcm9udG1vc3Qgb2YgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0aGVuXG4gICAgICB0ZWxsIGFwcCBcIkZpbmRlclwiXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3cgdG8gd2luZG93IDFcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvd1BhdGggdG8gKFBPU0lYIHBhdGggb2YgKHRhcmdldCBvZiBmaW5kZXJXaW5kb3cgYXMgYWxpYXMpKVxuICAgICAgICByZXR1cm4gZmluZGVyV2luZG93UGF0aFxuICAgICAgZW5kIHRlbGxcbiAgICBlbHNlXG4gICAgICBlcnJvciBcIkNvdWxkIG5vdCBnZXQgdGhlIHNlbGVjdGVkIEZpbmRlciB3aW5kb3dcIlxuICAgIGVuZCBpZlxuICBgXG4gIHJldHVybiBleGVjU3luYyhgb3Nhc2NyaXB0IC1lICcke3NjcmlwdC5yZXBsYWNlKC8nL2csICdcXCdcXFxcXFwnXFwnJyl9J2AsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkudHJpbSgpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5FZGl0b3IoYnVuZGxlSWQ6IHN0cmluZywgYXBwTmFtZTogc3RyaW5nLCBvcGVuVGFyZ2V0OiBPcGVuVGFyZ2V0KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcHMgPSBhd2FpdCBnZXRBcHBsaWNhdGlvbnMoKVxuICBjb25zdCBhcHAgPSBhcHBzLmZpbmQoYSA9PiBhLmJ1bmRsZUlkID09PSBidW5kbGVJZClcblxuICBpZiAoIWFwcCkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBgJHthcHBOYW1lfSBpcyBub3QgaW5zdGFsbGVkYCxcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgaXRlbXMgPSBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcygpXG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfSkoKVxuXG4gIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBhd2FpdCBvcGVuVGFyZ2V0KGl0ZW0ucGF0aCwgYXBwKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCB3aW5kb3dQYXRoID0gJydcbiAgdHJ5IHtcbiAgICB3aW5kb3dQYXRoID0gZ2V0RmluZGVyV2luZG93UGF0aCgpXG4gIH1cbiAgY2F0Y2gge1xuICAgIC8vIENvdWxkIG5vdCBnZXQgd2luZG93IHBhdGhcbiAgfVxuXG4gIGlmICh3aW5kb3dQYXRoKSB7XG4gICAgYXdhaXQgb3BlblRhcmdldCh3aW5kb3dQYXRoLCBhcHApXG4gICAgcmV0dXJuXG4gIH1cblxuICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgIHRpdGxlOiAnTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZCcsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuSW5WU0NvZGVOZXdXaW5kb3cocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGNvbnN0IGNvZGVQYXRoID0gam9pbihhcHAucGF0aCwgJ0NvbnRlbnRzJywgJ1Jlc291cmNlcycsICdhcHAnLCAnYmluJywgJ2NvZGUnKVxuXG4gIGV4ZWNGaWxlU3luYyhjb2RlUGF0aCwgWyctLW5ldy13aW5kb3cnLCBwYXRoXSwge1xuICAgIHN0ZGlvOiAnaWdub3JlJyxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5JblplZE5ld1dpbmRvdyhwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHtcbiAgY29uc3QgY2xpUGF0aCA9IGpvaW4oYXBwLnBhdGgsICdDb250ZW50cycsICdNYWNPUycsICdjbGknKVxuXG4gIGV4ZWNGaWxlU3luYyhjbGlQYXRoLCBbJy1uJywgcGF0aF0sIHtcbiAgICBzdGRpbzogJ2lnbm9yZScsXG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0NBLGdDQUF1QztBQUN2Qyx1QkFBcUI7QUFDckIsaUJBQTBFO0FBSTFFLFNBQVMsc0JBQThCO0FBQ3JDLFFBQU0sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV2YsYUFBTyxvQ0FBUyxpQkFBaUIsT0FBTyxRQUFRLE1BQU0sT0FBVSxDQUFDLEtBQUssRUFBRSxVQUFVLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDcEc7QUFFQSxlQUFzQixhQUFhLFVBQWtCLFNBQWlCLFlBQXVDO0FBQzNHLFFBQU0sT0FBTyxVQUFNLDRCQUFnQjtBQUNuQyxRQUFNLE1BQU0sS0FBSyxLQUFLLE9BQUssRUFBRSxhQUFhLFFBQVE7QUFFbEQsTUFBSSxDQUFDLEtBQUs7QUFDUixjQUFNLHNCQUFVO0FBQUEsTUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxNQUNuQixPQUFPLEdBQUcsT0FBTztBQUFBLElBQ25CLENBQUM7QUFDRDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQVEsT0FBTyxZQUFZO0FBQy9CLFFBQUk7QUFDRixhQUFPLFVBQU0sbUNBQXVCO0FBQUEsSUFDdEMsUUFDTTtBQUNKLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQUc7QUFFSCxNQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sV0FBVyxLQUFLLE1BQU0sR0FBRztBQUFBLElBQ2pDO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxhQUFhO0FBQ2pCLE1BQUk7QUFDRixpQkFBYSxvQkFBb0I7QUFBQSxFQUNuQyxRQUNNO0FBQUEsRUFFTjtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sV0FBVyxZQUFZLEdBQUc7QUFDaEM7QUFBQSxFQUNGO0FBRUEsWUFBTSxzQkFBVTtBQUFBLElBQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsSUFDbkIsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIO0FBVU8sU0FBUyxtQkFBbUIsTUFBYyxLQUF3QjtBQUN2RSxRQUFNLGNBQVUsdUJBQUssSUFBSSxNQUFNLFlBQVksU0FBUyxLQUFLO0FBRXpELDhDQUFhLFNBQVMsQ0FBQyxNQUFNLElBQUksR0FBRztBQUFBLElBQ2xDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FEakZBLGVBQU8sVUFBaUM7QUFDdEMsUUFBTSxhQUFhLHVCQUF1QixlQUFlLGtCQUFrQjtBQUM3RTsiLAogICJuYW1lcyI6IFtdCn0K
