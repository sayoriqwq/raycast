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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL29wZW4taW4tZWRpdG9yL3NyYy9vcGVuLWluLXplZC1uaWdodGx5LnRzIiwgIi4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL3NheW9yaS9EZXNrdG9wL3JheWNhc3QvZXh0ZW5zaW9ucy9vcGVuLWluLWVkaXRvci9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBvcGVuSW5FZGl0b3IsIG9wZW5JblplZE5ld1dpbmRvdyB9IGZyb20gJy4vbGliJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBDb21tYW5kKCkge1xuICBhd2FpdCBvcGVuSW5FZGl0b3IoJ2Rldi56ZWQuWmVkLU5pZ2h0bHknLCAnWmVkIE5pZ2h0bHknLCB7XG4gICAgb3BlblBhdGg6IG9wZW5JblplZE5ld1dpbmRvdyxcbiAgfSlcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuaW1wb3J0IHsgZXhlY0ZpbGVTeW5jLCBleGVjU3luYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGdldEFwcGxpY2F0aW9ucywgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcywgb3Blbiwgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gJ0ByYXljYXN0L2FwaSdcblxudHlwZSBPcGVuUGF0aCA9IChwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pID0+IFByb21pc2U8dm9pZD4gfCB2b2lkXG5cbmludGVyZmFjZSBPcGVuSW5FZGl0b3JPcHRpb25zIHtcbiAgb3BlblBhdGg/OiBPcGVuUGF0aFxufVxuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICBzZXQgZmluZGVyV2luZG93UGF0aCB0byAoUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcykpXG4gICAgICAgIHJldHVybiBmaW5kZXJXaW5kb3dQYXRoXG4gICAgICBlbmQgdGVsbFxuICAgIGVsc2VcbiAgICAgIGVycm9yIFwiQ291bGQgbm90IGdldCB0aGUgc2VsZWN0ZWQgRmluZGVyIHdpbmRvd1wiXG4gICAgZW5kIGlmXG4gIGBcbiAgcmV0dXJuIGV4ZWNTeW5jKGBvc2FzY3JpcHQgLWUgJyR7c2NyaXB0LnJlcGxhY2UoLycvZywgJ1xcJ1xcXFxcXCdcXCcnKX0nYCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KS50cmltKClcbn1cblxuYXN5bmMgZnVuY3Rpb24gb3BlblBhdGgocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uLCBvcHRpb25zOiBPcGVuSW5FZGl0b3JPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChvcHRpb25zLm9wZW5QYXRoKSB7XG4gICAgYXdhaXQgb3B0aW9ucy5vcGVuUGF0aChwYXRoLCBhcHApXG4gICAgcmV0dXJuXG4gIH1cblxuICBhd2FpdCBvcGVuKHBhdGgsIGFwcClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5JbkVkaXRvcihidW5kbGVJZDogc3RyaW5nLCBhcHBOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IE9wZW5JbkVkaXRvck9wdGlvbnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHBzID0gYXdhaXQgZ2V0QXBwbGljYXRpb25zKClcbiAgY29uc3QgYXBwID0gYXBwcy5maW5kKGEgPT4gYS5idW5kbGVJZCA9PT0gYnVuZGxlSWQpXG5cbiAgaWYgKCFhcHApIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogYCR7YXBwTmFtZX0gaXMgbm90IGluc3RhbGxlZGAsXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGdldFNlbGVjdGVkRmluZGVySXRlbXMoKVxuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gIH0pKClcblxuICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgYXdhaXQgb3BlblBhdGgoaXRlbS5wYXRoLCBhcHAsIG9wdGlvbnMpXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IHdpbmRvd1BhdGggPSAnJ1xuICB0cnkge1xuICAgIHdpbmRvd1BhdGggPSBnZXRGaW5kZXJXaW5kb3dQYXRoKClcbiAgfVxuICBjYXRjaCB7XG4gICAgLy8gQ291bGQgbm90IGdldCB3aW5kb3cgcGF0aFxuICB9XG5cbiAgaWYgKHdpbmRvd1BhdGgpIHtcbiAgICBhd2FpdCBvcGVuUGF0aCh3aW5kb3dQYXRoLCBhcHAsIG9wdGlvbnMpXG4gICAgcmV0dXJuXG4gIH1cblxuICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgIHRpdGxlOiAnTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZCcsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuSW5aZWROZXdXaW5kb3cocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGNvbnN0IGNsaVBhdGggPSBqb2luKGFwcC5wYXRoLCAnQ29udGVudHMnLCAnTWFjT1MnLCAnY2xpJylcbiAgY29uc3QgemVkUGF0aCA9IGV4aXN0c1N5bmMoY2xpUGF0aCkgPyBjbGlQYXRoIDogJy91c3IvbG9jYWwvYmluL3plZCdcblxuICBleGVjRmlsZVN5bmMoemVkUGF0aCwgWyctbicsIHBhdGhdLCB7XG4gICAgc3RkaW86ICdpZ25vcmUnLFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNDQSxnQ0FBdUM7QUFDdkMscUJBQTJCO0FBQzNCLHVCQUFxQjtBQUNyQixpQkFBZ0Y7QUFRaEYsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNwRztBQUVBLGVBQWUsU0FBUyxNQUFjLEtBQWtCLFNBQTZDO0FBQ25HLE1BQUksUUFBUSxVQUFVO0FBQ3BCLFVBQU0sUUFBUSxTQUFTLE1BQU0sR0FBRztBQUNoQztBQUFBLEVBQ0Y7QUFFQSxZQUFNLGlCQUFLLE1BQU0sR0FBRztBQUN0QjtBQUVBLGVBQXNCLGFBQWEsVUFBa0IsU0FBaUIsVUFBK0IsQ0FBQyxHQUFrQjtBQUN0SCxRQUFNLE9BQU8sVUFBTSw0QkFBZ0I7QUFDbkMsUUFBTSxNQUFNLEtBQUssS0FBSyxPQUFLLEVBQUUsYUFBYSxRQUFRO0FBRWxELE1BQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNuQixDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLE9BQU8sWUFBWTtBQUMvQixRQUFJO0FBQ0YsYUFBTyxVQUFNLG1DQUF1QjtBQUFBLElBQ3RDLFFBQ007QUFDSixhQUFPLENBQUM7QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHO0FBRUgsTUFBSSxNQUFNLFNBQVMsR0FBRztBQUNwQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTztBQUFBLElBQ3hDO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxhQUFhO0FBQ2pCLE1BQUk7QUFDRixpQkFBYSxvQkFBb0I7QUFBQSxFQUNuQyxRQUNNO0FBQUEsRUFFTjtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sU0FBUyxZQUFZLEtBQUssT0FBTztBQUN2QztBQUFBLEVBQ0Y7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7QUFFTyxTQUFTLG1CQUFtQixNQUFjLEtBQXdCO0FBQ3ZFLFFBQU0sY0FBVSx1QkFBSyxJQUFJLE1BQU0sWUFBWSxTQUFTLEtBQUs7QUFDekQsUUFBTSxjQUFVLDJCQUFXLE9BQU8sSUFBSSxVQUFVO0FBRWhELDhDQUFhLFNBQVMsQ0FBQyxNQUFNLElBQUksR0FBRztBQUFBLElBQ2xDLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FEeEZBLGVBQU8sVUFBaUM7QUFDdEMsUUFBTSxhQUFhLHVCQUF1QixlQUFlO0FBQUEsSUFDdkQsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
