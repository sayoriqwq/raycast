# Raycast 配置源码

这个仓库保存适合 Git 审阅和固定版本消费的 Raycast 源码资产。它不保存 Raycast 的应用内
数据库，也不尝试把账号、快捷键、扩展安装状态或其他可变数据变成普通 dotfiles。

## 仓库资产

| 路径 | 内容 | 所有权 |
| --- | --- | --- |
| `scripts/` | 7 个 Chrome navigation Script Commands、共享运行文件及 8 个品牌图标 | 本仓库 |
| `extensions/open-in-editor/` | Finder → VS Code、Zed Nightly、Codex | 本仓库 |
| `extensions/terminal-finder/` | Finder ↔ WezTerm / Ghostty | 本仓库 |
| `raycast-source.json` | 下游可消费的机器可读源码合同 | 本仓库 |

`raycast-source.json` 是稳定的消费入口。它以仓库根目录为基准，分别列出：

- `scriptCommands.entrypoints`：Raycast 应索引的 7 个入口脚本；
- `scriptCommands.supportExecutables`：入口调用的可执行支持文件；
- `scriptCommands.supportFiles`：配置和 JXA 运行文件；
- `extensions`：本地 extension 的源码目录；
- `excluded`：消费者必须排除的资产；当前为空。

消费者必须固定 Git commit，并按 manifest 的白名单复制或链接文件；不要直接暴露整个
`scripts/` 目录。

## Script Commands

7 个 active entrypoint 都是薄 wrapper，共享 `scripts/chrome-switch.sh`、
`scripts/lib/chrome-switch.js`、各自的 JSON 配置和 `scripts/icons/` 中的本地图标。所有相对路径
都以 manifest 所列出的目录结构为合同，部署时必须保持该结构。图标固定在源码 revision 中，
Script Commands 不依赖运行时网络获取图标。

Gemini Notebook 继续使用 `notebook-switch.sh` 作为稳定入口路径，显示名和默认地址分别为
`Gemini Notebook (Switch or Open)` 与 `https://notebook.google.com/`。配置仍匹配旧的
`notebooklm.google.com`，仅用于切换尚未重定向的既有标签页；应用内 alias `llm` 不属于源码合同。

`Toggle DB Tunnel` 与 `Yume (Switch or Open)` 已从源码和 manifest 删除，不得由消费者恢复、
打包或加入 activation；其中 DB tunnel 也不得引入 `autossh`、SSH/secret 配置或网络连接。

## 本地 extensions

两个 extension 是相互独立的 pnpm leaf workspace，没有根 workspace。分别在对应目录验证：

```fish
pnpm install --frozen-lockfile
pnpm run lint
pnpm run build
```

例如：

```fish
cd extensions/open-in-editor
pnpm install --frozen-lockfile
pnpm run lint
pnpm run build
```

构建后，`package.json` 中每个 `commands[].name` 都必须在 extension 根目录生成对应的
`<name>.js`。这些 JS 是 Raycast 本地 extension 的可执行入口，不能只验证 TypeScript source
而忽略它们。

`pnpm run dev` 会调用 `ray develop` 并修改本机 Raycast 的开发运行态，因此不属于自动化检查；
只有维护者明确要求本机导入或开发会话时才运行。

## Source / runtime 边界

本仓库可以拥有：

- Script Command、extension source、图标、公开配置和构建材料；
- 后续经审阅加入的 Snippets / Quicklinks seed；
- 面向固定 revision 消费者的 manifest 与开发文档。

本仓库不拥有：

- Raycast Settings、aliases、hotkeys、favorites 或 installed-extension registry；
- `~/.config/raycast`、`~/Library/Application Support/com.raycast.macos` 或 preferences database；
- 账号、OAuth、API token、Keychain、Cloud Sync、AI、Clipboard、Notes、历史与缓存；
- TCC、Accessibility、Automation、登录项或应用安装渠道；
- tunnel PID/log、SSH 配置、私钥、生产端点或其他网络状态。

这些运行态只能通过 Raycast 官方 UI、人工 import/export、Keychain 或独立数据流程管理。
固定本仓库 revision 不代表已经 build、import、publish 或激活任何 Raycast 配置。
