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
async function openInEditor(bundleId, appName) {
  const apps = await (0, import_api.getApplications)();
  const app = apps.find((a) => a.bundleId === bundleId);
  if (!app) {
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: `${appName} is not installed`
    });
    return;
  }
  try {
    const items = await (0, import_api.getSelectedFinderItems)();
    if (items.length > 0) {
      for (const item of items) {
        await (0, import_api.open)(item.path, app);
      }
      return;
    }
  } catch {
  }
  try {
    const windowPath = getFinderWindowPath();
    if (windowPath) {
      await (0, import_api.open)(windowPath, app);
      return;
    }
  } catch {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL29wZW4taW4ta2lyby50cyIsICIuLi9zcmMvbGliLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBvcGVuSW5FZGl0b3IgfSBmcm9tIFwiLi9saWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCBvcGVuSW5FZGl0b3IoXCJkZXYua2lyby5kZXNrdG9wXCIsIFwiS2lyb1wiKTtcbn1cbiIsICJpbXBvcnQgeyBnZXRBcHBsaWNhdGlvbnMsIGdldFNlbGVjdGVkRmluZGVySXRlbXMsIG9wZW4sIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcblxuZnVuY3Rpb24gZ2V0RmluZGVyV2luZG93UGF0aCgpOiBzdHJpbmcge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgaWYgYXBwbGljYXRpb24gXCJGaW5kZXJcIiBpcyBydW5uaW5nIGFuZCBmcm9udG1vc3Qgb2YgYXBwbGljYXRpb24gXCJGaW5kZXJcIiB0aGVuXG4gICAgICB0ZWxsIGFwcCBcIkZpbmRlclwiXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3cgdG8gd2luZG93IDFcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvd1BhdGggdG8gKFBPU0lYIHBhdGggb2YgKHRhcmdldCBvZiBmaW5kZXJXaW5kb3cgYXMgYWxpYXMpKVxuICAgICAgICByZXR1cm4gZmluZGVyV2luZG93UGF0aFxuICAgICAgZW5kIHRlbGxcbiAgICBlbHNlXG4gICAgICBlcnJvciBcIkNvdWxkIG5vdCBnZXQgdGhlIHNlbGVjdGVkIEZpbmRlciB3aW5kb3dcIlxuICAgIGVuZCBpZlxuICBgO1xuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCBcIidcXFxcJydcIil9J2AsIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KS50cmltKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuSW5FZGl0b3IoYnVuZGxlSWQ6IHN0cmluZywgYXBwTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGFwcHMgPSBhd2FpdCBnZXRBcHBsaWNhdGlvbnMoKTtcbiAgY29uc3QgYXBwID0gYXBwcy5maW5kKChhKSA9PiBhLmJ1bmRsZUlkID09PSBidW5kbGVJZCk7XG5cbiAgaWYgKCFhcHApIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogYCR7YXBwTmFtZX0gaXMgbm90IGluc3RhbGxlZGAsXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBpdGVtcyA9IGF3YWl0IGdldFNlbGVjdGVkRmluZGVySXRlbXMoKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGF3YWl0IG9wZW4oaXRlbS5wYXRoLCBhcHApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gTm8gc2VsZWN0ZWQgaXRlbXMsIGZhbGwgdGhyb3VnaCB0byB3aW5kb3cgcGF0aFxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB3aW5kb3dQYXRoID0gZ2V0RmluZGVyV2luZG93UGF0aCgpO1xuICAgIGlmICh3aW5kb3dQYXRoKSB7XG4gICAgICBhd2FpdCBvcGVuKHdpbmRvd1BhdGgsIGFwcCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBDb3VsZCBub3QgZ2V0IHdpbmRvdyBwYXRoXG4gIH1cblxuICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgIHRpdGxlOiBcIk5vIEZpbmRlciBpdGVtcyBvciB3aW5kb3cgc2VsZWN0ZWRcIixcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLGlCQUFnRjtBQUNoRixnQ0FBeUI7QUFFekIsU0FBUyxzQkFBOEI7QUFDckMsUUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXZixhQUFPLG9DQUFTLGlCQUFpQixPQUFPLFFBQVEsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUNqRztBQUVBLGVBQXNCLGFBQWEsVUFBa0IsU0FBZ0M7QUFDbkYsUUFBTSxPQUFPLFVBQU0sNEJBQWdCO0FBQ25DLFFBQU0sTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUUsYUFBYSxRQUFRO0FBRXBELE1BQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNuQixDQUFDO0FBQ0Q7QUFBQSxFQUNGO0FBRUEsTUFBSTtBQUNGLFVBQU0sUUFBUSxVQUFNLG1DQUF1QjtBQUMzQyxRQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGlCQUFXLFFBQVEsT0FBTztBQUN4QixrQkFBTSxpQkFBSyxLQUFLLE1BQU0sR0FBRztBQUFBLE1BQzNCO0FBQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixRQUFRO0FBQUEsRUFFUjtBQUVBLE1BQUk7QUFDRixVQUFNLGFBQWEsb0JBQW9CO0FBQ3ZDLFFBQUksWUFBWTtBQUNkLGdCQUFNLGlCQUFLLFlBQVksR0FBRztBQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLFFBQVE7QUFBQSxFQUVSO0FBRUEsWUFBTSxzQkFBVTtBQUFBLElBQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsSUFDbkIsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIOzs7QUR0REEsZUFBTyx1QkFBMEI7QUFDL0IsUUFBTSxhQUFhLG9CQUFvQixNQUFNO0FBQy9DOyIsCiAgIm5hbWVzIjogW10KfQo=
