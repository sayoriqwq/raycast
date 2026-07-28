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

// src/wezterm-to-finder.ts
var wezterm_to_finder_exports = {};
__export(wezterm_to_finder_exports, {
  default: () => wezterm_to_finder_default
});
module.exports = __toCommonJS(wezterm_to_finder_exports);
var import_node_child_process2 = require("node:child_process");
var import_node_url = require("node:url");
var import_api = require("@raycast/api");

// src/wezterm.ts
var import_node_child_process = require("node:child_process");
var import_node_fs = require("node:fs");
var import_node_os = require("node:os");
function getWezTermExecutable() {
  const loginShell = (0, import_node_os.userInfo)().shell;
  if (!loginShell || !(0, import_node_fs.existsSync)(loginShell)) {
    throw new Error("Could not find the user's login shell");
  }
  const executable = (0, import_node_child_process.execFileSync)(loginShell, ["-lc", "command -v wezterm"], {
    encoding: "utf-8"
  }).trim();
  if (!executable || !(0, import_node_fs.existsSync)(executable)) {
    throw new Error("WezTerm is not available in the login shell PATH");
  }
  return executable;
}

// src/wezterm-to-finder.ts
function getWezTermCwd() {
  const output = (0, import_node_child_process2.execFileSync)(getWezTermExecutable(), ["cli", "list", "--format", "json"], {
    encoding: "utf-8"
  });
  const panes = JSON.parse(output);
  const active = panes.find((p) => p.is_active) ?? panes[0];
  if (!active?.cwd) {
    throw new Error("No active WezTerm pane found");
  }
  return new import_node_url.URL(active.cwd).pathname;
}
async function wezterm_to_finder_default() {
  try {
    const cwd = getWezTermCwd();
    await (0, import_api.open)(cwd);
    await (0, import_api.showToast)({ style: import_api.Toast.Style.Success, title: "Done" });
  } catch (e) {
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: "Failed to get WezTerm directory",
      message: e instanceof Error ? e.message : String(e)
    });
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvd2V6dGVybS10by1maW5kZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvd2V6dGVybS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZXhlY0ZpbGVTeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBvcGVuLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSAnQHJheWNhc3QvYXBpJ1xuaW1wb3J0IHsgZ2V0V2V6VGVybUV4ZWN1dGFibGUgfSBmcm9tICcuL3dlenRlcm0nXG5cbmludGVyZmFjZSBXZXpUZXJtUGFuZSB7XG4gIHBhbmVfaWQ6IG51bWJlclxuICBjd2Q6IHN0cmluZ1xuICBpc19hY3RpdmU6IGJvb2xlYW5cbn1cblxuZnVuY3Rpb24gZ2V0V2V6VGVybUN3ZCgpOiBzdHJpbmcge1xuICBjb25zdCBvdXRwdXQgPSBleGVjRmlsZVN5bmMoZ2V0V2V6VGVybUV4ZWN1dGFibGUoKSwgWydjbGknLCAnbGlzdCcsICctLWZvcm1hdCcsICdqc29uJ10sIHtcbiAgICBlbmNvZGluZzogJ3V0Zi04JyxcbiAgfSlcbiAgY29uc3QgcGFuZXM6IFdlelRlcm1QYW5lW10gPSBKU09OLnBhcnNlKG91dHB1dClcblxuICBjb25zdCBhY3RpdmUgPSBwYW5lcy5maW5kKHAgPT4gcC5pc19hY3RpdmUpID8/IHBhbmVzWzBdXG4gIGlmICghYWN0aXZlPy5jd2QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFjdGl2ZSBXZXpUZXJtIHBhbmUgZm91bmQnKVxuICB9XG5cbiAgLy8gY3dkIGlzIGEgZmlsZTovLyBVUkwsIGNvbnZlcnQgdG8gcGF0aFxuICByZXR1cm4gbmV3IFVSTChhY3RpdmUuY3dkKS5wYXRobmFtZVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY3dkID0gZ2V0V2V6VGVybUN3ZCgpXG4gICAgYXdhaXQgb3Blbihjd2QpXG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiAnRG9uZScgfSlcbiAgfVxuICBjYXRjaCAoZSkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiAnRmFpbGVkIHRvIGdldCBXZXpUZXJtIGRpcmVjdG9yeScsXG4gICAgICBtZXNzYWdlOiBlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSksXG4gICAgfSlcbiAgfVxufVxuIiwgImltcG9ydCB7IGV4ZWNGaWxlU3luYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHsgdXNlckluZm8gfSBmcm9tICdub2RlOm9zJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2V6VGVybUV4ZWN1dGFibGUoKTogc3RyaW5nIHtcbiAgY29uc3QgbG9naW5TaGVsbCA9IHVzZXJJbmZvKCkuc2hlbGxcblxuICBpZiAoIWxvZ2luU2hlbGwgfHwgIWV4aXN0c1N5bmMobG9naW5TaGVsbCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRoZSB1c2VyXFwncyBsb2dpbiBzaGVsbCcpXG4gIH1cblxuICBjb25zdCBleGVjdXRhYmxlID0gZXhlY0ZpbGVTeW5jKGxvZ2luU2hlbGwsIFsnLWxjJywgJ2NvbW1hbmQgLXYgd2V6dGVybSddLCB7XG4gICAgZW5jb2Rpbmc6ICd1dGYtOCcsXG4gIH0pLnRyaW0oKVxuXG4gIGlmICghZXhlY3V0YWJsZSB8fCAhZXhpc3RzU3luYyhleGVjdXRhYmxlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2V6VGVybSBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBsb2dpbiBzaGVsbCBQQVRIJylcbiAgfVxuXG4gIHJldHVybiBleGVjdXRhYmxlXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQSw2QkFBNkI7QUFDN0Isc0JBQW9CO0FBQ3BCLGlCQUF1Qzs7O0FDRnZDLGdDQUE2QjtBQUM3QixxQkFBMkI7QUFDM0IscUJBQXlCO0FBRWxCLFNBQVMsdUJBQStCO0FBQzdDLFFBQU0saUJBQWEseUJBQVMsRUFBRTtBQUU5QixNQUFJLENBQUMsY0FBYyxLQUFDLDJCQUFXLFVBQVUsR0FBRztBQUMxQyxVQUFNLElBQUksTUFBTSx1Q0FBd0M7QUFBQSxFQUMxRDtBQUVBLFFBQU0saUJBQWEsd0NBQWEsWUFBWSxDQUFDLE9BQU8sb0JBQW9CLEdBQUc7QUFBQSxJQUN6RSxVQUFVO0FBQUEsRUFDWixDQUFDLEVBQUUsS0FBSztBQUVSLE1BQUksQ0FBQyxjQUFjLEtBQUMsMkJBQVcsVUFBVSxHQUFHO0FBQzFDLFVBQU0sSUFBSSxNQUFNLGtEQUFrRDtBQUFBLEVBQ3BFO0FBRUEsU0FBTztBQUNUOzs7QURUQSxTQUFTLGdCQUF3QjtBQUMvQixRQUFNLGFBQVMseUNBQWEscUJBQXFCLEdBQUcsQ0FBQyxPQUFPLFFBQVEsWUFBWSxNQUFNLEdBQUc7QUFBQSxJQUN2RixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0QsUUFBTSxRQUF1QixLQUFLLE1BQU0sTUFBTTtBQUU5QyxRQUFNLFNBQVMsTUFBTSxLQUFLLE9BQUssRUFBRSxTQUFTLEtBQUssTUFBTSxDQUFDO0FBQ3RELE1BQUksQ0FBQyxRQUFRLEtBQUs7QUFDaEIsVUFBTSxJQUFJLE1BQU0sOEJBQThCO0FBQUEsRUFDaEQ7QUFHQSxTQUFPLElBQUksb0JBQUksT0FBTyxHQUFHLEVBQUU7QUFDN0I7QUFFQSxlQUFPLDRCQUEwQjtBQUMvQixNQUFJO0FBQ0YsVUFBTSxNQUFNLGNBQWM7QUFDMUIsY0FBTSxpQkFBSyxHQUFHO0FBQ2QsY0FBTSxzQkFBVSxFQUFFLE9BQU8saUJBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0QsU0FDTyxHQUFHO0FBQ1IsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUyxhQUFhLFFBQVEsRUFBRSxVQUFVLE9BQU8sQ0FBQztBQUFBLElBQ3BELENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9ub2RlX2NoaWxkX3Byb2Nlc3MiXQp9Cg==
