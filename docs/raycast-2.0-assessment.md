# Raycast 2.0 同步评估

评估日期：2026-08-20（Asia/Shanghai）  
资料范围：仅 Raycast 官方博客、官方 changelog / Manual / Developer Docs，以及由 Raycast 官方发布的 npm 包。所有在线资料均于 2026-08-20 访问。

## 结论

需要同步，但范围很小：

1. **应该把两个本地 extension 的 `@raycast/api` 从 `1.104.23` 升到当前 `2.0.3`，重新生成 lockfile，并在 Raycast v2 中做一次开发导入和命令级 smoke test。** 官方 v2 Manual 明确建议本地 extension 安装 `@raycast/api@latest`，因为新版 `dev` 命令会优先连接正在运行的 Raycast v2；官方 FAQ 也建议 extension 开发者以后聚焦 v2。[Extensions Manual，2026-07-06 更新](https://manual.raycast.com/extensions)、[Raycast v2 FAQ，2026-08-19 更新](https://manual.raycast.com/new-in-v2)
2. **目前没有证据表明本仓库需要改 extension 业务代码、现有 manifest，或 Script Command metadata。** 仓库用到的 API（`open`、`getApplications`、`getSelectedFinderItems`、`showToast`、`Toast`）仍存在于 `@raycast/api@2.0.3` 的公开类型中；当前 `commands`、`mode: "no-view"`、`platforms: ["macOS"]` 结构仍符合官方 manifest 模型。7 个 Script Commands 使用的 `@raycast.schemaVersion 1` 和 `silent` mode 也仍是 v2 Manual 的现行格式。[`@raycast/api@2.0.3` 官方发布包](https://www.npmjs.com/package/@raycast/api/v/2.0.3?activeTab=code)、[Manifest 文档](https://developers.raycast.com/information/manifest)、[Script Commands Manual，2026-07-30 更新](https://manual.raycast.com/script-commands)
3. **应用迁移和权限重授权是本机运行态工作，不应写进本仓库。** Raycast 2.0 会替代 v1，迁移时可能要求重新授权权限；本仓库的 Finder / Chrome AppleScript、Script Commands 和应用控制路径正好依赖 Automation 等权限，升级后应人工逐项验证。[Raycast 2.0 changelog，2026-08-19 发布](https://www.raycast.com/changelog/macos-beta/2-0)、[Import & Export Manual，2026-07-30 更新](https://manual.raycast.com/import-export)

## 先分清三个版本号

| 名称 | 当前官方状态 | 与本仓库的关系 |
| --- | --- | --- |
| **Raycast macOS App 2.0** | 2026-08-19 正式结束 Beta 并替代 v1；macOS 要求 Tahoe + Apple silicon | 运行宿主；不是 npm 依赖版本 |
| **Raycast macOS App v1.104.16+** | 仅是从 v1 迁移数据 / 自定义 extension 到 v2 时的最低 v1 App 版本 | 不应写进 `package.json` |
| **npm `@raycast/api` 2.0.3** | 2026-08-19 发布，当前 `latest`；包声明 Node `>=22.22.2` | 两个 extension 应升级的开发依赖 / CLI / 类型与构建工具 |

官方 App changelog 只说明宿主升级；它没有表示所有 extension 都必须把 npm 依赖改成 `2.0.0` 才能继续运行。反过来，npm 包的大版本也不能拿来推断用户已经安装了 App 2.0。Raycast 的版本机制是：开发时由 `@raycast/api` 提供类型和 CLI，运行时 API 由 App 提供，App 会做兼容性检查。[Versioning 文档](https://developers.raycast.com/information/versioning)、[`@raycast/api@2.0.3` npm registry 元数据](https://registry.npmjs.org/@raycast%2fapi/2.0.3)

## 官方 2.0 变化中与仓库有关的部分

### 1. App、迁移与最低系统要求

- Raycast 2.0 于 **2026-08-19** 正式发布并替代 v1。已有 v2 Beta 数据保持不变；尚未导入 v1 数据的用户可在升级中导入；部分权限可能要重新授权。[2.0 changelog](https://www.raycast.com/changelog/macos-beta/2-0)
- macOS 最低要求是 **macOS Tahoe + Apple silicon**。这属于安装前置条件；源码仓库不能修复不满足要求的机器。[v2 Manual FAQ](https://manual.raycast.com/new-in-v2)
- 从 v1 迁移必须先使用 **Raycast App v1.104.16 或更高版本**。迁移是增量的，不会清空现有 v2 设置；转移 hotkeys 时会在 v1 中禁用它们，以免两个 App 抢占同一快捷键。[Import & Export Manual](https://manual.raycast.com/import-export)
- v2 架构改为 macOS 原生 Swift/AppKit host + React/TypeScript Web 前端 + 长驻 Node 后端 + Rust core；extension runtime 仍由 Node 后端负责。官方同时说明 extension API 原本就按可移植方式设计，并称 Store extension 安装时不再需要用户另行下载 Node。[技术深潜，2026-05-14 发布](https://www.raycast.com/blog/a-technical-deep-dive-into-the-new-raycast)

### 2. 本地 extension 的开发与导入

- 官方 Manual：Mac 上运行 `npm run dev` 时，会优先连接正在运行的 Raycast v2，否则回退到 v1；应安装 `@raycast/api@latest` 以获得这一行为。[Extensions Manual](https://manual.raycast.com/extensions)
- 官方 v2 FAQ：自定义 extension 要正确自动导入，v1 App 至少要到 `1.104.16`；未自动导入时运行 `npx @raycast/api@latest dev`。官方也明确建议开发者以后聚焦 v2，但官方 PR review 暂时仍可在 v1 上测试。[v2 Manual FAQ](https://manual.raycast.com/new-in-v2)
- 本仓库的 `pnpm run dev` 是有状态操作，会改变 Raycast 的开发运行态；因此不能用 CI build 代替 v2 实机导入测试，也不应在无人值守检查中调用。

### 3. `@raycast/api` 2.x 的 API / tooling 变化

官方在 2026-08-19 同日把 npm `latest` 更新为 `2.0.3`；这是一条**独立于 App 版本**的 major 线。对官方发布包 `1.104.25 → 2.0.3` 的公开类型和 manifest schema 比较显示：

- 现有常用 API 继续保留；`Toast.Style`、`Alert.ActionStyle` 等从 enum 的声明形态改成了同值的 const + type 形态，现有 `Toast.Style.Failure/Success` 用法不受影响。
- `environment` 新增通用的 `entryPointType`、`entryPointName`、`entryPointMode`；旧的 `commandName` / `commandMode` 仍保留但标记 deprecated。
- 明确可见的移除项包括 `Icon.Quicklink`、旧的 `KeyboardShortcut` 类型名（新包暴露 `KeyboardShortcutV1`），以及一批过时或重新映射的 `AI.Model` 成员。仓库没有使用这些符号。
- manifest / API 新增了 extension model-provider 等 AI 扩展能力，并新增如 `captureMemorySnapshot`、OAuth Client ID Metadata Document 支持。这些是机会型能力，不是本仓库两个 Finder / terminal utility extension 的需求。
- `2.0.3` 包要求开发机 Node `>=22.22.2`；当前工作站 Node 是 `v26.5.0`，满足要求。包的 React / Node 类型 peer 版本与仓库自定义的 pnpm peer 规则不同，升级 lockfile 时仍应以实际 `pnpm install --frozen-lockfile`、lint 和 build 结果为准。

来源：[`@raycast/api@1.104.25` 官方发布包](https://www.npmjs.com/package/@raycast/api/v/1.104.25?activeTab=code)、[`@raycast/api@2.0.3` 官方发布包](https://www.npmjs.com/package/@raycast/api/v/2.0.3?activeTab=code)、[`2.0.3` registry 元数据](https://registry.npmjs.org/@raycast%2fapi/2.0.3)。官方 Developer Docs 的 changelog / migration 页面截至本次访问尚未增加 2.x 专页；`@raycast/migration` 的官方 latest 仍是 `1.103.0`，所以不应假定存在 2.x codemod。[Migration 文档](https://developers.raycast.com/misc/migration)、[`@raycast/migration` 官方 npm 包](https://www.npmjs.com/package/@raycast/migration)

### 4. UI 和 runtime 风险

v2 的界面实现发生了大改，但本仓库所有 extension command 都是 `no-view`，不渲染 List / Grid / Form；风险主要落在：

- `showToast` / HUD 是否在 v2 正确显示；
- `getSelectedFinderItems()` 是否仍能从 Finder hotkey launch 中拿到 selection；
- Raycast v2 替代 v1 后 Automation / Accessibility 权限是否需要重新授权；
- `ray develop` / `ray build` 是否选择正确的 App 和配置目录；
- Script Command 的 Chrome Automation、参数传递和 silent mode 是否仍正常。

v2 Beta changelog 在正式发布前曾修复过 Script Command 参数、deeplink、silent script 关闭窗口、extension hotkey 和 Finder / UI 等问题，因此实机 smoke test 有价值；但这些记录没有引入新的 metadata 格式。[macOS v2 changelog](https://www.raycast.com/changelog/macos-beta)

## 仓库逐项判断

| 仓库项 | 判断 | 建议 |
| --- | --- | --- |
| `extensions/open-in-editor` | API 用法在 2.0.3 中仍存在；仅依赖 / CLI 落后一条 major | 升 `@raycast/api`，lint + build；在 v2 验证 Finder selection、Finder window fallback、VS Code / Zed / Codex 打开 |
| `extensions/terminal-finder` | API 用法在 2.0.3 中仍存在；macOS-only manifest 正确 | 升 `@raycast/api`，lint + build；在 v2 验证 Finder ↔ WezTerm / Ghostty 和 toast |
| `scripts/*.sh` | v2 Manual 仍使用 schemaVersion 1；现有 metadata 无需迁移 | 不改 metadata；升级 App 后逐个检查 Chrome Automation 和 7 个入口 |
| `raycast-source.json` | 是仓库自有消费合同，与 Raycast App / API 版本不是同一 schema | 不因为 2.0 改 `schemaVersion: 1` |
| README 的 source/runtime 边界 | 仍正确：App、权限、数据库和导入状态不属于仓库 | 暂不需要因 2.0 扩大仓库所有权 |

## 本地隔离验证

本次没有直接改两个 extension 的依赖，而是在临时副本中把它们分别升级到 `@raycast/api@2.0.3` 后验证：

- 两边的安装、`pnpm run lint` 和 `pnpm run build` 均通过；现有 TypeScript source 与 manifest 不需要修改。
- 2.0.3 重新生成的两份 `raycast-env.d.ts` 与仓库版本逐字节一致。
- 2.0.3 CLI 同时接受 `ray dev` 和现有的 `ray develop`（前者是后者的 alias），所以当前 `package.json` 的 `dev` script 不必改名。
- 7 个已提交 JS 入口会因新构建器而全部重生成；总字节数从 61,465 降到 21,788。这属于预期构建产物变化，不代表业务逻辑需要重写。
- 没有运行 `pnpm run dev` 或实际触发 Finder / Chrome / terminal 命令，因为它们会修改 Raycast 开发运行态或操作桌面应用；这正是升级依赖后仍需人工完成的 smoke test。

当前工作站本身已经是 `arm64`、macOS `27.0`，`/Applications/Raycast.app` 的 bundle version 是 `2.0.3.0`，因此本机已满足并完成 App 侧的 v2 安装；剩余本机工作主要是权限和命令行为核对。

## 建议执行顺序

1. **必须（本机，当前工作站已完成安装）**：确认迁移的数据完整，并按需重新授权 Automation / Accessibility 等权限。
2. **应该（仓库）**：两个 extension 都把 `@raycast/api` 固定到 `2.0.3`，分别刷新 pnpm lockfile，运行现有 lint / build 验证。
3. **应该（本机）**：维护者明确操作 `pnpm run dev`，确认开发 extension 导入稳定 v2；逐个运行 7 个 extension commands 与 7 个 Script Commands。
4. **暂不做**：不改 manifest shape、不改 Script Command schema、不改 `raycast-source.json` schema，也不为 AI model provider、跨平台 Windows 或新的 v2 UI 能力做无需求扩张。

最终判断：**有必要同步依赖和验证运行态；没有必要做业务重写。**
