## todo.md

> 状态：implemented（待你在 Raycast UI 手测 A1/A3/A4）
> 目标：修复 counter 扩展 icon 未加载问题，并重构为单入口 + 可配置注入架构
> 范围：`extensions/counter` 的 manifest/命令结构/配置读取策略与验证流程

### checklist

- [x] P0. 文档与现状对齐：基于 Raycast 官方文档确认 `icon`、`commands`、`preferences` 规则，并固化为实现约束。
- [x] P0. Icon 修复方案：统一 extension/command 的 icon 引用方式为官方推荐写法，核验资源规格（PNG、>=512）与主题适配策略（可选 `@dark`）。
- [x] P0. 命令收敛方案：移除 `increment-qq` 这种硬编码命令，仅保留一个入口命令（暂定 `increment-counter`）。
- [x] P0. 配置注入方案：在 manifest 增加可配置项（preferences），并定义注入优先级：`arguments > command preferences > extension preferences > fallback`。
- [x] P1. 配置模型设计：定义“默认计数器 + 可扩展别名/目标列表”的最小模型，确保可注入 `qq` 与其他业务标识而不新增命令文件。
- [x] P1. 数据兼容策略：保持现有日志文件结构与历史数据可读，避免重构导致统计断层。
- [x] P1. 验证计划：覆盖 `ray lint`、`ray build` 与本地手测（icon 展示、偏好项生效、单入口可切换目标）。

### 验收标准

- [ ] A1. Raycast 内 extension icon 可正常显示，命令 icon 回退或显式配置行为符合预期。
- [x] A2. manifest 中不再出现 `increment-qq` 等硬编码业务命令，仅保留单入口命令。
- [ ] A3. 通过 preferences 可注入至少两个目标（例如 `qq` 与 `wechat`），且无需新增命令即可生效。
- [ ] A4. 命令运行时按既定优先级解析目标名称，并写入原有 daily/audit 数据格式。
- [ ] A5. lint/build 通过，且无已知行为回归。

### results

- 已完成实现：单入口重构、preferences 注入、icon 规范化、构建通过。
- 构建验证：`pnpm run build`（`ray build -e dev -o .ray-build && cp .ray-build/increment-counter.js .`）通过，并在扩展根目录生成 `increment-counter.js`（2026-03-09）。
- lint 现状：`pnpm run lint` 因 `author` 在线校验失败（`sayori` 404）未通过；该问题为 manifest 元数据校验，不影响本地命令构建与执行。
- 待你手测：Raycast UI 下的 icon 展示与偏好项注入行为（A1/A3/A4）。
- 参考文档：
- https://developers.raycast.com/information/manifest
- https://developers.raycast.com/api-reference/preferences
- https://developers.raycast.com/information/lifecycle/arguments
- https://developers.raycast.com/api-reference/user-interface/icons-and-images
