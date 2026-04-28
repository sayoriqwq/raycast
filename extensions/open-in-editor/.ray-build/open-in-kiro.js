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

// src/open-in-kiro.ts
var open_in_kiro_exports = {};
__export(open_in_kiro_exports, {
  default: () => open_in_kiro_default
});
module.exports = __toCommonJS(open_in_kiro_exports);

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

// src/open-in-kiro.ts
async function open_in_kiro_default() {
  await openInEditor("dev.kiro.desktop", "Kiro");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL29wZW4taW4ta2lyby50cyIsICIuLi9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBvcGVuSW5FZGl0b3IgfSBmcm9tIFwiLi9saWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCBvcGVuSW5FZGl0b3IoXCJkZXYua2lyby5kZXNrdG9wXCIsIFwiS2lyb1wiKTtcbn1cbiIsICJpbXBvcnQgeyBnZXRBcHBsaWNhdGlvbnMsIGdldFNlbGVjdGVkRmluZGVySXRlbXMsIG9wZW4sIHNob3dUb2FzdCwgVG9hc3QsIHR5cGUgQXBwbGljYXRpb24gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjRmlsZVN5bmMsIGV4ZWNTeW5jIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG50eXBlIE9wZW5QYXRoID0gKHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbikgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG5cbnR5cGUgT3BlbkluRWRpdG9yT3B0aW9ucyA9IHtcbiAgb3BlblBhdGg/OiBPcGVuUGF0aDtcbn07XG5cbmZ1bmN0aW9uIGdldEZpbmRlcldpbmRvd1BhdGgoKTogc3RyaW5nIHtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIGlmIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgaXMgcnVubmluZyBhbmQgZnJvbnRtb3N0IG9mIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdGhlblxuICAgICAgdGVsbCBhcHAgXCJGaW5kZXJcIlxuICAgICAgICBzZXQgZmluZGVyV2luZG93IHRvIHdpbmRvdyAxXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3dQYXRoIHRvIChQT1NJWCBwYXRoIG9mICh0YXJnZXQgb2YgZmluZGVyV2luZG93IGFzIGFsaWFzKSlcbiAgICAgICAgcmV0dXJuIGZpbmRlcldpbmRvd1BhdGhcbiAgICAgIGVuZCB0ZWxsXG4gICAgZWxzZVxuICAgICAgZXJyb3IgXCJDb3VsZCBub3QgZ2V0IHRoZSBzZWxlY3RlZCBGaW5kZXIgd2luZG93XCJcbiAgICBlbmQgaWZcbiAgYDtcbiAgcmV0dXJuIGV4ZWNTeW5jKGBvc2FzY3JpcHQgLWUgJyR7c2NyaXB0LnJlcGxhY2UoLycvZywgXCInXFxcXCcnXCIpfSdgLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSkudHJpbSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvcGVuUGF0aChwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24sIG9wdGlvbnM6IE9wZW5JbkVkaXRvck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKG9wdGlvbnMub3BlblBhdGgpIHtcbiAgICBhd2FpdCBvcHRpb25zLm9wZW5QYXRoKHBhdGgsIGFwcCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgb3BlbihwYXRoLCBhcHApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkluRWRpdG9yKGJ1bmRsZUlkOiBzdHJpbmcsIGFwcE5hbWU6IHN0cmluZywgb3B0aW9uczogT3BlbkluRWRpdG9yT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcHMgPSBhd2FpdCBnZXRBcHBsaWNhdGlvbnMoKTtcbiAgY29uc3QgYXBwID0gYXBwcy5maW5kKChhKSA9PiBhLmJ1bmRsZUlkID09PSBidW5kbGVJZCk7XG5cbiAgaWYgKCFhcHApIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogYCR7YXBwTmFtZX0gaXMgbm90IGluc3RhbGxlZGAsXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaXRlbXMgPSBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcygpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfSkoKTtcblxuICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgYXdhaXQgb3BlblBhdGgoaXRlbS5wYXRoLCBhcHAsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgd2luZG93UGF0aCA9IFwiXCI7XG4gIHRyeSB7XG4gICAgd2luZG93UGF0aCA9IGdldEZpbmRlcldpbmRvd1BhdGgoKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gQ291bGQgbm90IGdldCB3aW5kb3cgcGF0aFxuICB9XG5cbiAgaWYgKHdpbmRvd1BhdGgpIHtcbiAgICBhd2FpdCBvcGVuUGF0aCh3aW5kb3dQYXRoLCBhcHAsIG9wdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6IFwiTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZFwiLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5JblplZE5ld1dpbmRvdyhwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHtcbiAgY29uc3QgY2xpUGF0aCA9IGpvaW4oYXBwLnBhdGgsIFwiQ29udGVudHNcIiwgXCJNYWNPU1wiLCBcImNsaVwiKTtcbiAgY29uc3QgemVkUGF0aCA9IGV4aXN0c1N5bmMoY2xpUGF0aCkgPyBjbGlQYXRoIDogXCIvdXNyL2xvY2FsL2Jpbi96ZWRcIjtcblxuICBleGVjRmlsZVN5bmMoemVkUGF0aCwgW1wiLW5cIiwgcGF0aF0sIHtcbiAgICBzdGRpbzogXCJpZ25vcmVcIixcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLGlCQUFrRztBQUNsRyxnQ0FBdUM7QUFVdkMsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNqRztBQUVBLGVBQWUsU0FBUyxNQUFjLEtBQWtCLFNBQTZDO0FBQ25HLE1BQUksUUFBUSxVQUFVO0FBQ3BCLFVBQU0sUUFBUSxTQUFTLE1BQU0sR0FBRztBQUNoQztBQUFBLEVBQ0Y7QUFFQSxZQUFNLGlCQUFLLE1BQU0sR0FBRztBQUN0QjtBQUVBLGVBQXNCLGFBQWEsVUFBa0IsU0FBaUIsVUFBK0IsQ0FBQyxHQUFrQjtBQUN0SCxRQUFNLE9BQU8sVUFBTSw0QkFBZ0I7QUFDbkMsUUFBTSxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLFFBQVE7QUFFcEQsTUFBSSxDQUFDLEtBQUs7QUFDUixjQUFNLHNCQUFVO0FBQUEsTUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxNQUNuQixPQUFPLEdBQUcsT0FBTztBQUFBLElBQ25CLENBQUM7QUFDRDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQVEsT0FBTyxZQUFZO0FBQy9CLFFBQUk7QUFDRixhQUFPLFVBQU0sbUNBQXVCO0FBQUEsSUFDdEMsUUFBUTtBQUNOLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQUc7QUFFSCxNQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sU0FBUyxLQUFLLE1BQU0sS0FBSyxPQUFPO0FBQUEsSUFDeEM7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGFBQWE7QUFDakIsTUFBSTtBQUNGLGlCQUFhLG9CQUFvQjtBQUFBLEVBQ25DLFFBQVE7QUFBQSxFQUVSO0FBRUEsTUFBSSxZQUFZO0FBQ2QsVUFBTSxTQUFTLFlBQVksS0FBSyxPQUFPO0FBQ3ZDO0FBQUEsRUFDRjtBQUVBLFlBQU0sc0JBQVU7QUFBQSxJQUNkLE9BQU8saUJBQU0sTUFBTTtBQUFBLElBQ25CLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDs7O0FENUVBLGVBQU8sdUJBQTBCO0FBQy9CLFFBQU0sYUFBYSxvQkFBb0IsTUFBTTtBQUMvQzsiLAogICJuYW1lcyI6IFtdCn0K
