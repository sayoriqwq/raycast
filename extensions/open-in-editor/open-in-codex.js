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

// src/open-in-codex.ts
var open_in_codex_exports = {};
__export(open_in_codex_exports, {
  default: () => open_in_codex_default
});
module.exports = __toCommonJS(open_in_codex_exports);
var import_api2 = require("@raycast/api");

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

// src/open-in-codex.ts
async function openInCodexWorkspace(path, app) {
  await (0, import_api2.open)(path, app);
  const deeplink = new URL("codex://threads/new");
  deeplink.searchParams.set("path", path);
  await (0, import_api2.open)(deeplink.toString(), app);
}
async function open_in_codex_default() {
  await openInEditor("com.openai.codex", "Codex", {
    openPath: openInCodexWorkspace
  });
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL29wZW4taW4tY29kZXgudHMiLCAiLi4vc3JjL2xpYi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgb3BlbiwgdHlwZSBBcHBsaWNhdGlvbiB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IG9wZW5JbkVkaXRvciB9IGZyb20gXCIuL2xpYlwiO1xuXG5hc3luYyBmdW5jdGlvbiBvcGVuSW5Db2RleFdvcmtzcGFjZShwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgb3BlbihwYXRoLCBhcHApO1xuXG4gIGNvbnN0IGRlZXBsaW5rID0gbmV3IFVSTChcImNvZGV4Oi8vdGhyZWFkcy9uZXdcIik7XG4gIGRlZXBsaW5rLnNlYXJjaFBhcmFtcy5zZXQoXCJwYXRoXCIsIHBhdGgpO1xuICBhd2FpdCBvcGVuKGRlZXBsaW5rLnRvU3RyaW5nKCksIGFwcCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgb3BlbkluRWRpdG9yKFwiY29tLm9wZW5haS5jb2RleFwiLCBcIkNvZGV4XCIsIHtcbiAgICBvcGVuUGF0aDogb3BlbkluQ29kZXhXb3Jrc3BhY2UsXG4gIH0pO1xufVxuIiwgImltcG9ydCB7IGdldEFwcGxpY2F0aW9ucywgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcywgb3Blbiwgc2hvd1RvYXN0LCBUb2FzdCwgdHlwZSBBcHBsaWNhdGlvbiB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGV4ZWNGaWxlU3luYywgZXhlY1N5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbnR5cGUgT3BlblBhdGggPSAocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZDtcblxudHlwZSBPcGVuSW5FZGl0b3JPcHRpb25zID0ge1xuICBvcGVuUGF0aD86IE9wZW5QYXRoO1xufTtcblxuZnVuY3Rpb24gZ2V0RmluZGVyV2luZG93UGF0aCgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgaWYgYXBwbGljYXRpb24gXCJGaW5kZXJcIiBpcyBydW5uaW5nIGFuZCBmcm9udG1vc3Qgb2YgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0aGVuXG4gICAgICB0ZWxsIGFwcCBcIkZpbmRlclwiXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3cgdG8gd2luZG93IDFcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvd1BhdGggdG8gKFBPU0lYIHBhdGggb2YgKHRhcmdldCBvZiBmaW5kZXJXaW5kb3cgYXMgYWxpYXMpKVxuICAgICAgICByZXR1cm4gZmluZGVyV2luZG93UGF0aFxuICAgICAgZW5kIHRlbGxcbiAgICBlbHNlXG4gICAgICBlcnJvciBcIkNvdWxkIG5vdCBnZXQgdGhlIHNlbGVjdGVkIEZpbmRlciB3aW5kb3dcIlxuICAgIGVuZCBpZlxuICBgO1xuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCBcIidcXFxcJydcIil9J2AsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KS50cmltKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5QYXRoKHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbiwgb3B0aW9uczogT3BlbkluRWRpdG9yT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAob3B0aW9ucy5vcGVuUGF0aCkge1xuICAgIGF3YWl0IG9wdGlvbnMub3BlblBhdGgocGF0aCwgYXBwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBvcGVuKHBhdGgsIGFwcCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5FZGl0b3IoYnVuZGxlSWQ6IHN0cmluZywgYXBwTmFtZTogc3RyaW5nLCBvcHRpb25zOiBPcGVuSW5FZGl0b3JPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwcyA9IGF3YWl0IGdldEFwcGxpY2F0aW9ucygpO1xuICBjb25zdCBhcHAgPSBhcHBzLmZpbmQoKGEpID0+IGEuYnVuZGxlSWQgPT09IGJ1bmRsZUlkKTtcblxuICBpZiAoIWFwcCkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBgJHthcHBOYW1lfSBpcyBub3QgaW5zdGFsbGVkYCxcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9KSgpO1xuXG4gIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBhd2FpdCBvcGVuUGF0aChpdGVtLnBhdGgsIGFwcCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB3aW5kb3dQYXRoID0gXCJcIjtcbiAgdHJ5IHtcbiAgICB3aW5kb3dQYXRoID0gZ2V0RmluZGVyV2luZG93UGF0aCgpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBDb3VsZCBub3QgZ2V0IHdpbmRvdyBwYXRoXG4gIH1cblxuICBpZiAod2luZG93UGF0aCkge1xuICAgIGF3YWl0IG9wZW5QYXRoKHdpbmRvd1BhdGgsIGFwcCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICB0aXRsZTogXCJObyBGaW5kZXIgaXRlbXMgb3Igd2luZG93IHNlbGVjdGVkXCIsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluWmVkTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjbGlQYXRoID0gam9pbihhcHAucGF0aCwgXCJDb250ZW50c1wiLCBcIk1hY09TXCIsIFwiY2xpXCIpO1xuICBjb25zdCB6ZWRQYXRoID0gZXhpc3RzU3luYyhjbGlQYXRoKSA/IGNsaVBhdGggOiBcIi91c3IvbG9jYWwvYmluL3plZFwiO1xuXG4gIGV4ZWNGaWxlU3luYyh6ZWRQYXRoLCBbXCItblwiLCBwYXRoXSwge1xuICAgIHN0ZGlvOiBcImlnbm9yZVwiLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLGNBQXVDOzs7QUNBdkMsaUJBQWtHO0FBQ2xHLGdDQUF1QztBQVV2QyxTQUFTLHNCQUE4QjtBQUNyQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdmLGFBQU8sb0NBQVMsaUJBQWlCLE9BQU8sUUFBUSxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ2pHO0FBRUEsZUFBZSxTQUFTLE1BQWMsS0FBa0IsU0FBNkM7QUFDbkcsTUFBSSxRQUFRLFVBQVU7QUFDcEIsVUFBTSxRQUFRLFNBQVMsTUFBTSxHQUFHO0FBQ2hDO0FBQUEsRUFDRjtBQUVBLFlBQU0saUJBQUssTUFBTSxHQUFHO0FBQ3RCO0FBRUEsZUFBc0IsYUFBYSxVQUFrQixTQUFpQixVQUErQixDQUFDLEdBQWtCO0FBQ3RILFFBQU0sT0FBTyxVQUFNLDRCQUFnQjtBQUNuQyxRQUFNLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFLGFBQWEsUUFBUTtBQUVwRCxNQUFJLENBQUMsS0FBSztBQUNSLGNBQU0sc0JBQVU7QUFBQSxNQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLE1BQ25CLE9BQU8sR0FBRyxPQUFPO0FBQUEsSUFDbkIsQ0FBQztBQUNEO0FBQUEsRUFDRjtBQUVBLFFBQU0sUUFBUSxPQUFPLFlBQVk7QUFDL0IsUUFBSTtBQUNGLGFBQU8sVUFBTSxtQ0FBdUI7QUFBQSxJQUN0QyxRQUFRO0FBQ04sYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUFBLEVBQ0YsR0FBRztBQUVILE1BQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxTQUFTLEtBQUssTUFBTSxLQUFLLE9BQU87QUFBQSxJQUN4QztBQUNBO0FBQUEsRUFDRjtBQUVBLE1BQUksYUFBYTtBQUNqQixNQUFJO0FBQ0YsaUJBQWEsb0JBQW9CO0FBQUEsRUFDbkMsUUFBUTtBQUFBLEVBRVI7QUFFQSxNQUFJLFlBQVk7QUFDZCxVQUFNLFNBQVMsWUFBWSxLQUFLLE9BQU87QUFDdkM7QUFBQSxFQUNGO0FBRUEsWUFBTSxzQkFBVTtBQUFBLElBQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsSUFDbkIsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIOzs7QUQzRUEsZUFBZSxxQkFBcUIsTUFBYyxLQUFpQztBQUNqRixZQUFNLGtCQUFLLE1BQU0sR0FBRztBQUVwQixRQUFNLFdBQVcsSUFBSSxJQUFJLHFCQUFxQjtBQUM5QyxXQUFTLGFBQWEsSUFBSSxRQUFRLElBQUk7QUFDdEMsWUFBTSxrQkFBSyxTQUFTLFNBQVMsR0FBRyxHQUFHO0FBQ3JDO0FBRUEsZUFBTyx3QkFBMEI7QUFDL0IsUUFBTSxhQUFhLG9CQUFvQixTQUFTO0FBQUEsSUFDOUMsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfYXBpIl0KfQo=
