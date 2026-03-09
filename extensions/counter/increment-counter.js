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

// src/increment-counter.ts
var increment_counter_exports = {};
__export(increment_counter_exports, {
  default: () => Command
});
module.exports = __toCommonJS(increment_counter_exports);
var import_api = require("@raycast/api");

// src/lib.ts
var import_promises = require("node:fs/promises");
var DEFAULT_DATA_DIR = "/Users/sayori/.config/raycast/data/counter";
var DEFAULT_TIME_ZONE = "Asia/Shanghai";
function sanitizeName(name) {
  const normalized = name.trim().toLowerCase();
  const safe = normalized.replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!safe) {
    throw new Error("Counter name is empty after sanitization");
  }
  return safe;
}
function nowParts(timeZone) {
  const now = /* @__PURE__ */ new Date();
  const localDate = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
  const localDateTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now).replace(",", "");
  return {
    date: localDate,
    dateTime: localDateTime
  };
}
function filePaths(counterName, dataDirectory) {
  const name = sanitizeName(counterName);
  return {
    name,
    dailyFile: `${dataDirectory}/${name}.txt`,
    auditFile: `${dataDirectory}/${name}.audit.log`
  };
}
function sanitizeDataDirectory(raw) {
  const normalized = raw?.trim();
  if (!normalized) {
    return DEFAULT_DATA_DIR;
  }
  return normalized.replace(/\/+$/, "");
}
function sanitizeTimeZone(raw) {
  const normalized = raw?.trim();
  if (!normalized) {
    return DEFAULT_TIME_ZONE;
  }
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: normalized }).format(/* @__PURE__ */ new Date());
    return normalized;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}
async function incrementCounter(rawName, options = {}) {
  const dataDirectory = sanitizeDataDirectory(options.dataDirectory);
  const timeZone = sanitizeTimeZone(options.timeZone);
  const { date, dateTime } = nowParts(timeZone);
  const { name, dailyFile, auditFile } = filePaths(rawName, dataDirectory);
  await (0, import_promises.mkdir)(dataDirectory, { recursive: true });
  let lines = [];
  try {
    const content = await (0, import_promises.readFile)(dailyFile, "utf8");
    lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  } catch {
    lines = [];
  }
  let found = false;
  let todayCount = 1;
  const updated = lines.map((line) => {
    const [d, c] = line.split(/\s+/);
    if (d === date) {
      found = true;
      todayCount = Number(c || "0") + 1;
      return `${d}	${todayCount}`;
    }
    return line;
  });
  if (!found) {
    updated.push(`${date}	1`);
    todayCount = 1;
  }
  updated.sort((a, b) => {
    const da = a.split(/\s+/)[0];
    const db = b.split(/\s+/)[0];
    return da.localeCompare(db);
  });
  await (0, import_promises.writeFile)(dailyFile, updated.join("\n") + "\n", "utf8");
  await (0, import_promises.appendFile)(auditFile, `${dateTime}	${name}
`, "utf8");
  return {
    name,
    today: date,
    count: todayCount
  };
}

// src/increment-counter.ts
var MissingCounterTargetError = class extends Error {
  constructor() {
    super("Counter target is missing");
    this.name = "MissingCounterTargetError";
  }
};
function parseAliasMap(raw) {
  const map = /* @__PURE__ */ new Map();
  if (!raw?.trim()) {
    return map;
  }
  const pairs = raw.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
  for (const pair of pairs) {
    const [aliasRaw, targetRaw] = pair.split(/[=:]/, 2);
    const alias = aliasRaw?.trim().toLowerCase();
    const target = targetRaw?.trim();
    if (alias && target) {
      map.set(alias, target);
    }
  }
  return map;
}
function resolveTarget(argumentsValue, preferences) {
  const targetFromArgs = argumentsValue?.trim();
  const sourceTarget = targetFromArgs || preferences.defaultCounter?.trim();
  if (!sourceTarget) {
    throw new MissingCounterTargetError();
  }
  const aliasMap = parseAliasMap(preferences.counterAliases);
  return aliasMap.get(sourceTarget.toLowerCase()) ?? sourceTarget;
}
async function Command(props) {
  const preferences = (0, import_api.getPreferenceValues)();
  try {
    const target = resolveTarget(props.arguments.target, preferences);
    const result = await incrementCounter(target, {
      dataDirectory: preferences.dataDirectory,
      timeZone: preferences.timeZone
    });
    await (0, import_api.showHUD)(`${result.name}\uFF1A\u4ECA\u5929\u7B2C ${result.count} \u6B21`, {
      clearRootSearch: true
    });
  } catch (error) {
    if (error instanceof MissingCounterTargetError) {
      await (0, import_api.showToast)({
        style: import_api.Toast.Style.Failure,
        title: "\u7F3A\u5C11\u8BA1\u6570\u76EE\u6807",
        message: "\u8BF7\u5148\u5728\u6269\u5C55\u504F\u597D\u8BBE\u7F6E\u4E2D\u586B\u5199 Default Counter\uFF0C\u6216\u4F20\u5165 target \u53C2\u6570"
      });
      await (0, import_api.openExtensionPreferences)();
      return;
    }
    await (0, import_api.showToast)({
      style: import_api.Toast.Style.Failure,
      title: "\u8BA1\u6570\u5931\u8D25",
      message: error instanceof Error ? error.message : String(error)
    });
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luY3JlbWVudC1jb3VudGVyLnRzIiwgIi4uL3NyYy9saWIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGdldFByZWZlcmVuY2VWYWx1ZXMsIExhdW5jaFByb3BzLCBvcGVuRXh0ZW5zaW9uUHJlZmVyZW5jZXMsIHNob3dIVUQsIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBpbmNyZW1lbnRDb3VudGVyIH0gZnJvbSBcIi4vbGliXCI7XG5cbnR5cGUgQ29tbWFuZEFyZ3VtZW50cyA9IHtcbiAgdGFyZ2V0Pzogc3RyaW5nO1xufTtcblxudHlwZSBDb21tYW5kUHJlZmVyZW5jZXMgPSB7XG4gIGRlZmF1bHRDb3VudGVyPzogc3RyaW5nO1xuICBjb3VudGVyQWxpYXNlcz86IHN0cmluZztcbiAgZGF0YURpcmVjdG9yeT86IHN0cmluZztcbiAgdGltZVpvbmU/OiBzdHJpbmc7XG59O1xuXG5jbGFzcyBNaXNzaW5nQ291bnRlclRhcmdldEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIkNvdW50ZXIgdGFyZ2V0IGlzIG1pc3NpbmdcIik7XG4gICAgdGhpcy5uYW1lID0gXCJNaXNzaW5nQ291bnRlclRhcmdldEVycm9yXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBbGlhc01hcChyYXc/OiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgaWYgKCFyYXc/LnRyaW0oKSkge1xuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBjb25zdCBwYWlycyA9IHJhd1xuICAgIC5zcGxpdCgvW1xcbixdLylcbiAgICAubWFwKChpdGVtKSA9PiBpdGVtLnRyaW0oKSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuICAgIGNvbnN0IFthbGlhc1JhdywgdGFyZ2V0UmF3XSA9IHBhaXIuc3BsaXQoL1s9Ol0vLCAyKTtcbiAgICBjb25zdCBhbGlhcyA9IGFsaWFzUmF3Py50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRSYXc/LnRyaW0oKTtcbiAgICBpZiAoYWxpYXMgJiYgdGFyZ2V0KSB7XG4gICAgICBtYXAuc2V0KGFsaWFzLCB0YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUYXJnZXQoYXJndW1lbnRzVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCwgcHJlZmVyZW5jZXM6IENvbW1hbmRQcmVmZXJlbmNlcyk6IHN0cmluZyB7XG4gIGNvbnN0IHRhcmdldEZyb21BcmdzID0gYXJndW1lbnRzVmFsdWU/LnRyaW0oKTtcbiAgY29uc3Qgc291cmNlVGFyZ2V0ID0gdGFyZ2V0RnJvbUFyZ3MgfHwgcHJlZmVyZW5jZXMuZGVmYXVsdENvdW50ZXI/LnRyaW0oKTtcblxuICBpZiAoIXNvdXJjZVRhcmdldCkge1xuICAgIHRocm93IG5ldyBNaXNzaW5nQ291bnRlclRhcmdldEVycm9yKCk7XG4gIH1cblxuICBjb25zdCBhbGlhc01hcCA9IHBhcnNlQWxpYXNNYXAocHJlZmVyZW5jZXMuY291bnRlckFsaWFzZXMpO1xuICByZXR1cm4gYWxpYXNNYXAuZ2V0KHNvdXJjZVRhcmdldC50b0xvd2VyQ2FzZSgpKSA/PyBzb3VyY2VUYXJnZXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIENvbW1hbmQocHJvcHM6IExhdW5jaFByb3BzPHsgYXJndW1lbnRzOiBDb21tYW5kQXJndW1lbnRzIH0+KSB7XG4gIGNvbnN0IHByZWZlcmVuY2VzID0gZ2V0UHJlZmVyZW5jZVZhbHVlczxDb21tYW5kUHJlZmVyZW5jZXM+KCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0YXJnZXQgPSByZXNvbHZlVGFyZ2V0KHByb3BzLmFyZ3VtZW50cy50YXJnZXQsIHByZWZlcmVuY2VzKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBpbmNyZW1lbnRDb3VudGVyKHRhcmdldCwge1xuICAgICAgZGF0YURpcmVjdG9yeTogcHJlZmVyZW5jZXMuZGF0YURpcmVjdG9yeSxcbiAgICAgIHRpbWVab25lOiBwcmVmZXJlbmNlcy50aW1lWm9uZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IHNob3dIVUQoYCR7cmVzdWx0Lm5hbWV9XHVGRjFBXHU0RUNBXHU1OTI5XHU3QjJDICR7cmVzdWx0LmNvdW50fSBcdTZCMjFgLCB7XG4gICAgICBjbGVhclJvb3RTZWFyY2g6IHRydWUsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTWlzc2luZ0NvdW50ZXJUYXJnZXRFcnJvcikge1xuICAgICAgYXdhaXQgc2hvd1RvYXN0KHtcbiAgICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICAgIHRpdGxlOiBcIlx1N0YzQVx1NUMxMVx1OEJBMVx1NjU3MFx1NzZFRVx1NjgwN1wiLFxuICAgICAgICBtZXNzYWdlOiBcIlx1OEJGN1x1NTE0OFx1NTcyOFx1NjI2OVx1NUM1NVx1NTA0Rlx1NTk3RFx1OEJCRVx1N0Y2RVx1NEUyRFx1NTg2Qlx1NTE5OSBEZWZhdWx0IENvdW50ZXJcdUZGMENcdTYyMTZcdTRGMjBcdTUxNjUgdGFyZ2V0IFx1NTNDMlx1NjU3MFwiLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBvcGVuRXh0ZW5zaW9uUHJlZmVyZW5jZXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICB0aXRsZTogXCJcdThCQTFcdTY1NzBcdTU5MzFcdThEMjVcIixcbiAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSxcbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG1rZGlyLCByZWFkRmlsZSwgd3JpdGVGaWxlLCBhcHBlbmRGaWxlIH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcblxuY29uc3QgREVGQVVMVF9EQVRBX0RJUiA9IFwiL1VzZXJzL3NheW9yaS8uY29uZmlnL3JheWNhc3QvZGF0YS9jb3VudGVyXCI7XG5jb25zdCBERUZBVUxUX1RJTUVfWk9ORSA9IFwiQXNpYS9TaGFuZ2hhaVwiO1xuXG5leHBvcnQgdHlwZSBJbmNyZW1lbnRDb3VudGVyT3B0aW9ucyA9IHtcbiAgZGF0YURpcmVjdG9yeT86IHN0cmluZztcbiAgdGltZVpvbmU/OiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiBzYW5pdGl6ZU5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHNhZmUgPSBub3JtYWxpemVkLnJlcGxhY2UoL1teYS16MC05Ll8tXS9nLCBcIi1cIikucmVwbGFjZSgvLSsvZywgXCItXCIpLnJlcGxhY2UoL14tfC0kL2csIFwiXCIpO1xuICBpZiAoIXNhZmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VudGVyIG5hbWUgaXMgZW1wdHkgYWZ0ZXIgc2FuaXRpemF0aW9uXCIpO1xuICB9XG4gIHJldHVybiBzYWZlO1xufVxuXG5mdW5jdGlvbiBub3dQYXJ0cyh0aW1lWm9uZTogc3RyaW5nKSB7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc3QgbG9jYWxEYXRlID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJzdi1TRVwiLCB7XG4gICAgdGltZVpvbmUsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwiMi1kaWdpdFwiLFxuICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gIH0pLmZvcm1hdChub3cpO1xuXG4gIGNvbnN0IGxvY2FsRGF0ZVRpbWUgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInN2LVNFXCIsIHtcbiAgICB0aW1lWm9uZSxcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICBtb250aDogXCIyLWRpZ2l0XCIsXG4gICAgZGF5OiBcIjItZGlnaXRcIixcbiAgICBob3VyOiBcIjItZGlnaXRcIixcbiAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICAgIHNlY29uZDogXCIyLWRpZ2l0XCIsXG4gICAgaG91cjEyOiBmYWxzZSxcbiAgfSlcbiAgICAuZm9ybWF0KG5vdylcbiAgICAucmVwbGFjZShcIixcIiwgXCJcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRlOiBsb2NhbERhdGUsXG4gICAgZGF0ZVRpbWU6IGxvY2FsRGF0ZVRpbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbGVQYXRocyhjb3VudGVyTmFtZTogc3RyaW5nLCBkYXRhRGlyZWN0b3J5OiBzdHJpbmcpIHtcbiAgY29uc3QgbmFtZSA9IHNhbml0aXplTmFtZShjb3VudGVyTmFtZSk7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBkYWlseUZpbGU6IGAke2RhdGFEaXJlY3Rvcnl9LyR7bmFtZX0udHh0YCxcbiAgICBhdWRpdEZpbGU6IGAke2RhdGFEaXJlY3Rvcnl9LyR7bmFtZX0uYXVkaXQubG9nYCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVEYXRhRGlyZWN0b3J5KHJhdz86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSByYXc/LnRyaW0oKTtcbiAgaWYgKCFub3JtYWxpemVkKSB7XG4gICAgcmV0dXJuIERFRkFVTFRfREFUQV9ESVI7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWQucmVwbGFjZSgvXFwvKyQvLCBcIlwiKTtcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVUaW1lWm9uZShyYXc/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBub3JtYWxpemVkID0gcmF3Py50cmltKCk7XG4gIGlmICghbm9ybWFsaXplZCkge1xuICAgIHJldHVybiBERUZBVUxUX1RJTUVfWk9ORTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1VU1wiLCB7IHRpbWVab25lOiBub3JtYWxpemVkIH0pLmZvcm1hdChuZXcgRGF0ZSgpKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIERFRkFVTFRfVElNRV9aT05FO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbmNyZW1lbnRDb3VudGVyKFxuICByYXdOYW1lOiBzdHJpbmcsXG4gIG9wdGlvbnM6IEluY3JlbWVudENvdW50ZXJPcHRpb25zID0ge30sXG4pOiBQcm9taXNlPHsgbmFtZTogc3RyaW5nOyB0b2RheTogc3RyaW5nOyBjb3VudDogbnVtYmVyIH0+IHtcbiAgY29uc3QgZGF0YURpcmVjdG9yeSA9IHNhbml0aXplRGF0YURpcmVjdG9yeShvcHRpb25zLmRhdGFEaXJlY3RvcnkpO1xuICBjb25zdCB0aW1lWm9uZSA9IHNhbml0aXplVGltZVpvbmUob3B0aW9ucy50aW1lWm9uZSk7XG4gIGNvbnN0IHsgZGF0ZSwgZGF0ZVRpbWUgfSA9IG5vd1BhcnRzKHRpbWVab25lKTtcbiAgY29uc3QgeyBuYW1lLCBkYWlseUZpbGUsIGF1ZGl0RmlsZSB9ID0gZmlsZVBhdGhzKHJhd05hbWUsIGRhdGFEaXJlY3RvcnkpO1xuXG4gIGF3YWl0IG1rZGlyKGRhdGFEaXJlY3RvcnksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gIGxldCBsaW5lczogc3RyaW5nW10gPSBbXTtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZEZpbGUoZGFpbHlGaWxlLCBcInV0ZjhcIik7XG4gICAgbGluZXMgPSBjb250ZW50XG4gICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgfSBjYXRjaCB7XG4gICAgbGluZXMgPSBbXTtcbiAgfVxuXG4gIGxldCBmb3VuZCA9IGZhbHNlO1xuICBsZXQgdG9kYXlDb3VudCA9IDE7XG5cbiAgY29uc3QgdXBkYXRlZCA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgIGNvbnN0IFtkLCBjXSA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBpZiAoZCA9PT0gZGF0ZSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgdG9kYXlDb3VudCA9IE51bWJlcihjIHx8IFwiMFwiKSArIDE7XG4gICAgICByZXR1cm4gYCR7ZH1cXHQke3RvZGF5Q291bnR9YDtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmU7XG4gIH0pO1xuXG4gIGlmICghZm91bmQpIHtcbiAgICB1cGRhdGVkLnB1c2goYCR7ZGF0ZX1cXHQxYCk7XG4gICAgdG9kYXlDb3VudCA9IDE7XG4gIH1cblxuICB1cGRhdGVkLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCBkYSA9IGEuc3BsaXQoL1xccysvKVswXTtcbiAgICBjb25zdCBkYiA9IGIuc3BsaXQoL1xccysvKVswXTtcbiAgICByZXR1cm4gZGEubG9jYWxlQ29tcGFyZShkYik7XG4gIH0pO1xuXG4gIGF3YWl0IHdyaXRlRmlsZShkYWlseUZpbGUsIHVwZGF0ZWQuam9pbihcIlxcblwiKSArIFwiXFxuXCIsIFwidXRmOFwiKTtcbiAgYXdhaXQgYXBwZW5kRmlsZShhdWRpdEZpbGUsIGAke2RhdGVUaW1lfVxcdCR7bmFtZX1cXG5gLCBcInV0ZjhcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHRvZGF5OiBkYXRlLFxuICAgIGNvdW50OiB0b2RheUNvdW50LFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXNHOzs7QUNBdEcsc0JBQXVEO0FBRXZELElBQU0sbUJBQW1CO0FBQ3pCLElBQU0sb0JBQW9CO0FBTzFCLFNB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
