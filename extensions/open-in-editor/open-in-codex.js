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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpLy5jb2RleC93b3JrdHJlZXMvcmF5Y2FzdC16ZWQtcHJldmlldy9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL29wZW4taW4tY29kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpLy5jb2RleC93b3JrdHJlZXMvcmF5Y2FzdC16ZWQtcHJldmlldy9yYXljYXN0L2V4dGVuc2lvbnMvb3Blbi1pbi1lZGl0b3Ivc3JjL2xpYi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUgeyBBcHBsaWNhdGlvbiB9IGZyb20gJ0ByYXljYXN0L2FwaSdcbmltcG9ydCB7IG9wZW4gfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5pbXBvcnQgeyBvcGVuSW5FZGl0b3IgfSBmcm9tICcuL2xpYidcblxuYXN5bmMgZnVuY3Rpb24gb3BlbkluQ29kZXhXb3Jrc3BhY2UocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IG9wZW4ocGF0aCwgYXBwKVxuXG4gIGNvbnN0IGRlZXBsaW5rID0gbmV3IFVSTCgnY29kZXg6Ly90aHJlYWRzL25ldycpXG4gIGRlZXBsaW5rLnNlYXJjaFBhcmFtcy5zZXQoJ3BhdGgnLCBwYXRoKVxuICBhd2FpdCBvcGVuKGRlZXBsaW5rLnRvU3RyaW5nKCksIGFwcClcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCBvcGVuSW5FZGl0b3IoJ2NvbS5vcGVuYWkuY29kZXgnLCAnQ29kZXgnLCBvcGVuSW5Db2RleFdvcmtzcGFjZSlcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuaW1wb3J0IHsgZXhlY0ZpbGVTeW5jLCBleGVjU3luYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBnZXRBcHBsaWNhdGlvbnMsIGdldFNlbGVjdGVkRmluZGVySXRlbXMsIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tICdAcmF5Y2FzdC9hcGknXG5cbnR5cGUgT3BlblRhcmdldCA9IChwYXRoOiBzdHJpbmcsIGFwcDogQXBwbGljYXRpb24pID0+IFByb21pc2U8dm9pZD4gfCB2b2lkXG5cbmZ1bmN0aW9uIGdldEZpbmRlcldpbmRvd1BhdGgoKTogc3RyaW5nIHtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIGlmIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgaXMgcnVubmluZyBhbmQgZnJvbnRtb3N0IG9mIGFwcGxpY2F0aW9uIFwiRmluZGVyXCIgdGhlblxuICAgICAgdGVsbCBhcHAgXCJGaW5kZXJcIlxuICAgICAgICBzZXQgZmluZGVyV2luZG93IHRvIHdpbmRvdyAxXG4gICAgICAgIHNldCBmaW5kZXJXaW5kb3dQYXRoIHRvIChQT1NJWCBwYXRoIG9mICh0YXJnZXQgb2YgZmluZGVyV2luZG93IGFzIGFsaWFzKSlcbiAgICAgICAgcmV0dXJuIGZpbmRlcldpbmRvd1BhdGhcbiAgICAgIGVuZCB0ZWxsXG4gICAgZWxzZVxuICAgICAgZXJyb3IgXCJDb3VsZCBub3QgZ2V0IHRoZSBzZWxlY3RlZCBGaW5kZXIgd2luZG93XCJcbiAgICBlbmQgaWZcbiAgYFxuICByZXR1cm4gZXhlY1N5bmMoYG9zYXNjcmlwdCAtZSAnJHtzY3JpcHQucmVwbGFjZSgvJy9nLCAnXFwnXFxcXFxcJ1xcJycpfSdgLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnRyaW0oKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkluRWRpdG9yKGJ1bmRsZUlkOiBzdHJpbmcsIGFwcE5hbWU6IHN0cmluZywgb3BlblRhcmdldDogT3BlblRhcmdldCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBhcHBzID0gYXdhaXQgZ2V0QXBwbGljYXRpb25zKClcbiAgY29uc3QgYXBwID0gYXBwcy5maW5kKGEgPT4gYS5idW5kbGVJZCA9PT0gYnVuZGxlSWQpXG5cbiAgaWYgKCFhcHApIHtcbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogYCR7YXBwTmFtZX0gaXMgbm90IGluc3RhbGxlZGAsXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gYXdhaXQgKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGdldFNlbGVjdGVkRmluZGVySXRlbXMoKVxuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gIH0pKClcblxuICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgYXdhaXQgb3BlblRhcmdldChpdGVtLnBhdGgsIGFwcClcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgd2luZG93UGF0aCA9ICcnXG4gIHRyeSB7XG4gICAgd2luZG93UGF0aCA9IGdldEZpbmRlcldpbmRvd1BhdGgoKVxuICB9XG4gIGNhdGNoIHtcbiAgICAvLyBDb3VsZCBub3QgZ2V0IHdpbmRvdyBwYXRoXG4gIH1cblxuICBpZiAod2luZG93UGF0aCkge1xuICAgIGF3YWl0IG9wZW5UYXJnZXQod2luZG93UGF0aCwgYXBwKVxuICAgIHJldHVyblxuICB9XG5cbiAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICB0aXRsZTogJ05vIEZpbmRlciBpdGVtcyBvciB3aW5kb3cgc2VsZWN0ZWQnLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkluVlNDb2RlTmV3V2luZG93KHBhdGg6IHN0cmluZywgYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQge1xuICBjb25zdCBjb2RlUGF0aCA9IGpvaW4oYXBwLnBhdGgsICdDb250ZW50cycsICdSZXNvdXJjZXMnLCAnYXBwJywgJ2JpbicsICdjb2RlJylcblxuICBleGVjRmlsZVN5bmMoY29kZVBhdGgsIFsnLS1uZXctd2luZG93JywgcGF0aF0sIHtcbiAgICBzdGRpbzogJ2lnbm9yZScsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuSW5aZWROZXdXaW5kb3cocGF0aDogc3RyaW5nLCBhcHA6IEFwcGxpY2F0aW9uKTogdm9pZCB7XG4gIGNvbnN0IGNsaVBhdGggPSBqb2luKGFwcC5wYXRoLCAnQ29udGVudHMnLCAnTWFjT1MnLCAnY2xpJylcblxuICBleGVjRmlsZVN5bmMoY2xpUGF0aCwgWyctbicsIHBhdGhdLCB7XG4gICAgc3RkaW86ICdpZ25vcmUnLFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsSUFBQUEsY0FBcUI7OztBQ0FyQixnQ0FBdUM7QUFFdkMsaUJBQTBFO0FBSTFFLFNBQVMsc0JBQThCO0FBQ3JDLFFBQU0sU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV2YsYUFBTyxvQ0FBUyxpQkFBaUIsT0FBTyxRQUFRLE1BQU0sT0FBVSxDQUFDLEtBQUssRUFBRSxVQUFVLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDcEc7QUFFQSxlQUFzQixhQUFhLFVBQWtCLFNBQWlCLFlBQXVDO0FBQzNHLFFBQU0sT0FBTyxVQUFNLDRCQUFnQjtBQUNuQyxRQUFNLE1BQU0sS0FBSyxLQUFLLE9BQUssRUFBRSxhQUFhLFFBQVE7QUFFbEQsTUFBSSxDQUFDLEtBQUs7QUFDUixjQUFNLHNCQUFVO0FBQUEsTUFDZCxPQUFPLGlCQUFNLE1BQU07QUFBQSxNQUNuQixPQUFPLEdBQUcsT0FBTztBQUFBLElBQ25CLENBQUM7QUFDRDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQVEsT0FBTyxZQUFZO0FBQy9CLFFBQUk7QUFDRixhQUFPLFVBQU0sbUNBQXVCO0FBQUEsSUFDdEMsUUFDTTtBQUNKLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFBQSxFQUNGLEdBQUc7QUFFSCxNQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sV0FBVyxLQUFLLE1BQU0sR0FBRztBQUFBLElBQ2pDO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxhQUFhO0FBQ2pCLE1BQUk7QUFDRixpQkFBYSxvQkFBb0I7QUFBQSxFQUNuQyxRQUNNO0FBQUEsRUFFTjtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sV0FBVyxZQUFZLEdBQUc7QUFDaEM7QUFBQSxFQUNGO0FBRUEsWUFBTSxzQkFBVTtBQUFBLElBQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsSUFDbkIsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIOzs7QUQvREEsZUFBZSxxQkFBcUIsTUFBYyxLQUFpQztBQUNqRixZQUFNLGtCQUFLLE1BQU0sR0FBRztBQUVwQixRQUFNLFdBQVcsSUFBSSxJQUFJLHFCQUFxQjtBQUM5QyxXQUFTLGFBQWEsSUFBSSxRQUFRLElBQUk7QUFDdEMsWUFBTSxrQkFBSyxTQUFTLFNBQVMsR0FBRyxHQUFHO0FBQ3JDO0FBRUEsZUFBTyx3QkFBMEI7QUFDL0IsUUFBTSxhQUFhLG9CQUFvQixTQUFTLG9CQUFvQjtBQUN0RTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2FwaSJdCn0K
