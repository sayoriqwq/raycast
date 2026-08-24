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
function openInVSCodeNewWindow(path, app) {
  const codePath = (0, import_node_path.join)(app.path, "Contents", "Resources", "app", "bin", "code");
  (0, import_node_child_process.execFileSync)(codePath, ["--new-window", path], {
    stdio: "ignore"
  });
}

// src/open-in-vscode.ts
async function open_in_vscode_default() {
  await openInEditor("com.microsoft.VSCode", "Visual Studio Code", openInVSCodeNewWindow);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpLy5jb2RleC93b3JrdHJlZXMvcmF5Y2FzdC16ZWQtcHJldmlldy9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL29wZW4taW4tdnNjb2RlLnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS8uY29kZXgvd29ya3RyZWVzL3JheWNhc3QtemVkLXByZXZpZXcvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9saWIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IG9wZW5JbkVkaXRvciwgb3BlbkluVlNDb2RlTmV3V2luZG93IH0gZnJvbSAnLi9saWInXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgb3BlbkluRWRpdG9yKCdjb20ubWljcm9zb2Z0LlZTQ29kZScsICdWaXN1YWwgU3R1ZGlvIENvZGUnLCBvcGVuSW5WU0NvZGVOZXdXaW5kb3cpXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IGV4ZWNGaWxlU3luYywgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZ2V0QXBwbGljYXRpb25zLCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuXG50eXBlIE9wZW5UYXJnZXQgPSAocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZFxuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICBzZXQgZmluZGVyV2luZG93UGF0aCB0byAoUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcykpXG4gICAgICAgIHJldHVybiBmaW5kZXJXaW5kb3dQYXRoXG4gICAgICBlbmQgdGVsbFxuICAgIGVsc2VcbiAgICAgIGVycm9yIFwiQ291bGQgbm90IGdldCB0aGUgc2VsZWN0ZWQgRmluZGVyIHdpbmRvd1wiXG4gICAgZW5kIGlmXG4gIGBcbiAgcmV0dXJuIGV4ZWNTeW5jKGBvc2FzY3JpcHQgLWUgJyR7c2NyaXB0LnJlcGxhY2UoLycvZywgJ1xcJ1xcXFxcXCdcXCcnKX0nYCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KS50cmltKClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5JbkVkaXRvcihidW5kbGVJZDogc3RyaW5nLCBhcHBOYW1lOiBzdHJpbmcsIG9wZW5UYXJnZXQ6IE9wZW5UYXJnZXQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwcyA9IGF3YWl0IGdldEFwcGxpY2F0aW9ucygpXG4gIGNvbnN0IGFwcCA9IGFwcHMuZmluZChhID0+IGEuYnVuZGxlSWQgPT09IGJ1bmRsZUlkKVxuXG4gIGlmICghYXBwKSB7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgdGl0bGU6IGAke2FwcE5hbWV9IGlzIG5vdCBpbnN0YWxsZWRgLFxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKClcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9KSgpXG5cbiAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGF3YWl0IG9wZW5UYXJnZXQoaXRlbS5wYXRoLCBhcHApXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IHdpbmRvd1BhdGggPSAnJ1xuICB0cnkge1xuICAgIHdpbmRvd1BhdGggPSBnZXRGaW5kZXJXaW5kb3dQYXRoKClcbiAgfVxuICBjYXRjaCB7XG4gICAgLy8gQ291bGQgbm90IGdldCB3aW5kb3cgcGF0aFxuICB9XG5cbiAgaWYgKHdpbmRvd1BhdGgpIHtcbiAgICBhd2FpdCBvcGVuVGFyZ2V0KHdpbmRvd1BhdGgsIGFwcClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6ICdObyBGaW5kZXIgaXRlbXMgb3Igd2luZG93IHNlbGVjdGVkJyxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5JblZTQ29kZU5ld1dpbmRvdyhwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHtcbiAgY29uc3QgY29kZVBhdGggPSBqb2luKGFwcC5wYXRoLCAnQ29udGVudHMnLCAnUmVzb3VyY2VzJywgJ2FwcCcsICdiaW4nLCAnY29kZScpXG5cbiAgZXhlY0ZpbGVTeW5jKGNvZGVQYXRoLCBbJy0tbmV3LXdpbmRvdycsIHBhdGhdLCB7XG4gICAgc3RkaW86ICdpZ25vcmUnLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluWmVkTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjbGlQYXRoID0gam9pbihhcHAucGF0aCwgJ0NvbnRlbnRzJywgJ01hY09TJywgJ2NsaScpXG5cbiAgZXhlY0ZpbGVTeW5jKGNsaVBhdGgsIFsnLW4nLCBwYXRoXSwge1xuICAgIHN0ZGlvOiAnaWdub3JlJyxcbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQ0EsZ0NBQXVDO0FBQ3ZDLHVCQUFxQjtBQUNyQixpQkFBMEU7QUFJMUUsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNwRztBQUVBLGVBQXNCLGFBQWEsVUFBa0IsU0FBaUIsWUFBdUM7QUFDM0csUUFBTSxPQUFPLFVBQU0sNEJBQWdCO0FBQ25DLFFBQU0sTUFBTSxLQUFLLEtBQUssT0FBSyxFQUFFLGFBQWEsUUFBUTtBQUVsRCxNQUFJLENBQUMsS0FBSztBQUNSLGNBQU0sc0JBQVU7QUFBQSxNQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLE1BQ25CLE9BQU8sR0FBRyxPQUFPO0FBQUEsSUFDbkIsQ0FBQztBQUNEO0FBQUEsRUFDRjtBQUVBLFFBQU0sUUFBUSxPQUFPLFlBQVk7QUFDL0IsUUFBSTtBQUNGLGFBQU8sVUFBTSxtQ0FBdUI7QUFBQSxJQUN0QyxRQUNNO0FBQ0osYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUFBLEVBQ0YsR0FBRztBQUVILE1BQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQUEsSUFDakM7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGFBQWE7QUFDakIsTUFBSTtBQUNGLGlCQUFhLG9CQUFvQjtBQUFBLEVBQ25DLFFBQ007QUFBQSxFQUVOO0FBRUEsTUFBSSxZQUFZO0FBQ2QsVUFBTSxXQUFXLFlBQVksR0FBRztBQUNoQztBQUFBLEVBQ0Y7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7QUFFTyxTQUFTLHNCQUFzQixNQUFjLEtBQXdCO0FBQzFFLFFBQU0sZUFBVyx1QkFBSyxJQUFJLE1BQU0sWUFBWSxhQUFhLE9BQU8sT0FBTyxNQUFNO0FBRTdFLDhDQUFhLFVBQVUsQ0FBQyxnQkFBZ0IsSUFBSSxHQUFHO0FBQUEsSUFDN0MsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIOzs7QUR6RUEsZUFBTyx5QkFBMEI7QUFDL0IsUUFBTSxhQUFhLHdCQUF3QixzQkFBc0IscUJBQXFCO0FBQ3hGOyIsCiAgIm5hbWVzIjogW10KfQo=
