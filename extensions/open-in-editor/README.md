# Open in Editor

从 Finder 选中项目或当前窗口打开 VS Code、Zed Preview 或 Codex。选中多个项目时逐个打开；
VS Code 和 Zed Preview 请求新窗口。Codex 先打开目标，再发送包含该路径的新任务 deeplink。

## 依赖与权限

- macOS、Raycast，以及对应编辑器应用。Zed 命令使用 **Zed Preview**。
- VS Code 与 Zed Preview 使用应用包内 CLI，不依赖终端 PATH。
- 获取 Finder 选择 / 窗口可能需要在系统设置的「隐私与安全性 → 自动化」允许 Raycast 控制 Finder。

无选中项目时，仅回退到前台 Finder 窗口；没有窗口会提示无目标。应用未安装、Finder
AppleScript 权限错误或启动失败会显示失败提示。多选时如果中途失败，先前打开的项目仍保持打开。

## 开发

从完整仓库进入本目录：

```fish
pnpm install --frozen-lockfile
pnpm run lint
pnpm run build
pnpm run package:local
```

📦 验证 dist 构建并更新需要提交的本地 JS；本地打包依赖仓库 `tools/`。

```fish
pnpm run dev
```

🛠️ 显式导入并启用 Raycast 开发扩展。全仓检查与验收边界见 [开发说明](../../docs/development.md)。
