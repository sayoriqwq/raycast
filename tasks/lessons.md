# Lessons.md

## 2026-03-09

- Pattern:
  提供的 `todo` 不能直接交接执行，下一位 agent 仍需二次检索信息。
  Guardrail:
  计划必须是可直接执行的交付件：包含明确文件级改动点、配置字段、执行顺序、验证命令与验收标准，并附已确认的官方链接，禁止把关键信息留给下一位 agent 重新调研。
  Trigger:
  用户反馈“这个 todo 不能直接交付给下一个 agent，需要重新查询信息”。

- Pattern:
  改动后未保证 `pnpm run build` 会在扩展根目录产生命令可执行 JS，导致 Raycast 报 `Could not find command's executable JS file`。
  Guardrail:
  涉及 Raycast 命令入口改动时，必须验证并保证 `commands[].name` 对应的 `<name>.js` 在扩展根目录存在；若默认构建脚本不能生成，必须同步修正脚本（如 `ray build -e dev -o .`）。
  Trigger:
  用户反馈“build 后没有生成 js 文件，已有功能被破坏”。
