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

// src/open-in-codex.ts
async function openInCodexWorkspace(path, app) {
  await (0, import_api2.open)(path, app);
  const deeplink = new URL("codex://threads/new");
  deeplink.searchParams.set("path", path);
  await (0, import_api2.open)(deeplink.toString(), app);
}
async function open_in_codex_default() {
  await openInEditor("com.openai.codex", "Codex", openInCodexWorkspace);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLWNvZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy9vcGVuLWluLWVkaXRvci9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuaW1wb3J0IHsgb3BlbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IG9wZW5JbkVkaXRvciB9IGZyb20gJy4vbGliJ1xuXG5hc3luYyBmdW5jdGlvbiBvcGVuSW5Db2RleFdvcmtzcGFjZShwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgb3BlbihwYXRoLCBhcHApXG5cbiAgY29uc3QgZGVlcGxpbmsgPSBuZXcgVVJMKCdjb2RleDovL3RocmVhZHMvbmV3JylcbiAgZGVlcGxpbmsuc2VhcmNoUGFyYW1zLnNldCgncGF0aCcsIHBhdGgpXG4gIGF3YWl0IG9wZW4oZGVlcGxpbmsudG9TdHJpbmcoKSwgYXBwKVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IG9wZW5JbkVkaXRvcignY29tLm9wZW5haS5jb2RleCcsICdDb2RleCcsIG9wZW5JbkNvZGV4V29ya3NwYWNlKVxufVxuIiwgImltcG9ydCB0eXBlIHsgQXBwbGljYXRpb24gfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5pbXBvcnQgeyBleGVjRmlsZVN5bmMsIGV4ZWNTeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZ2V0QXBwbGljYXRpb25zLCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuXG50eXBlIE9wZW5UYXJnZXQgPSAocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZFxuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICBzZXQgZmluZGVyV2luZG93UGF0aCB0byAoUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcykpXG4gICAgICAgIHJldHVybiBmaW5kZXJXaW5kb3dQYXRoXG4gICAgICBlbmQgdGVsbFxuICAgIGVsc2VcbiAgICAgIGVycm9yIFwiQ291bGQgbm90IGdldCB0aGUgc2VsZWN0ZWQgRmluZGVyIHdpbmRvd1wiXG4gICAgZW5kIGlmXG4gIGBcbiAgcmV0dXJuIGV4ZWNTeW5jKGBvc2FzY3JpcHQgLWUgJyR7c2NyaXB0LnJlcGxhY2UoLycvZywgJ1xcJ1xcXFxcXCdcXCcnKX0nYCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KS50cmltKClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5JbkVkaXRvcihidW5kbGVJZDogc3RyaW5nLCBhcHBOYW1lOiBzdHJpbmcsIG9wZW5UYXJnZXQ6IE9wZW5UYXJnZXQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwcyA9IGF3YWl0IGdldEFwcGxpY2F0aW9ucygpXG4gIGNvbnN0IGFwcCA9IGFwcHMuZmluZChhID0+IGEuYnVuZGxlSWQgPT09IGJ1bmRsZUlkKVxuXG4gIGlmICghYXBwKSB7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgdGl0bGU6IGAke2FwcE5hbWV9IGlzIG5vdCBpbnN0YWxsZWRgLFxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKClcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9KSgpXG5cbiAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGF3YWl0IG9wZW5UYXJnZXQoaXRlbS5wYXRoLCBhcHApXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IHdpbmRvd1BhdGggPSAnJ1xuICB0cnkge1xuICAgIHdpbmRvd1BhdGggPSBnZXRGaW5kZXJXaW5kb3dQYXRoKClcbiAgfVxuICBjYXRjaCB7XG4gICAgLy8gQ291bGQgbm90IGdldCB3aW5kb3cgcGF0aFxuICB9XG5cbiAgaWYgKHdpbmRvd1BhdGgpIHtcbiAgICBhd2FpdCBvcGVuVGFyZ2V0KHdpbmRvd1BhdGgsIGFwcClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6ICdObyBGaW5kZXIgaXRlbXMgb3Igd2luZG93IHNlbGVjdGVkJyxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5JblZTQ29kZU5ld1dpbmRvdyhwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHtcbiAgY29uc3QgY29kZVBhdGggPSBqb2luKGFwcC5wYXRoLCAnQ29udGVudHMnLCAnUmVzb3VyY2VzJywgJ2FwcCcsICdiaW4nLCAnY29kZScpXG5cbiAgZXhlY0ZpbGVTeW5jKGNvZGVQYXRoLCBbJy0tbmV3LXdpbmRvdycsIHBhdGhdLCB7XG4gICAgc3RkaW86ICdpZ25vcmUnLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluWmVkTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjbGlQYXRoID0gam9pbihhcHAucGF0aCwgJ0NvbnRlbnRzJywgJ01hY09TJywgJ2NsaScpXG4gIGNvbnN0IHplZFBhdGggPSBleGlzdHNTeW5jKGNsaVBhdGgpID8gY2xpUGF0aCA6ICcvdXNyL2xvY2FsL2Jpbi96ZWQnXG5cbiAgZXhlY0ZpbGVTeW5jKHplZFBhdGgsIFsnLW4nLCBwYXRoXSwge1xuICAgIHN0ZGlvOiAnaWdub3JlJyxcbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBLElBQUFBLGNBQXFCOzs7QUNBckIsZ0NBQXVDO0FBR3ZDLGlCQUEwRTtBQUkxRSxTQUFTLHNCQUE4QjtBQUNyQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdmLGFBQU8sb0NBQVMsaUJBQWlCLE9BQU8sUUFBUSxNQUFNLE9BQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ3BHO0FBRUEsZUFBc0IsYUFBYSxVQUFrQixTQUFpQixZQUF1QztBQUMzRyxRQUFNLE9BQU8sVUFBTSw0QkFBZ0I7QUFDbkMsUUFBTSxNQUFNLEtBQUssS0FBSyxPQUFLLEVBQUUsYUFBYSxRQUFRO0FBRWxELE1BQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNuQixDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLE9BQU8sWUFBWTtBQUMvQixRQUFJO0FBQ0YsYUFBTyxVQUFNLG1DQUF1QjtBQUFBLElBQ3RDLFFBQ007QUFDSixhQUFPLENBQUM7QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHO0FBRUgsTUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFdBQVcsS0FBSyxNQUFNLEdBQUc7QUFBQSxJQUNqQztBQUNBO0FBQUEsRUFDRjtBQUVBLE1BQUksYUFBYTtBQUNqQixNQUFJO0FBQ0YsaUJBQWEsb0JBQW9CO0FBQUEsRUFDbkMsUUFDTTtBQUFBLEVBRU47QUFFQSxNQUFJLFlBQVk7QUFDZCxVQUFNLFdBQVcsWUFBWSxHQUFHO0FBQ2hDO0FBQUEsRUFDRjtBQUVBLFlBQU0sc0JBQVU7QUFBQSxJQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLElBQ25CLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FEaEVBLGVBQWUscUJBQXFCLE1BQWMsS0FBaUM7QUFDakYsWUFBTSxrQkFBSyxNQUFNLEdBQUc7QUFFcEIsUUFBTSxXQUFXLElBQUksSUFBSSxxQkFBcUI7QUFDOUMsV0FBUyxhQUFhLElBQUksUUFBUSxJQUFJO0FBQ3RDLFlBQU0sa0JBQUssU0FBUyxTQUFTLEdBQUcsR0FBRztBQUNyQztBQUVBLGVBQU8sd0JBQTBCO0FBQy9CLFFBQU0sYUFBYSxvQkFBb0IsU0FBUyxvQkFBb0I7QUFDdEU7IiwKICAibmFtZXMiOiBbImltcG9ydF9hcGkiXQp9Cg==
