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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLWNvZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy9vcGVuLWluLWVkaXRvci9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuaW1wb3J0IHsgb3BlbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IG9wZW5JbkVkaXRvciB9IGZyb20gJy4vbGliJ1xuXG5hc3luYyBmdW5jdGlvbiBvcGVuSW5Db2RleFdvcmtzcGFjZShwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgb3BlbihwYXRoLCBhcHApXG5cbiAgY29uc3QgZGVlcGxpbmsgPSBuZXcgVVJMKCdjb2RleDovL3RocmVhZHMvbmV3JylcbiAgZGVlcGxpbmsuc2VhcmNoUGFyYW1zLnNldCgncGF0aCcsIHBhdGgpXG4gIGF3YWl0IG9wZW4oZGVlcGxpbmsudG9TdHJpbmcoKSwgYXBwKVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IG9wZW5JbkVkaXRvcignY29tLm9wZW5haS5jb2RleCcsICdDb2RleCcsIHtcbiAgICBvcGVuUGF0aDogb3BlbkluQ29kZXhXb3Jrc3BhY2UsXG4gIH0pXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IGV4ZWNGaWxlU3luYywgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBnZXRBcHBsaWNhdGlvbnMsIGdldFNlbGVjdGVkRmluZGVySXRlbXMsIG9wZW4sIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5cbnR5cGUgT3BlblBhdGggPSAocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZFxuXG5pbnRlcmZhY2UgT3BlbkluRWRpdG9yT3B0aW9ucyB7XG4gIG9wZW5QYXRoPzogT3BlblBhdGhcbn1cblxuZnVuY3Rpb24gZ2V0RmluZGVyV2luZG93UGF0aCgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgaWYgYXBwbGljYXRpb24gXCJGaW5kZXJcIiBpcyBydW5uaW5nIGFuZCBmcm9udG1vc3Qgb2YgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0aGVuXG4gICAgICB0ZWxsIGFwcCBcIkZpbmRlclwiXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3cgdG8gd2luZG93IDFcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvd1BhdGggdG8gKFBPU0lYIHBhdGggb2YgKHRhcmdldCBvZiBmaW5kZXJXaW5kb3cgYXMgYWxpYXMpKVxuICAgICAgICByZXR1cm4gZmluZGVyV2luZG93UGF0aFxuICAgICAgZW5kIHRlbGxcbiAgICBlbHNlXG4gICAgICBlcnJvciBcIkNvdWxkIG5vdCBnZXQgdGhlIHNlbGVjdGVkIEZpbmRlciB3aW5kb3dcIlxuICAgIGVuZCBpZlxuICBgXG4gIHJldHVybiBleGVjU3luYyhgb3Nhc2NyaXB0IC1lICcke3NjcmlwdC5yZXBsYWNlKC8nL2csICdcXCdcXFxcXFwnXFwnJyl9J2AsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkudHJpbSgpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5QYXRoKHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbiwgb3B0aW9uczogT3BlbkluRWRpdG9yT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAob3B0aW9ucy5vcGVuUGF0aCkge1xuICAgIGF3YWl0IG9wdGlvbnMub3BlblBhdGgocGF0aCwgYXBwKVxuICAgIHJldHVyblxuICB9XG5cbiAgYXdhaXQgb3BlbihwYXRoLCBhcHApXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5FZGl0b3IoYnVuZGxlSWQ6IHN0cmluZywgYXBwTmFtZTogc3RyaW5nLCBvcHRpb25zOiBPcGVuSW5FZGl0b3JPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwcyA9IGF3YWl0IGdldEFwcGxpY2F0aW9ucygpXG4gIGNvbnN0IGFwcCA9IGFwcHMuZmluZChhID0+IGEuYnVuZGxlSWQgPT09IGJ1bmRsZUlkKVxuXG4gIGlmICghYXBwKSB7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgdGl0bGU6IGAke2FwcE5hbWV9IGlzIG5vdCBpbnN0YWxsZWRgLFxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKClcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9KSgpXG5cbiAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGF3YWl0IG9wZW5QYXRoKGl0ZW0ucGF0aCwgYXBwLCBvcHRpb25zKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCB3aW5kb3dQYXRoID0gJydcbiAgdHJ5IHtcbiAgICB3aW5kb3dQYXRoID0gZ2V0RmluZGVyV2luZG93UGF0aCgpXG4gIH1cbiAgY2F0Y2gge1xuICAgIC8vIENvdWxkIG5vdCBnZXQgd2luZG93IHBhdGhcbiAgfVxuXG4gIGlmICh3aW5kb3dQYXRoKSB7XG4gICAgYXdhaXQgb3BlblBhdGgod2luZG93UGF0aCwgYXBwLCBvcHRpb25zKVxuICAgIHJldHVyblxuICB9XG5cbiAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICB0aXRsZTogJ05vIEZpbmRlciBpdGVtcyBvciB3aW5kb3cgc2VsZWN0ZWQnLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluWmVkTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjbGlQYXRoID0gam9pbihhcHAucGF0aCwgJ0NvbnRlbnRzJywgJ01hY09TJywgJ2NsaScpXG4gIGNvbnN0IHplZFBhdGggPSBleGlzdHNTeW5jKGNsaVBhdGgpID8gY2xpUGF0aCA6ICcvdXNyL2xvY2FsL2Jpbi96ZWQnXG5cbiAgZXhlY0ZpbGVTeW5jKHplZFBhdGgsIFsnLW4nLCBwYXRoXSwge1xuICAgIHN0ZGlvOiAnaWdub3JlJyxcbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBLElBQUFBLGNBQXFCOzs7QUNBckIsZ0NBQXVDO0FBR3ZDLGlCQUFnRjtBQVFoRixTQUFTLHNCQUE4QjtBQUNyQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdmLGFBQU8sb0NBQVMsaUJBQWlCLE9BQU8sUUFBUSxNQUFNLE9BQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ3BHO0FBRUEsZUFBZSxTQUFTLE1BQWMsS0FBa0IsU0FBNkM7QUFDbkcsTUFBSSxRQUFRLFVBQVU7QUFDcEIsVUFBTSxRQUFRLFNBQVMsTUFBTSxHQUFHO0FBQ2hDO0FBQUEsRUFDRjtBQUVBLFlBQU0saUJBQUssTUFBTSxHQUFHO0FBQ3RCO0FBRUEsZUFBc0IsYUFBYSxVQUFrQixTQUFpQixVQUErQixDQUFDLEdBQWtCO0FBQ3RILFFBQU0sT0FBTyxVQUFNLDRCQUFnQjtBQUNuQyxRQUFNLE1BQU0sS0FBSyxLQUFLLE9BQUssRUFBRSxhQUFhLFFBQVE7QUFFbEQsTUFBSSxDQUFDLEtBQUs7QUFDUixjQUFNLHNCQUFVO0FBQUEsTUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxNQUNuQixPQUFPLEdBQUcsT0FBTztBQUFBLElBQ25CLENBQUM7QUFDRDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQVEsT0FBTyxZQUFZO0FBQy9CLFFBQUk7QUFDRixhQUFPLFVBQU0sbUNBQXVCO0FBQUEsSUFDdEMsUUFDTTtBQUNKLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQUc7QUFFSCxNQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sU0FBUyxLQUFLLE1BQU0sS0FBSyxPQUFPO0FBQUEsSUFDeEM7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGFBQWE7QUFDakIsTUFBSTtBQUNGLGlCQUFhLG9CQUFvQjtBQUFBLEVBQ25DLFFBQ007QUFBQSxFQUVOO0FBRUEsTUFBSSxZQUFZO0FBQ2QsVUFBTSxTQUFTLFlBQVksS0FBSyxPQUFPO0FBQ3ZDO0FBQUEsRUFDRjtBQUVBLFlBQU0sc0JBQVU7QUFBQSxJQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLElBQ25CLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FEN0VBLGVBQWUscUJBQXFCLE1BQWMsS0FBaUM7QUFDakYsWUFBTSxrQkFBSyxNQUFNLEdBQUc7QUFFcEIsUUFBTSxXQUFXLElBQUksSUFBSSxxQkFBcUI7QUFDOUMsV0FBUyxhQUFhLElBQUksUUFBUSxJQUFJO0FBQ3RDLFlBQU0sa0JBQUssU0FBUyxTQUFTLEdBQUcsR0FBRztBQUNyQztBQUVBLGVBQU8sd0JBQTBCO0FBQy9CLFFBQU0sYUFBYSxvQkFBb0IsU0FBUztBQUFBLElBQzlDLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2FwaSJdCn0K
