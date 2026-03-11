## todo.md

> 状态：implemented（待 Raycast 内手测）
> 目标：为 `extensions/terminal-finder` 增加 Ghostty 双向支持，并移除系统里已安装的第三方 Terminal Finder 扩展
> 范围：`extensions/terminal-finder/`；系统目录 `~/.config/raycast/extensions/0428188d-1388-4143-a8ed-760a3136153f`

### 已确认信息

- 当前自研扩展仅支持 WezTerm：
  `finder-to-wezterm`、`wezterm-to-finder`
- 系统中已安装的第三方同类扩展为：
  `~/.config/raycast/extensions/0428188d-1388-4143-a8ed-760a3136153f`
  作者：`yedongze`
- 本机 Ghostty 安装路径：
  `/Applications/Ghostty.app`
- 本机 Ghostty bundle id：
  `com.mitchellh.ghostty`
- 本机 Ghostty 版本：
  `1.3.0`
- Ghostty 1.3.0 官方已提供 AppleScript 能力，但当前系统的 LaunchServices 对 `Ghostty` 名称与 bundle id 解析异常；实现必须提供回退路径，不能只依赖名字寻址。

### checklist

- [x] P0. 识别当前扩展与系统中第三方扩展的位置
- [x] P1. 将本次任务写入 `tasks/todo.md`，作为唯一执行计划
- [x] P2. 为 `terminal-finder` 设计 Ghostty 支持方案
  - `Finder -> Ghostty`：优先复用 Raycast `open` 打开指定目录到 Ghostty，避免依赖 shell 当前目录
  - `Ghostty -> Finder`：优先尝试读取 Ghostty 当前目录；若运行环境受限，则回退为向前台 Ghostty 输入 `open -a Finder ./`
- [x] P3. 修改 `extensions/terminal-finder/package.json`
  - 新增 `finder-to-ghostty`
  - 新增 `ghostty-to-finder`
  - 更新描述与构建脚本，确保扩展根目录生成 4 个可执行 JS
- [x] P4. 抽取共享辅助逻辑并新增 Ghostty 命令源码
  - 复用 Finder 当前路径读取逻辑
  - 避免 WezTerm/Ghostty 逻辑重复散落
- [x] P5. 补齐 Ghostty 图标资源
- [x] P6. 构建验证
  - `cd extensions/terminal-finder && pnpm run build`
  - 确认根目录存在：
    `finder-to-wezterm.js`
    `wezterm-to-finder.js`
    `finder-to-ghostty.js`
    `ghostty-to-finder.js`
- [x] P7. 删除系统里第三方 Terminal Finder 扩展目录
- [x] P8. 在 `tasks/todo.md` 记录结果与残留验证项

### 验收标准

- [ ] A1. Raycast 中可看到 4 个 Terminal Finder 命令
- [ ] A2. `Finder -> Ghostty` 可把当前 Finder 目录交给 Ghostty 打开
- [ ] A3. `Ghostty -> Finder` 可从 Ghostty 当前目录回到 Finder；若原生读取失败，至少能通过回退路径工作
- [x] A4. `pnpm run build` 成功，且扩展根目录存在 4 个命令 JS 文件
- [x] A5. 第三方扩展目录 `0428188d-1388-4143-a8ed-760a3136153f` 已从系统中移除

### results

- 已新增 2 个 Ghostty 命令：
  - `finder-to-ghostty`
  - `ghostty-to-finder`
- 已抽取共享 Finder 路径读取逻辑到 `src/finder.ts`
- `ghostty-to-finder` 采用双路径：
  - 优先读取 Ghostty AppleScript `working directory`
  - 失败时回退为向前台 Ghostty 输入 `open -a Finder ./`
- 已新增资源文件：
  `extensions/terminal-finder/assets/ghostty.png`
- 已执行构建：
  `cd /Users/sayori/Desktop/raycast/extensions/terminal-finder && pnpm run build`
- 已确认生成：
  - `finder-to-wezterm.js`
  - `wezterm-to-finder.js`
  - `finder-to-ghostty.js`
  - `ghostty-to-finder.js`
- 已删除系统中第三方扩展目录：
  `~/.config/raycast/extensions/0428188d-1388-4143-a8ed-760a3136153f`
- 尚未在 Raycast GUI 内逐个手测命令，因此 A1-A3 仍需你实际点一次确认
