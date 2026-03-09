## todo.md

> 状态：implemented（待你手测 P6 功能测试）
> 目标：创建 Raycast 扩展 `open-in-editor`，替代官方 "Open in Visual Studio Code" 插件，支持多 IDE 打开 Finder 中的文件/文件夹
> 范围：`extensions/open-in-editor/` 目录

### 背景

当前使用官方 "Open in Visual Studio Code" 插件，仅支持 VSCode/VSCodium/Cursor。用户同时使用多个 IDE，需要一个统一扩展覆盖所有 IDE，每个 IDE 在 Raycast 中有独立命令（可单独搜索、分配快捷键）。

### 已确认的关键信息

**IDE Bundle ID 与 CLI（已在本机验证）：**

| IDE | Bundle ID | CLI 命令 |
|---|---|---|
| Visual Studio Code | `com.microsoft.VSCode` | `code` |
| Zed | `dev.zed.Zed` | `zed` |
| Kiro | `dev.kiro.desktop` | `kiro` |
| Antigravity | `com.google.antigravity` | `antigravity` |
| Cursor | `com.todesktop.230313mzl4w4u92` | - |

**核心逻辑（从官方 Open in VSCode 插件 index.js 逆向确认）：**

1. 调用 `getSelectedFinderItems()` 获取 Finder 中选中的文件/文件夹
2. 若有选中项 -> 逐个用 `open(path, application)` 打开
3. 若无选中项 -> 通过 AppleScript 获取当前 Finder 窗口路径 -> `open(path, application)`
4. 应用通过 `getApplications()` + `bundleId` 匹配查找
5. 未安装时 -> Toast 提示

**项目约束（来自 lessons.md）：**

- `commands[].name` 必须与构建产物 JS 文件名一致
- 构建脚本参考 counter 扩展的模式：`ray build -e dev -o .ray-build && cp .ray-build/*.js .`

### 架构设计

单扩展多命令模式（一个扩展注册 N 个 command，每个对应一个 IDE）：

```
extensions/open-in-editor/
├── package.json           # 注册 4 个 command，每个 IDE 一个
├── tsconfig.json
├── src/
│   ├── lib.ts             # 共享逻辑：获取 Finder 路径 + 打开应用
│   ├── open-in-vscode.ts  # 入口：调用 lib，传入 VSCode bundleId
│   ├── open-in-zed.ts
│   ├── open-in-kiro.ts
│   └── open-in-antigravity.ts
└── assets/
    ├── icon.png           # 扩展主 icon
    ├── vscode.png         # 各命令独立 icon
    ├── zed.png
    ├── kiro.png
    └── antigravity.png
```

### checklist

- [x] P0. 创建 `extensions/open-in-editor/package.json`
  - `commands` 数组注册 4 个 `no-view` 命令：`open-in-vscode`、`open-in-zed`、`open-in-kiro`、`open-in-antigravity`
  - 每个 command 指定独立 `icon` 字段（如 `"icon": "vscode.png"`）
  - 每个 command 的 `title` 分别为 "Open in VSCode"、"Open in Zed"、"Open in Kiro"、"Open in Antigravity"
  - `dependencies`：`@raycast/api: "latest"`
  - `devDependencies`：`@types/node: "latest"`, `@types/react: "^19.2.14"`, `typescript: "latest"`
  - `scripts.build`：`ray build -e dev -o .ray-build && cp .ray-build/open-in-*.js .`
  - `platforms`: `["macOS"]`

- [x] P1. 创建 `extensions/open-in-editor/tsconfig.json`
  - 复用 counter 扩展的 tsconfig 配置

- [x] P2. 创建 `extensions/open-in-editor/src/lib.ts`
  - 导出 `openInEditor(bundleId: string, appName: string): Promise<void>`
  - 内部流程：
    1. `getApplications()` 匹配 bundleId，未找到则 `showToast` 报错并 return
    2. `getSelectedFinderItems()` 获取选中项
    3. 若有选中项 -> 对每个 `open(item.path, app)`
    4. 若无选中项 -> AppleScript 获取当前 Finder 窗口路径 -> `open(path, app)`
    5. 两者都失败 -> `showToast` 提示 "No Finder items or window selected"
  - AppleScript 获取路径的脚本（已从官方插件确认）：
    ```applescript
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        set finderWindow to window 1
        set finderWindowPath to (POSIX path of (target of finderWindow as alias))
        return finderWindowPath
      end tell
    else
      error "Could not get the selected Finder window"
    end if
    ```

- [x] P3. 创建 4 个入口文件（每个约 5 行）
  - `src/open-in-vscode.ts` -> 默认导出调用 `openInEditor("com.microsoft.VSCode", "Visual Studio Code")`
  - `src/open-in-zed.ts` -> 默认导出调用 `openInEditor("dev.zed.Zed", "Zed")`
  - `src/open-in-kiro.ts` -> 默认导出调用 `openInEditor("dev.kiro.desktop", "Kiro")`
  - `src/open-in-antigravity.ts` -> 默认导出调用 `openInEditor("com.google.antigravity", "Antigravity")`

- [x] P4. 准备 icon 资源（从各 .app 的 icns 用 sips 转换为 512px PNG）
  - 从各 IDE 的 `/Applications/XXX.app/Contents/Resources/` 提取 icns 并转为 PNG
  - 命令：`sips -s format png /Applications/XXX.app/Contents/Resources/AppIcon.icns --out assets/xxx.png --resampleWidth 512`
  - 扩展主 icon 可复用其中一个或用通用编辑器图标

- [x] P5. 安装依赖 & 构建验证
  - `cd extensions/open-in-editor && pnpm install`
  - `pnpm run build`
  - 验证：确认 `open-in-vscode.js`、`open-in-zed.js`、`open-in-kiro.js`、`open-in-antigravity.js` 均生成在扩展根目录

- [ ] P6. 功能测试
  - 在 Finder 中选中文件 -> 触发各命令 -> 对应 IDE 打开
  - 在 Finder 中不选中任何文件 -> 触发命令 -> 对应 IDE 打开当前窗口目录
  - IDE 未安装时 -> 显示 Toast 错误提示

### 验收标准

- [ ] A1. Raycast 中可搜索到 "Open in VSCode"、"Open in Zed"、"Open in Kiro"、"Open in Antigravity" 四个独立命令
- [ ] A2. 每个命令正确打开 Finder 选中项或当前窗口目录到对应 IDE
- [x] A3. `pnpm run build` 成功且在扩展根目录生成所有命令的 JS 文件
- [ ] A4. 未安装的 IDE 触发时显示友好的 Toast 提示
- [ ] A5. 不破坏现有 counter 扩展的功能

### results

- P0-P5 全部完成，构建通过（2026-03-09）
- 4 个 JS 产物已确认生成在扩展根目录：`open-in-vscode.js`、`open-in-zed.js`、`open-in-kiro.js`、`open-in-antigravity.js`
- Icon 从各 IDE .app bundle 提取，512px PNG
- 待你手测：P6 功能测试 + 卸载官方 "Open in Visual Studio Code" 插件
