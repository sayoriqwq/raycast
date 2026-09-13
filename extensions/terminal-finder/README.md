# Terminal Finder

Finder ↔ WezTerm / Ghostty 的四个导航命令。Finder 方向取第一个选中项目，无选择时取前台
Finder 窗口；请选中目录。WezTerm 方向读取 CLI 返回的活动 pane；没有活动标记时取第一项。

## 依赖与权限

- macOS、Raycast 和对应终端应用。
- WezTerm CLI 从用户登录 shell 的 PATH 查找。Finder → WezTerm 在 CLI 不可用时尝试按
  bundle ID 打开应用；应用打开也失败时显示错误。
- Ghostty → Finder 要求支持 AppleScript 的 Ghostty 1.3.0+、启用 AppleScript、存在活动终端，
  当前查询按 `/Applications/Ghostty.app` 定位。参见 [Ghostty 官方说明](https://ghostty.org/docs/features/applescript)。
- 在系统设置「隐私与安全性 → 自动化」允许 Raycast 控制 Finder / Ghostty。

Ghostty 查询或 Finder 打开失败时显示原始错误，**不会向终端输入命令或模拟回车**，
也不再需要 System Events 键盘模拟的辅助功能权限。不会自动迁移或修改已有权限设置。
旧版 Ghostty 不再提供模拟输入兼容路径。

WezTerm 的本地 `file://` 目录 URL 使用 Node `fileURLToPath` 解码，支持空格、中文和特殊字符；
远程主机 URL 会报错，不能作为本机路径打开。终端处于 SSH 或交互程序时，报告的目录可能
不同于程序内部目录，需以终端自身提供的信息为准。

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
