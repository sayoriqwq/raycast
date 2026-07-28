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
var import_api = require("@raycast/api");
var import_node_child_process2 = require("node:child_process");
var import_node_url = require("node:url");

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvd2V6dGVybS10by1maW5kZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vVXNlcnMvc2F5b3JpL0Rlc2t0b3AvcmF5Y2FzdC9leHRlbnNpb25zL3Rlcm1pbmFsLWZpbmRlci9zcmMvd2V6dGVybS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgb3Blbiwgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGV4ZWNGaWxlU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgZ2V0V2V6VGVybUV4ZWN1dGFibGUgfSBmcm9tIFwiLi93ZXp0ZXJtXCI7XG5cbmludGVyZmFjZSBXZXpUZXJtUGFuZSB7XG4gIHBhbmVfaWQ6IG51bWJlcjtcbiAgY3dkOiBzdHJpbmc7XG4gIGlzX2FjdGl2ZTogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0V2V6VGVybUN3ZCgpOiBzdHJpbmcge1xuICBjb25zdCBvdXRwdXQgPSBleGVjRmlsZVN5bmMoZ2V0V2V6VGVybUV4ZWN1dGFibGUoKSwgW1wiY2xpXCIsIFwibGlzdFwiLCBcIi0tZm9ybWF0XCIsIFwianNvblwiXSwge1xuICAgIGVuY29kaW5nOiBcInV0Zi04XCIsXG4gIH0pO1xuICBjb25zdCBwYW5lczogV2V6VGVybVBhbmVbXSA9IEpTT04ucGFyc2Uob3V0cHV0KTtcblxuICBjb25zdCBhY3RpdmUgPSBwYW5lcy5maW5kKChwKSA9PiBwLmlzX2FjdGl2ZSkgPz8gcGFuZXNbMF07XG4gIGlmICghYWN0aXZlPy5jd2QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBhY3RpdmUgV2V6VGVybSBwYW5lIGZvdW5kXCIpO1xuICB9XG5cbiAgLy8gY3dkIGlzIGEgZmlsZTovLyBVUkwsIGNvbnZlcnQgdG8gcGF0aFxuICByZXR1cm4gbmV3IFVSTChhY3RpdmUuY3dkKS5wYXRobmFtZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNvbnN0IGN3ZCA9IGdldFdlelRlcm1Dd2QoKTtcbiAgICBhd2FpdCBvcGVuKGN3ZCk7XG4gICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIkRvbmVcIiB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgIHRpdGxlOiBcIkZhaWxlZCB0byBnZXQgV2V6VGVybSBkaXJlY3RvcnlcIixcbiAgICAgIG1lc3NhZ2U6IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IFN0cmluZyhlKSxcbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGV4ZWNGaWxlU3luYyB9IGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgdXNlckluZm8gfSBmcm9tIFwibm9kZTpvc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2V6VGVybUV4ZWN1dGFibGUoKTogc3RyaW5nIHtcbiAgY29uc3QgbG9naW5TaGVsbCA9IHVzZXJJbmZvKCkuc2hlbGw7XG5cbiAgaWYgKCFsb2dpblNoZWxsIHx8ICFleGlzdHNTeW5jKGxvZ2luU2hlbGwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgdGhlIHVzZXIncyBsb2dpbiBzaGVsbFwiKTtcbiAgfVxuXG4gIGNvbnN0IGV4ZWN1dGFibGUgPSBleGVjRmlsZVN5bmMobG9naW5TaGVsbCwgW1wiLWxjXCIsIFwiY29tbWFuZCAtdiB3ZXp0ZXJtXCJdLCB7XG4gICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgfSkudHJpbSgpO1xuXG4gIGlmICghZXhlY3V0YWJsZSB8fCAhZXhpc3RzU3luYyhleGVjdXRhYmxlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIldlelRlcm0gaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgbG9naW4gc2hlbGwgUEFUSFwiKTtcbiAgfVxuXG4gIHJldHVybiBleGVjdXRhYmxlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVDO0FBQ3ZDLElBQUFBLDZCQUE2QjtBQUM3QixzQkFBb0I7OztBQ0ZwQixnQ0FBNkI7QUFDN0IscUJBQTJCO0FBQzNCLHFCQUF5QjtBQUVsQixTQUFTLHVCQUErQjtBQUM3QyxRQUFNLGlCQUFhLHlCQUFTLEVBQUU7QUFFOUIsTUFBSSxDQUFDLGNBQWMsS0FBQywyQkFBVyxVQUFVLEdBQUc7QUFDMUMsVUFBTSxJQUFJLE1BQU0sdUNBQXVDO0FBQUEsRUFDekQ7QUFFQSxRQUFNLGlCQUFhLHdDQUFhLFlBQVksQ0FBQyxPQUFPLG9CQUFvQixHQUFHO0FBQUEsSUFDekUsVUFBVTtBQUFBLEVBQ1osQ0FBQyxFQUFFLEtBQUs7QUFFUixNQUFJLENBQUMsY0FBYyxLQUFDLDJCQUFXLFVBQVUsR0FBRztBQUMxQyxVQUFNLElBQUksTUFBTSxrREFBa0Q7QUFBQSxFQUNwRTtBQUVBLFNBQU87QUFDVDs7O0FEVEEsU0FBUyxnQkFBd0I7QUFDL0IsUUFBTSxhQUFTLHlDQUFhLHFCQUFxQixHQUFHLENBQUMsT0FBTyxRQUFRLFlBQVksTUFBTSxHQUFHO0FBQUEsSUFDdkYsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNELFFBQU0sUUFBdUIsS0FBSyxNQUFNLE1BQU07QUFFOUMsUUFBTSxTQUFTLE1BQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLEtBQUssTUFBTSxDQUFDO0FBQ3hELE1BQUksQ0FBQyxRQUFRLEtBQUs7QUFDaEIsVUFBTSxJQUFJLE1BQU0sOEJBQThCO0FBQUEsRUFDaEQ7QUFHQSxTQUFPLElBQUksb0JBQUksT0FBTyxHQUFHLEVBQUU7QUFDN0I7QUFFQSxlQUFPLDRCQUEwQjtBQUMvQixNQUFJO0FBQ0YsVUFBTSxNQUFNLGNBQWM7QUFDMUIsY0FBTSxpQkFBSyxHQUFHO0FBQ2QsY0FBTSxzQkFBVSxFQUFFLE9BQU8saUJBQU0sTUFBTSxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDL0QsU0FBUyxHQUFHO0FBQ1YsY0FBTSxzQkFBVTtBQUFBLE1BQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUyxhQUFhLFFBQVEsRUFBRSxVQUFVLE9BQU8sQ0FBQztBQUFBLElBQ3BELENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9ub2RlX2NoaWxkX3Byb2Nlc3MiXQp9Cg==
