# 开发与验证

## 入口约定

保留两个 extension、七个 Script Commands 与各自的 pnpm leaf workspace。
依赖安装独立；本地打包和全仓检查由 `tools/` 提供，需保留完整仓库目录。

| 入口 | 作用 | 输出 / 副作用 |
| --- | --- | --- |
| `node tools/check.mjs`（仓库根目录） | 全仓验收，与 CI 相同 | 安装 leaf 依赖、生成 dist、检查本地 JS 和类型、运行模拟测试 |
| `pnpm run lint`（extension 目录） | Raycast manifest、图标与 ESLint 检查 | 不导入扩展 |
| `pnpm run build` | `ray build -I -e dist -o dist` | 分发构建输出至 `dist/` |
| `pnpm run package:local` | 既有 `ray build -I -e dev` 本地布局 | 更新根目录 command JS |
| `pnpm run package:local --check` | 在临时目录重建并逐字节比较 | JS 不一致时失败，不覆盖根目录 JS |
| `pnpm run dev` | `ray develop` | 导入 / 更新本机 Raycast 开发扩展并进入监听 |

全仓检查需要 Node 26.5.0、pnpm 12.3.4、Git checkout 和 Bash；CI 使用 macOS runner。
检查不启动 Raycast、不控制 Finder / Chrome / 终端，也不授予权限。首次安装和 CLI 的
manifest 验证可能访问网络。类型生成文件和 JS 都应与源码一起审阅；`dist/` 不提交。

## 修改后的流程

```fish
cd extensions/terminal-finder
pnpm install --frozen-lockfile
pnpm run package:local
cd ../..
node tools/check.mjs
```

🔎 刷新已提交入口，再运行与 CI 一致的验收；编辑器扩展使用相同流程。

需要启用或调试扩展时，在对应 extension 目录运行：

```fish
pnpm run dev
```

🛠️ 显式导入并启动 Raycast 开发会话；检查通过不代表已经启用这一版。

Script Commands 在 Raycast 的 Script Commands 设置中添加部署目录。下游仍须按
`raycast-source.json` 白名单部署；不要把维护工具或整个仓库暴露给 Raycast。

## 本轮对齐的官方说明

核对日期：2026-09-14。

- [Best Practices](https://developers.raycast.com/information/best-practices)：处理预期错误、提示运行依赖。本轮收口编辑器 / WezTerm 启动失败，Finder AppleScript 权限错误保留原始信息；Ghostty 读取失败不再模拟输入。
- [CLI](https://developers.raycast.com/information/developer-tools/cli)：将 dist 验收与本地 dev 打包、开发导入区分。继续提交根目录 JS 是本仓库的消费约定，非官方 Store 要求。
- [Manifest](https://developers.raycast.com/information/manifest)：补齐 `categories: ["Developer Tools"]`，保持 macOS 和 no-view 模式。
- [Toast](https://developers.raycast.com/api-reference/feedback/toast)：窗口关闭时自动回退为 HUD，因此继续使用 Toast。
- [ESLint](https://developers.raycast.com/information/developer-tools/eslint)：两个扩展直接使用官方 `@raycast/eslint-config`，包含 Raycast 专用插件规则；移除 Antfu，使用 Prettier 默认格式。`pnpm run lint` 同时验证 ESLint 和 Prettier，`pnpm run lint:fix` 调用官方 `ray lint --fix` 修复源码。仅排除生成文件，不忽略手写源码。

## 验证边界

自动化测试直接加载已打包的 extension JS，替换 Raycast API 和子进程；JXA 测试替换
Chrome 对象。覆盖启动失败、Finder 空选择和权限失败、Ghostty 无输入注入、WezTerm
URL 解码、域名匹配和窗口选择。这些检查不能代替真实应用兼容性和 TCC 权限验收。

本机 smoke test：三个编辑器各验证选中项目与 Finder 空选择 / 当前窗口；两个终端各验证
双向导航、未运行 / 未安装、无活动窗口和权限拒绝。对 Ghostty 还应验证目录读取失败后
终端输入保持不变；WezTerm 验证含空格、中文、`#`、`%` 的路径。

Chrome 的既有兼容策略保持：无匹配 tab 时优先选择含普通网页的 normal 窗口；
没有候选但仍有窗口时使用第一个窗口。此行为已加入回归测试，不保证完全隔离自动化窗口。
