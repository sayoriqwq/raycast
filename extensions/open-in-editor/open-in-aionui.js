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

// src/open-in-aionui.ts
var open_in_aionui_exports = {};
__export(open_in_aionui_exports, {
  default: () => open_in_aionui_default
});
module.exports = __toCommonJS(open_in_aionui_exports);

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

// src/open-in-aionui.ts
async function open_in_aionui_default() {
  await openInEditor("com.aionui.app", "AionUI");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL29wZW4taW4tYWlvbnVpLnRzIiwgIi4uL3NyYy9saWIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IG9wZW5JbkVkaXRvciB9IGZyb20gXCIuL2xpYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IG9wZW5JbkVkaXRvcihcImNvbS5haW9udWkuYXBwXCIsIFwiQWlvblVJXCIpO1xufVxuIiwgImltcG9ydCB7IGdldEFwcGxpY2F0aW9ucywgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcywgb3Blbiwgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5mdW5jdGlvbiBnZXRGaW5kZXJXaW5kb3dQYXRoKCk6IHN0cmluZyB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICBpZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIGlzIHJ1bm5pbmcgYW5kIGZyb250bW9zdCBvZiBhcHBsaWNhdGlvbiBcIkZpbmRlclwiIHRoZW5cbiAgICAgIHRlbGwgYXBwIFwiRmluZGVyXCJcbiAgICAgICAgc2V0IGZpbmRlcldpbmRvdyB0byB3aW5kb3cgMVxuICAgICAgICBzZXQgZmluZGVyV2luZG93UGF0aCB0byAoUE9TSVggcGF0aCBvZiAodGFyZ2V0IG9mIGZpbmRlcldpbmRvdyBhcyBhbGlhcykpXG4gICAgICAgIHJldHVybiBmaW5kZXJXaW5kb3dQYXRoXG4gICAgICBlbmQgdGVsbFxuICAgIGVsc2VcbiAgICAgIGVycm9yIFwiQ291bGQgbm90IGdldCB0aGUgc2VsZWN0ZWQgRmluZGVyIHdpbmRvd1wiXG4gICAgZW5kIGlmXG4gIGA7XG4gIHJldHVybiBleGVjU3luYyhgb3Nhc2NyaXB0IC1lICcke3NjcmlwdC5yZXBsYWNlKC8nL2csIFwiJ1xcXFwnJ1wiKX0nYCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pLnRyaW0oKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5JbkVkaXRvcihidW5kbGVJZDogc3RyaW5nLCBhcHBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYXBwcyA9IGF3YWl0IGdldEFwcGxpY2F0aW9ucygpO1xuICBjb25zdCBhcHAgPSBhcHBzLmZpbmQoKGEpID0+IGEuYnVuZGxlSWQgPT09IGJ1bmRsZUlkKTtcblxuICBpZiAoIWFwcCkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBgJHthcHBOYW1lfSBpcyBub3QgaW5zdGFsbGVkYCxcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgZ2V0U2VsZWN0ZWRGaW5kZXJJdGVtcygpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgYXdhaXQgb3BlbihpdGVtLnBhdGgsIGFwcCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBObyBzZWxlY3RlZCBpdGVtcywgZmFsbCB0aHJvdWdoIHRvIHdpbmRvdyBwYXRoXG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHdpbmRvd1BhdGggPSBnZXRGaW5kZXJXaW5kb3dQYXRoKCk7XG4gICAgaWYgKHdpbmRvd1BhdGgpIHtcbiAgICAgIGF3YWl0IG9wZW4od2luZG93UGF0aCwgYXBwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIENvdWxkIG5vdCBnZXQgd2luZG93IHBhdGhcbiAgfVxuXG4gIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6IFwiTm8gRmluZGVyIGl0ZW1zIG9yIHdpbmRvdyBzZWxlY3RlZFwiLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsaUJBQWdGO0FBQ2hGLGdDQUF5QjtBQUV6QixTQUFTLHNCQUE4QjtBQUNyQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdmLGFBQU8sb0NBQVMsaUJBQWlCLE9BQU8sUUFBUSxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ2pHO0FBRUEsZUFBc0IsYUFBYSxVQUFrQixTQUFnQztBQUNuRixRQUFNLE9BQU8sVUFBTSw0QkFBZ0I7QUFDbkMsUUFBTSxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLFFBQVE7QUFFcEQsTUFBSSxDQUFDLEtBQUs7QUFDUixjQUFNLHNCQUFVO0FBQUEsTUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxNQUNuQixPQUFPLEdBQUcsT0FBTztBQUFBLElBQ25CLENBQUM7QUFDRDtBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0YsVUFBTSxRQUFRLFVBQU0sbUNBQXVCO0FBQzNDLFFBQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsaUJBQVcsUUFBUSxPQUFPO0FBQ3hCLGtCQUFNLGlCQUFLLEtBQUssTUFBTSxHQUFHO0FBQUEsTUFDM0I7QUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGLFFBQVE7QUFBQSxFQUVSO0FBRUEsTUFBSTtBQUNGLFVBQU0sYUFBYSxvQkFBb0I7QUFDdkMsUUFBSSxZQUFZO0FBQ2QsZ0JBQU0saUJBQUssWUFBWSxHQUFHO0FBQzFCO0FBQUEsSUFDRjtBQUFBLEVBQ0YsUUFBUTtBQUFBLEVBRVI7QUFFQSxZQUFNLHNCQUFVO0FBQUEsSUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxJQUNuQixPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7OztBRHREQSxlQUFPLHlCQUEwQjtBQUMvQixRQUFNLGFBQWEsa0JBQWtCLFFBQVE7QUFDL0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
