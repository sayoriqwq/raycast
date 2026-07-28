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
var import_node_child_process = require("node:child_process");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLXZzY29kZS50cyIsICIuLi8uLi8uLi8uLi8uLi8uLi9Vc2Vycy9zYXlvcmkvRGVza3RvcC9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL2xpYi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgb3BlbkluRWRpdG9yIH0gZnJvbSAnLi9saWInXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgb3BlbkluRWRpdG9yKCdjb20ubWljcm9zb2Z0LlZTQ29kZScsICdWaXN1YWwgU3R1ZGlvIENvZGUnKVxufVxuIiwgImltcG9ydCB0eXBlIHsgQXBwbGljYXRpb24gfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5pbXBvcnQgeyBleGVjRmlsZVN5bmMsIGV4ZWNTeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZ2V0QXBwbGljYXRpb25zLCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zLCBvcGVuLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuXG50eXBlIE9wZW5QYXRoID0gKHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbikgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWRcblxuaW50ZXJmYWNlIE9wZW5JbkVkaXRvck9wdGlvbnMge1xuICBvcGVuUGF0aD86IE9wZW5QYXRoXG59XG5cbmZ1bmN0aW9uIGdldEZpbmRlcldpbmRvd1BhdGgoKTogc3RyaW5nIHtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIGlmIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgaXMgcnVubmluZyBhbmQgZnJvbnRtb3N0IG9mIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdGhlblxuICAgICAgdGVsbCBhcHAgXCJGaW5kZXJcIlxuICAgICAgICBzZXQgZmluZGVyV2luZG93IHRvIHdpbmRvdyAxXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3dQYXRoIHRvIChQT1NJWCBwYXRoIG9mICh0YXJnZXQgb2YgZmluZGVyV2luZG93IGFzIGFsaWFzKSlcbiAgICAgICAgcmV0dXJuIGZpbmRlcldpbmRvd1BhdGhcbiAgICAgIGVuZCB0ZWxsXG4gICAgZWxzZVxuICAgICAgZXJyb3IgXCJDb3VsZCBub3QgZ2V0IHRoZSBzZWxlY3RlZCBGaW5kZXIgd2luZG93XCJcbiAgICBlbmQgaWZcbiAgYFxuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCAnXFwnXFxcXFxcJ1xcJycpfSdgLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnRyaW0oKVxufVxuXG5hc3luYyBmdW5jdGlvbiBvcGVuUGF0aChwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24sIG9wdGlvbnM6IE9wZW5JbkVkaXRvck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKG9wdGlvbnMub3BlblBhdGgpIHtcbiAgICBhd2FpdCBvcHRpb25zLm9wZW5QYXRoKHBhdGgsIGFwcClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGF3YWl0IG9wZW4ocGF0aCwgYXBwKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkluRWRpdG9yKGJ1bmRsZUlkOiBzdHJpbmcsIGFwcE5hbWU6IHN0cmluZywgb3B0aW9uczogT3BlbkluRWRpdG9yT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcHMgPSBhd2FpdCBnZXRBcHBsaWNhdGlvbnMoKVxuICBjb25zdCBhcHAgPSBhcHBzLmZpbmQoYSA9PiBhLmJ1bmRsZUlkID09PSBidW5kbGVJZClcblxuICBpZiAoIWFwcCkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBgJHthcHBOYW1lfSBpcyBub3QgaW5zdGFsbGVkYCxcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgaXRlbXMgPSBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcygpXG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfSkoKVxuXG4gIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBhd2FpdCBvcGVuUGF0aChpdGVtLnBhdGgsIGFwcCwgb3B0aW9ucylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgd2luZG93UGF0aCA9ICcnXG4gIHRyeSB7XG4gICAgd2luZG93UGF0aCA9IGdldEZpbmRlcldpbmRvd1BhdGgoKVxuICB9XG4gIGNhdGNoIHtcbiAgICAvLyBDb3VsZCBub3QgZ2V0IHdpbmRvdyBwYXRoXG4gIH1cblxuICBpZiAod2luZG93UGF0aCkge1xuICAgIGF3YWl0IG9wZW5QYXRoKHdpbmRvd1BhdGgsIGFwcCwgb3B0aW9ucylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6ICdObyBGaW5kZXIgaXRlbXMgb3Igd2luZG93IHNlbGVjdGVkJyxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5JblplZE5ld1dpbmRvdyhwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHtcbiAgY29uc3QgY2xpUGF0aCA9IGpvaW4oYXBwLnBhdGgsICdDb250ZW50cycsICdNYWNPUycsICdjbGknKVxuICBjb25zdCB6ZWRQYXRoID0gZXhpc3RzU3luYyhjbGlQYXRoKSA/IGNsaVBhdGggOiAnL3Vzci9sb2NhbC9iaW4vemVkJ1xuXG4gIGV4ZWNGaWxlU3luYyh6ZWRQYXRoLCBbJy1uJywgcGF0aF0sIHtcbiAgICBzdGRpbzogJ2lnbm9yZScsXG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0NBLGdDQUF1QztBQUd2QyxpQkFBZ0Y7QUFRaEYsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNwRztBQUVBLGVBQWUsU0FBUyxNQUFjLEtBQWtCLFNBQTZDO0FBQ25HLE1BQUksUUFBUSxVQUFVO0FBQ3BCLFVBQU0sUUFBUSxTQUFTLE1BQU0sR0FBRztBQUNoQztBQUFBLEVBQ0Y7QUFFQSxZQUFNLGlCQUFLLE1BQU0sR0FBRztBQUN0QjtBQUVBLGVBQXNCLGFBQWEsVUFBa0IsU0FBaUIsVUFBK0IsQ0FBQyxHQUFrQjtBQUN0SCxRQUFNLE9BQU8sVUFBTSw0QkFBZ0I7QUFDbkMsUUFBTSxNQUFNLEtBQUssS0FBSyxPQUFLLEVBQUUsYUFBYSxRQUFRO0FBRWxELE1BQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNuQixDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLE9BQU8sWUFBWTtBQUMvQixRQUFJO0FBQ0YsYUFBTyxVQUFNLG1DQUF1QjtBQUFBLElBQ3RDLFFBQ007QUFDSixhQUFPLENBQUM7QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHO0FBRUgsTUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTztBQUFBLElBQ3hDO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxhQUFhO0FBQ2pCLE1BQUk7QUFDRixpQkFBYSxvQkFBb0I7QUFBQSxFQUNuQyxRQUNNO0FBQUEsRUFFTjtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sU0FBUyxZQUFZLEtBQUssT0FBTztBQUN2QztBQUFBLEVBQ0Y7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7OztBRC9FQSxlQUFPLHlCQUEwQjtBQUMvQixRQUFNLGFBQWEsd0JBQXdCLG9CQUFvQjtBQUNqRTsiLAogICJuYW1lcyI6IFtdCn0K
