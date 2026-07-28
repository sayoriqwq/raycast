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

// src/open-in-vscode.ts
var open_in_vscode_exports = {};
__export(open_in_vscode_exports, {
  default: () => open_in_vscode_default
});
module.exports = __toCommonJS(open_in_vscode_exports);

// src/lib.ts
var import_api = require("@raycast/api");
var import_node_child_process = require("node:child_process");
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
async function openPath(path, app, options) {
  if (options.openPath) {
    await options.openPath(path, app);
    return;
  }
  await (0, import_api.open)(path, app);
}
async function openInEditor(bundleId, appName, options = {}) {
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
      await openPath(item.path, app, options);
    }
    return;
  }
  let windowPath = "";
  try {
    windowPath = getFinderWindowPath();
  } catch {
  }
  if (windowPath) {
    await openPath(windowPath, app, options);
    return;
  }
  await (0, import_api.showToast)({
    style: import_api.Toast.Style.Failure,
    title: "No Finder items or window selected"
  });
}

// src/open-in-vscode.ts
async function open_in_vscode_default() {
  await openInEditor("com.microsoft.VSCode", "Visual Studio Code");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLXZzY29kZS50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXlvcmkvRGVza3RvcC9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL2xpYi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgb3BlbkluRWRpdG9yIH0gZnJvbSBcIi4vbGliXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgb3BlbkluRWRpdG9yKFwiY29tLm1pY3Jvc29mdC5WU0NvZGVcIiwgXCJWaXN1YWwgU3R1ZGlvIENvZGVcIik7XG59XG4iLCAiaW1wb3J0IHsgZ2V0QXBwbGljYXRpb25zLCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zLCBvcGVuLCBzaG93VG9hc3QsIFRvYXN0LCB0eXBlIEFwcGxpY2F0aW9uIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhlY0ZpbGVTeW5jLCBleGVjU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJub2RlOnBhdGhcIjtcblxudHlwZSBPcGVuUGF0aCA9IChwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pID0+IFByb21pc2U8dm9pZD4gfCB2b2lkO1xuXG50eXBlIE9wZW5JbkVkaXRvck9wdGlvbnMgPSB7XG4gIG9wZW5QYXRoPzogT3BlblBhdGg7XG59O1xuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICBzZXQgZmluZGVyV2luZG93UGF0aCB0byAoUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcykpXG4gICAgICAgIHJldHVybiBmaW5kZXJXaW5kb3dQYXRoXG4gICAgICBlbmQgdGVsbFxuICAgIGVsc2VcbiAgICAgIGVycm9yIFwiQ291bGQgbm90IGdldCB0aGUgc2VsZWN0ZWQgRmluZGVyIHdpbmRvd1wiXG4gICAgZW5kIGlmXG4gIGA7XG4gIHJldHVybiBleGVjU3luYyhgb3Nhc2NyaXB0IC1lICcke3NjcmlwdC5yZXBsYWNlKC8nL2csIFwiJ1xcXFwnJ1wiKX0nYCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pLnRyaW0oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlblBhdGgocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uLCBvcHRpb25zOiBPcGVuSW5FZGl0b3JPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChvcHRpb25zLm9wZW5QYXRoKSB7XG4gICAgYXdhaXQgb3B0aW9ucy5vcGVuUGF0aChwYXRoLCBhcHApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IG9wZW4ocGF0aCwgYXBwKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5JbkVkaXRvcihidW5kbGVJZDogc3RyaW5nLCBhcHBOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IE9wZW5JbkVkaXRvck9wdGlvbnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHBzID0gYXdhaXQgZ2V0QXBwbGljYXRpb25zKCk7XG4gIGNvbnN0IGFwcCA9IGFwcHMuZmluZCgoYSkgPT4gYS5idW5kbGVJZCA9PT0gYnVuZGxlSWQpO1xuXG4gIGlmICghYXBwKSB7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgdGl0bGU6IGAke2FwcE5hbWV9IGlzIG5vdCBpbnN0YWxsZWRgLFxuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGdldFNlbGVjdGVkRmluZGVySXRlbXMoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGF3YWl0IG9wZW5QYXRoKGl0ZW0ucGF0aCwgYXBwLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHdpbmRvd1BhdGggPSBcIlwiO1xuICB0cnkge1xuICAgIHdpbmRvd1BhdGggPSBnZXRGaW5kZXJXaW5kb3dQYXRoKCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIENvdWxkIG5vdCBnZXQgd2luZG93IHBhdGhcbiAgfVxuXG4gIGlmICh3aW5kb3dQYXRoKSB7XG4gICAgYXdhaXQgb3BlblBhdGgod2luZG93UGF0aCwgYXBwLCBvcHRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgIHRpdGxlOiBcIk5vIEZpbmRlciBpdGVtcyBvciB3aW5kb3cgc2VsZWN0ZWRcIixcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuSW5aZWROZXdXaW5kb3cocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGNvbnN0IGNsaVBhdGggPSBqb2luKGFwcC5wYXRoLCBcIkNvbnRlbnRzXCIsIFwiTWFjT1NcIiwgXCJjbGlcIik7XG4gIGNvbnN0IHplZFBhdGggPSBleGlzdHNTeW5jKGNsaVBhdGgpID8gY2xpUGF0aCA6IFwiL3Vzci9sb2NhbC9iaW4vemVkXCI7XG5cbiAgZXhlY0ZpbGVTeW5jKHplZFBhdGgsIFtcIi1uXCIsIHBhdGhdLCB7XG4gICAgc3RkaW86IFwiaWdub3JlXCIsXG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxpQkFBa0c7QUFDbEcsZ0NBQXVDO0FBVXZDLFNBQVMsc0JBQThCO0FBQ3JDLFFBQU0sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV2YsYUFBTyxvQ0FBUyxpQkFBaUIsT0FBTyxRQUFRLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDakc7QUFFQSxlQUFlLFNBQVMsTUFBYyxLQUFrQixTQUE2QztBQUNuRyxNQUFJLFFBQVEsVUFBVTtBQUNwQixVQUFNLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDaEM7QUFBQSxFQUNGO0FBRUEsWUFBTSxpQkFBSyxNQUFNLEdBQUc7QUFDdEI7QUFFQSxlQUFzQixhQUFhLFVBQWtCLFNBQWlCLFVBQStCLENBQUMsR0FBa0I7QUFDdEgsUUFBTSxPQUFPLFVBQU0sNEJBQWdCO0FBQ25DLFFBQU0sTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsYUFBYSxRQUFRO0FBRXBELE1BQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNuQixDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLE9BQU8sWUFBWTtBQUMvQixRQUFJO0FBQ0YsYUFBTyxVQUFNLG1DQUF1QjtBQUFBLElBQ3RDLFFBQVE7QUFDTixhQUFPLENBQUM7QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHO0FBRUgsTUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTztBQUFBLElBQ3hDO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxhQUFhO0FBQ2pCLE1BQUk7QUFDRixpQkFBYSxvQkFBb0I7QUFBQSxFQUNuQyxRQUFRO0FBQUEsRUFFUjtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sU0FBUyxZQUFZLEtBQUssT0FBTztBQUN2QztBQUFBLEVBQ0Y7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7OztBRDVFQSxlQUFPLHlCQUEwQjtBQUMvQixRQUFNLGFBQWEsd0JBQXdCLG9CQUFvQjtBQUNqRTsiLAogICJuYW1lcyI6IFtdCn0K
