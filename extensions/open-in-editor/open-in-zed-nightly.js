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

// src/open-in-zed-nightly.ts
var open_in_zed_nightly_exports = {};
__export(open_in_zed_nightly_exports, {
  default: () => Command
});
module.exports = __toCommonJS(open_in_zed_nightly_exports);

// src/lib.ts
var import_api = require("@raycast/api");
var import_node_child_process = require("node:child_process");
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
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
function openInZedNewWindow(path, app) {
  const cliPath = (0, import_node_path.join)(app.path, "Contents", "MacOS", "cli");
  const zedPath = (0, import_node_fs.existsSync)(cliPath) ? cliPath : "/usr/local/bin/zed";
  (0, import_node_child_process.execFileSync)(zedPath, ["-n", path], {
    stdio: "ignore"
  });
}

// src/open-in-zed-nightly.ts
async function Command() {
  await openInEditor("dev.zed.Zed-Nightly", "Zed Nightly", {
    openPath: openInZedNewWindow
  });
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLXplZC1uaWdodGx5LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy9vcGVuLWluLWVkaXRvci9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBvcGVuSW5FZGl0b3IsIG9wZW5JblplZE5ld1dpbmRvdyB9IGZyb20gXCIuL2xpYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBDb21tYW5kKCkge1xuICBhd2FpdCBvcGVuSW5FZGl0b3IoXCJkZXYuemVkLlplZC1OaWdodGx5XCIsIFwiWmVkIE5pZ2h0bHlcIiwge1xuICAgIG9wZW5QYXRoOiBvcGVuSW5aZWROZXdXaW5kb3csXG4gIH0pO1xufVxuIiwgImltcG9ydCB7IGdldEFwcGxpY2F0aW9ucywgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcywgb3Blbiwgc2hvd1RvYXN0LCBUb2FzdCwgdHlwZSBBcHBsaWNhdGlvbiB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGV4ZWNGaWxlU3luYywgZXhlY1N5bmMgfSBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbnR5cGUgT3BlblBhdGggPSAocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZDtcblxudHlwZSBPcGVuSW5FZGl0b3JPcHRpb25zID0ge1xuICBvcGVuUGF0aD86IE9wZW5QYXRoO1xufTtcblxuZnVuY3Rpb24gZ2V0RmluZGVyV2luZG93UGF0aCgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgaWYgYXBwbGljYXRpb24gXCJGaW5kZXJcIiBpcyBydW5uaW5nIGFuZCBmcm9udG1vc3Qgb2YgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0aGVuXG4gICAgICB0ZWxsIGFwcCBcIkZpbmRlclwiXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3cgdG8gd2luZG93IDFcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvd1BhdGggdG8gKFBPU0lYIHBhdGggb2YgKHRhcmdldCBvZiBmaW5kZXJXaW5kb3cgYXMgYWxpYXMpKVxuICAgICAgICByZXR1cm4gZmluZGVyV2luZG93UGF0aFxuICAgICAgZW5kIHRlbGxcbiAgICBlbHNlXG4gICAgICBlcnJvciBcIkNvdWxkIG5vdCBnZXQgdGhlIHNlbGVjdGVkIEZpbmRlciB3aW5kb3dcIlxuICAgIGVuZCBpZlxuICBgO1xuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCBcIidcXFxcJydcIil9J2AsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KS50cmltKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5QYXRoKHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbiwgb3B0aW9uczogT3BlbkluRWRpdG9yT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAob3B0aW9ucy5vcGVuUGF0aCkge1xuICAgIGF3YWl0IG9wdGlvbnMub3BlblBhdGgocGF0aCwgYXBwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBvcGVuKHBhdGgsIGFwcCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5FZGl0b3IoYnVuZGxlSWQ6IHN0cmluZywgYXBwTmFtZTogc3RyaW5nLCBvcHRpb25zOiBPcGVuSW5FZGl0b3JPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwcyA9IGF3YWl0IGdldEFwcGxpY2F0aW9ucygpO1xuICBjb25zdCBhcHAgPSBhcHBzLmZpbmQoKGEpID0+IGEuYnVuZGxlSWQgPT09IGJ1bmRsZUlkKTtcblxuICBpZiAoIWFwcCkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBgJHthcHBOYW1lfSBpcyBub3QgaW5zdGFsbGVkYCxcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBnZXRTZWxlY3RlZEZpbmRlckl0ZW1zKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9KSgpO1xuXG4gIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBhd2FpdCBvcGVuUGF0aChpdGVtLnBhdGgsIGFwcCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB3aW5kb3dQYXRoID0gXCJcIjtcbiAgdHJ5IHtcbiAgICB3aW5kb3dQYXRoID0gZ2V0RmluZGVyV2luZG93UGF0aCgpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBDb3VsZCBub3QgZ2V0IHdpbmRvdyBwYXRoXG4gIH1cblxuICBpZiAod2luZG93UGF0aCkge1xuICAgIGF3YWl0IG9wZW5QYXRoKHdpbmRvd1BhdGgsIGFwcCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICB0aXRsZTogXCJObyBGaW5kZXIgaXRlbXMgb3Igd2luZG93IHNlbGVjdGVkXCIsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluWmVkTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjbGlQYXRoID0gam9pbihhcHAucGF0aCwgXCJDb250ZW50c1wiLCBcIk1hY09TXCIsIFwiY2xpXCIpO1xuICBjb25zdCB6ZWRQYXRoID0gZXhpc3RzU3luYyhjbGlQYXRoKSA/IGNsaVBhdGggOiBcIi91c3IvbG9jYWwvYmluL3plZFwiO1xuXG4gIGV4ZWNGaWxlU3luYyh6ZWRQYXRoLCBbXCItblwiLCBwYXRoXSwge1xuICAgIHN0ZGlvOiBcImlnbm9yZVwiLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsaUJBQWtHO0FBQ2xHLGdDQUF1QztBQUN2QyxxQkFBMkI7QUFDM0IsdUJBQXFCO0FBUXJCLFNBQVMsc0JBQThCO0FBQ3JDLFFBQU0sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV2YsYUFBTyxvQ0FBUyxpQkFBaUIsT0FBTyxRQUFRLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDakc7QUFFQSxlQUFlLFNBQVMsTUFBYyxLQUFrQixTQUE2QztBQUNuRyxNQUFJLFFBQVEsVUFBVTtBQUNwQixVQUFNLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDaEM7QUFBQSxFQUNGO0FBRUEsWUFBTSxpQkFBSyxNQUFNLEdBQUc7QUFDdEI7QUFFQSxlQUFzQixhQUFhLFVBQWtCLFNBQWlCLFVBQStCLENBQUMsR0FBa0I7QUFDdEgsUUFBTSxPQUFPLFVBQU0sNEJBQWdCO0FBQ25DLFFBQU0sTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsYUFBYSxRQUFRO0FBRXBELE1BQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNuQixDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLE9BQU8sWUFBWTtBQUMvQixRQUFJO0FBQ0YsYUFBTyxVQUFNLG1DQUF1QjtBQUFBLElBQ3RDLFFBQVE7QUFDTixhQUFPLENBQUM7QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHO0FBRUgsTUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTztBQUFBLElBQ3hDO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxhQUFhO0FBQ2pCLE1BQUk7QUFDRixpQkFBYSxvQkFBb0I7QUFBQSxFQUNuQyxRQUFRO0FBQUEsRUFFUjtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sU0FBUyxZQUFZLEtBQUssT0FBTztBQUN2QztBQUFBLEVBQ0Y7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7QUFFTyxTQUFTLG1CQUFtQixNQUFjLEtBQXdCO0FBQ3ZFLFFBQU0sY0FBVSx1QkFBSyxJQUFJLE1BQU0sWUFBWSxTQUFTLEtBQUs7QUFDekQsUUFBTSxjQUFVLDJCQUFXLE9BQU8sSUFBSSxVQUFVO0FBRWhELDhDQUFhLFNBQVMsQ0FBQyxNQUFNLElBQUksR0FBRztBQUFBLElBQ2xDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FEckZBLGVBQU8sVUFBaUM7QUFDdEMsUUFBTSxhQUFhLHVCQUF1QixlQUFlO0FBQUEsSUFDdkQsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
