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
var DATA_DIR = "/Users/sayori/.config/raycast/data";
function sanitizeName(name) {
  const normalized = name.trim().toLowerCase();
  const safe = normalized.replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!safe) {
    throw new Error("Counter name is empty after sanitization");
  }
  return safe;
}
function nowParts() {
  const now = /* @__PURE__ */ new Date();
  const localDate = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
  const localDateTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
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
function filePaths(counterName) {
  const name = sanitizeName(counterName);
  return {
    name,
    dailyFile: `${DATA_DIR}/${name}.txt`,
    auditFile: `${DATA_DIR}/${name}.audit.log`
  };
}
async function incrementCounter(rawName) {
  const { date, dateTime } = nowParts();
  const { name, dailyFile, auditFile } = filePaths(rawName);
  await (0, import_promises.mkdir)(DATA_DIR, { recursive: true });
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
async function Command(props) {
  const name = props.arguments.name;
  const result = await incrementCounter(name);
  await (0, import_api.showHUD)(`${result.name}\uFF1A\u4ECA\u5929\u7B2C ${result.count} \u6B21`, {
    clearRootSearch: true
  });
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2luY3JlbWVudC1jb3VudGVyLnRzIiwgInNyYy9saWIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IHNob3dIVUQsIExhdW5jaFByb3BzIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgaW5jcmVtZW50Q291bnRlciB9IGZyb20gXCIuL2xpYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBDb21tYW5kKHByb3BzOiBMYXVuY2hQcm9wczx7IGFyZ3VtZW50czogQXJndW1lbnRzLkluY3JlbWVudENvdW50ZXIgfT4pIHtcbiAgY29uc3QgbmFtZSA9IHByb3BzLmFyZ3VtZW50cy5uYW1lO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGluY3JlbWVudENvdW50ZXIobmFtZSk7XG4gIGF3YWl0IHNob3dIVUQoYCR7cmVzdWx0Lm5hbWV9XHVGRjFBXHU0RUNBXHU1OTI5XHU3QjJDICR7cmVzdWx0LmNvdW50fSBcdTZCMjFgLCB7XG4gICAgY2xlYXJSb290U2VhcmNoOiB0cnVlLFxuICB9KTtcbn0iLCAiaW1wb3J0IHsgbWtkaXIsIHJlYWRGaWxlLCB3cml0ZUZpbGUsIGFwcGVuZEZpbGUgfSBmcm9tIFwibm9kZTpmcy9wcm9taXNlc1wiO1xuXG5jb25zdCBEQVRBX0RJUiA9IFwiL1VzZXJzL3NheW9yaS8uY29uZmlnL3JheWNhc3QvZGF0YVwiO1xuXG5mdW5jdGlvbiBzYW5pdGl6ZU5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHNhZmUgPSBub3JtYWxpemVkLnJlcGxhY2UoL1teYS16MC05Ll8tXS9nLCBcIi1cIikucmVwbGFjZSgvLSsvZywgXCItXCIpLnJlcGxhY2UoL14tfC0kL2csIFwiXCIpO1xuICBpZiAoIXNhZmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VudGVyIG5hbWUgaXMgZW1wdHkgYWZ0ZXIgc2FuaXRpemF0aW9uXCIpO1xuICB9XG4gIHJldHVybiBzYWZlO1xufVxuXG5mdW5jdGlvbiBub3dQYXJ0cygpIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICBjb25zdCBsb2NhbERhdGUgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInN2LVNFXCIsIHtcbiAgICB0aW1lWm9uZTogXCJBc2lhL1NoYW5naGFpXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwiMi1kaWdpdFwiLFxuICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gIH0pLmZvcm1hdChub3cpO1xuXG4gIGNvbnN0IGxvY2FsRGF0ZVRpbWUgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInN2LVNFXCIsIHtcbiAgICB0aW1lWm9uZTogXCJBc2lhL1NoYW5naGFpXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgbW9udGg6IFwiMi1kaWdpdFwiLFxuICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxuICAgIGhvdXIxMjogZmFsc2UsXG4gIH0pXG4gICAgLmZvcm1hdChub3cpXG4gICAgLnJlcGxhY2UoXCIsXCIsIFwiXCIpO1xuXG4gIHJldHVybiB7XG4gICAgZGF0ZTogbG9jYWxEYXRlLFxuICAgIGRhdGVUaW1lOiBsb2NhbERhdGVUaW1lLFxuICB9O1xufVxuXG5mdW5jdGlvbiBmaWxlUGF0aHMoY291bnRlck5hbWU6IHN0cmluZykge1xuICBjb25zdCBuYW1lID0gc2FuaXRpemVOYW1lKGNvdW50ZXJOYW1lKTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIGRhaWx5RmlsZTogYCR7REFUQV9ESVJ9LyR7bmFtZX0udHh0YCxcbiAgICBhdWRpdEZpbGU6IGAke0RBVEFfRElSfS8ke25hbWV9LmF1ZGl0LmxvZ2AsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbmNyZW1lbnRDb3VudGVyKHJhd05hbWU6IHN0cmluZyk6IFByb21pc2U8eyBuYW1lOiBzdHJpbmc7IHRvZGF5OiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4ge1xuICBjb25zdCB7IGRhdGUsIGRhdGVUaW1lIH0gPSBub3dQYXJ0cygpO1xuICBjb25zdCB7IG5hbWUsIGRhaWx5RmlsZSwgYXVkaXRGaWxlIH0gPSBmaWxlUGF0aHMocmF3TmFtZSk7XG5cbiAgYXdhaXQgbWtkaXIoREFUQV9ESVIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuXG4gIGxldCBsaW5lczogc3RyaW5nW10gPSBbXTtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZEZpbGUoZGFpbHlGaWxlLCBcInV0ZjhcIik7XG4gICAgbGluZXMgPSBjb250ZW50XG4gICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgfSBjYXRjaCB7XG4gICAgbGluZXMgPSBbXTtcbiAgfVxuXG4gIGxldCBmb3VuZCA9IGZhbHNlO1xuICBsZXQgdG9kYXlDb3VudCA9IDE7XG5cbiAgY29uc3QgdXBkYXRlZCA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgIGNvbnN0IFtkLCBjXSA9IGxpbmUuc3BsaXQoL1xccysvKTtcbiAgICBpZiAoZCA9PT0gZGF0ZSkge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgdG9kYXlDb3VudCA9IE51bWJlcihjIHx8IFwiMFwiKSArIDE7XG4gICAgICByZXR1cm4gYCR7ZH1cXHQke3RvZGF5Q291bnR9YDtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmU7XG4gIH0pO1xuXG4gIGlmICghZm91bmQpIHtcbiAgICB1cGRhdGVkLnB1c2goYCR7ZGF0ZX1cXHQxYCk7XG4gICAgdG9kYXlDb3VudCA9IDE7XG4gIH1cblxuICB1cGRhdGVkLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCBkYSA9IGEuc3BsaXQoL1xccysvKVswXTtcbiAgICBjb25zdCBkYiA9IGIuc3BsaXQoL1xccysvKVswXTtcbiAgICByZXR1cm4gZGEubG9jYWxlQ29tcGFyZShkYik7XG4gIH0pO1xuXG4gIGF3YWl0IHdyaXRlRmlsZShkYWlseUZpbGUsIHVwZGF0ZWQuam9pbihcIlxcblwiKSArIFwiXFxuXCIsIFwidXRmOFwiKTtcbiAgYXdhaXQgYXBwZW5kRmlsZShhdWRpdEZpbGUsIGAke2RhdGVUaW1lfVxcdCR7bmFtZX1cXG5gLCBcInV0ZjhcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHRvZGF5OiBkYXRlLFxuICAgIGNvdW50OiB0b2RheUNvdW50LFxuICB9O1xufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxQzs7O0FDQXJDLHNCQUF1RDtBQUV2RCxJQUFNLFdBQVc7QUFFakIsU0FBUyxhQUFhLE1BQXNCO0FBQzFDLFFBQU0sYUFBYSxLQUFLLEtBQUssRUFBRSxZQUFZO0FBQzNDLFFBQU0sT0FBTyxXQUFXLFFBQVEsaUJBQWlCLEdBQUcsRUFBRSxRQUFRLE9BQU8sR0FBRyxFQUFFLFFBQVEsVUFBVSxFQUFFO0FBQzlGLE1BQUksQ0FBQyxNQUFNO0FBQ1QsVUFBTSxJQUFJLE1BQU0sMENBQTBDO0FBQUEsRUFDNUQ7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLFdBQVc7QUFDbEIsUUFBTSxNQUFNLG9CQUFJLEtBQUs7QUFFckIsUUFBTSxZQUFZLElBQUksS0FBSyxlQUFlLFNBQVM7QUFBQSxJQUNqRCxVQUFVO0FBQUEsSUFDVixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxLQUFLO0FBQUEsRUFDUCxDQUFDLEVBQUUsT0FBTyxHQUFHO0FBRWIsUUFBTSxnQkFBZ0IsSUFBSSxLQUFLLGVBQWUsU0FBUztBQUFBLElBQ3JELFVBQVU7QUFBQSxJQUNWLE1BQU07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
