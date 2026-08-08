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
var import_node_child_process = require("node:child_process");
var import_node_fs = require("node:fs");
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
  const zedPath = (0, import_node_fs.existsSync)(cliPath) ? cliPath : "/usr/local/bin/zed";
  (0, import_node_child_process.execFileSync)(zedPath, ["-n", path], {
    stdio: "ignore"
  });
}

// src/open-in-zed-nightly.ts
async function Command() {
  await openInEditor("dev.zed.Zed-Nightly", "Zed Nightly", openInZedNewWindow);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLXplZC1uaWdodGx5LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy9vcGVuLWluLWVkaXRvci9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBvcGVuSW5FZGl0b3IsIG9wZW5JblplZE5ld1dpbmRvdyB9IGZyb20gJy4vbGliJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBDb21tYW5kKCkge1xuICBhd2FpdCBvcGVuSW5FZGl0b3IoJ2Rldi56ZWQuWmVkLU5pZ2h0bHknLCAnWmVkIE5pZ2h0bHknLCBvcGVuSW5aZWROZXdXaW5kb3cpXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IGV4ZWNGaWxlU3luYywgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBnZXRBcHBsaWNhdGlvbnMsIGdldFNlbGVjdGVkRmluZGVySXRlbXMsIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5cbnR5cGUgT3BlblRhcmdldCA9IChwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pID0+IFByb21pc2U8dm9pZD4gfCB2b2lkXG5cbmZ1bmN0aW9uIGdldEZpbmRlcldpbmRvd1BhdGgoKTogc3RyaW5nIHtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIGlmIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgaXMgcnVubmluZyBhbmQgZnJvbnRtb3N0IG9mIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdGhlblxuICAgICAgdGVsbCBhcHAgXCJGaW5kZXJcIlxuICAgICAgICBzZXQgZmluZGVyV2luZG93IHRvIHdpbmRvdyAxXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3dQYXRoIHRvIChQT1NJWCBwYXRoIG9mICh0YXJnZXQgb2YgZmluZGVyV2luZG93IGFzIGFsaWFzKSlcbiAgICAgICAgcmV0dXJuIGZpbmRlcldpbmRvd1BhdGhcbiAgICAgIGVuZCB0ZWxsXG4gICAgZWxzZVxuICAgICAgZXJyb3IgXCJDb3VsZCBub3QgZ2V0IHRoZSBzZWxlY3RlZCBGaW5kZXIgd2luZG93XCJcbiAgICBlbmQgaWZcbiAgYFxuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCAnXFwnXFxcXFxcJ1xcJycpfSdgLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnRyaW0oKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkluRWRpdG9yKGJ1bmRsZUlkOiBzdHJpbmcsIGFwcE5hbWU6IHN0cmluZywgb3BlblRhcmdldDogT3BlblRhcmdldCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHBzID0gYXdhaXQgZ2V0QXBwbGljYXRpb25zKClcbiAgY29uc3QgYXBwID0gYXBwcy5maW5kKGEgPT4gYS5idW5kbGVJZCA9PT0gYnVuZGxlSWQpXG5cbiAgaWYgKCFhcHApIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogYCR7YXBwTmFtZX0gaXMgbm90IGluc3RhbGxlZGAsXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGdldFNlbGVjdGVkRmluZGVySXRlbXMoKVxuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gIH0pKClcblxuICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgYXdhaXQgb3BlblRhcmdldChpdGVtLnBhdGgsIGFwcClcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgd2luZG93UGF0aCA9ICcnXG4gIHRyeSB7XG4gICAgd2luZG93UGF0aCA9IGdldEZpbmRlcldpbmRvd1BhdGgoKVxuICB9XG4gIGNhdGNoIHtcbiAgICAvLyBDb3VsZCBub3QgZ2V0IHdpbmRvdyBwYXRoXG4gIH1cblxuICBpZiAod2luZG93UGF0aCkge1xuICAgIGF3YWl0IG9wZW5UYXJnZXQod2luZG93UGF0aCwgYXBwKVxuICAgIHJldHVyblxuICB9XG5cbiAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICB0aXRsZTogJ05vIEZpbmRlciBpdGVtcyBvciB3aW5kb3cgc2VsZWN0ZWQnLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluVlNDb2RlTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjb2RlUGF0aCA9IGpvaW4oYXBwLnBhdGgsICdDb250ZW50cycsICdSZXNvdXJjZXMnLCAnYXBwJywgJ2JpbicsICdjb2RlJylcblxuICBleGVjRmlsZVN5bmMoY29kZVBhdGgsIFsnLS1uZXctd2luZG93JywgcGF0aF0sIHtcbiAgICBzdGRpbzogJ2lnbm9yZScsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuSW5aZWROZXdXaW5kb3cocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGNvbnN0IGNsaVBhdGggPSBqb2luKGFwcC5wYXRoLCAnQ29udGVudHMnLCAnTWFjT1MnLCAnY2xpJylcbiAgY29uc3QgemVkUGF0aCA9IGV4aXN0c1N5bmMoY2xpUGF0aCkgPyBjbGlQYXRoIDogJy91c3IvbG9jYWwvYmluL3plZCdcblxuICBleGVjRmlsZVN5bmMoemVkUGF0aCwgWyctbicsIHBhdGhdLCB7XG4gICAgc3RkaW86ICdpZ25vcmUnLFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNDQSxnQ0FBdUM7QUFDdkMscUJBQTJCO0FBQzNCLHVCQUFxQjtBQUNyQixpQkFBMEU7QUFJMUUsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNwRztBQUVBLGVBQXNCLGFBQWEsVUFBa0IsU0FBaUIsWUFBdUM7QUFDM0csUUFBTSxPQUFPLFVBQU0sNEJBQWdCO0FBQ25DLFFBQU0sTUFBTSxLQUFLLEtBQUssT0FBSyxFQUFFLGFBQWEsUUFBUTtBQUVsRCxNQUFJLENBQUMsS0FBSztBQUNSLGNBQU0sc0JBQVU7QUFBQSxNQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLE1BQ25CLE9BQU8sR0FBRyxPQUFPO0FBQUEsSUFDbkIsQ0FBQztBQUNEO0FBQUEsRUFDRjtBQUVBLFFBQU0sUUFBUSxPQUFPLFlBQVk7QUFDL0IsUUFBSTtBQUNGLGFBQU8sVUFBTSxtQ0FBdUI7QUFBQSxJQUN0QyxRQUNNO0FBQ0osYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUFBLEVBQ0YsR0FBRztBQUVILE1BQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQUEsSUFDakM7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGFBQWE7QUFDakIsTUFBSTtBQUNGLGlCQUFhLG9CQUFvQjtBQUFBLEVBQ25DLFFBQ007QUFBQSxFQUVOO0FBRUEsTUFBSSxZQUFZO0FBQ2QsVUFBTSxXQUFXLFlBQVksR0FBRztBQUNoQztBQUFBLEVBQ0Y7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7QUFVTyxTQUFTLG1CQUFtQixNQUFjLEtBQXdCO0FBQ3ZFLFFBQU0sY0FBVSx1QkFBSyxJQUFJLE1BQU0sWUFBWSxTQUFTLEtBQUs7QUFDekQsUUFBTSxjQUFVLDJCQUFXLE9BQU8sSUFBSSxVQUFVO0FBRWhELDhDQUFhLFNBQVMsQ0FBQyxNQUFNLElBQUksR0FBRztBQUFBLElBQ2xDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FEbkZBLGVBQU8sVUFBaUM7QUFDdEMsUUFBTSxhQUFhLHVCQUF1QixlQUFlLGtCQUFrQjtBQUM3RTsiLAogICJuYW1lcyI6IFtdCn0K
