# chrome-switch.js 架构说明

## 功能

通用的 Chrome tab 切换器：聚焦已有的目标 tab，或新建一个。通过 JSON 配置文件驱动，可复用于不同站点（ChatGPT、Claude 等）。

## 文件结构

```
scripts/
├── chatgpt-switch.sh          # Raycast 入口，指定 config 路径
├── chrome-switch.sh            # 通用 shell 包装，调用 JXA 脚本
├── lib/
│   └── chrome-switch.js        # 核心逻辑（JXA）
└── config/
    └── chatgpt-switch.json     # ChatGPT 的匹配规则和默认 URL
```

## 配置格式

```json
{
  "targetList": ["chatgpt.com", "chat.openai.com"],
  "defaultURL": "https://chatgpt.com"
}
```

- `targetList`：域名匹配列表，支持子域名（如 `xxx.chatgpt.com` 也会匹配）
- `defaultURL`：无匹配 tab 时打开的 URL

## 核心逻辑（三条分支）

```
┌──────────────────────┐
│  遍历所有窗口和 tab  │
│  查找匹配 targetList │
└──────┬───────────────┘
       │
       ├─ 找到匹配 tab ──→ 聚焦该窗口 + 切换到该 tab
       │
       ├─ 未找到，但有窗口 ──→ 在候选窗口中 push 新 tab
       │
       └─ 未找到，且 0 窗口 ──→ open -a 直接带 URL 打开
```

### 分支 1：聚焦已有 tab

```javascript
window.activeTabIndex = tabIndex + 1;  // JXA tab 索引从 1 开始
window.index = 1;                       // 将窗口置顶
```

### 分支 2：在已有窗口中新建 tab

```javascript
candidateWindow.tabs.push(Chrome.Tab({ url: config.defaultURL }));
candidateWindow.activeTabIndex = candidateWindow.tabs().length;
candidateWindow.index = 1;
```

候选窗口选择逻辑：优先选第一个包含"人类 tab"的普通窗口，过滤掉 DevTools、localhost 等自动化窗口。

### 分支 3：无窗口时直接打开

```javascript
System.doShellScript('open -a "Google Chrome" "url"');
```

不用 JXA 的 `Chrome.Window().make()`，避免默认 tab 闪烁问题。

## 关键设计决策

| 决策 | 原因 |
|------|------|
| 用 `open -a` 而非 `make()` 创建窗口 | 避免默认 tab 闪烁和 `delay()` 崩溃 |
| 用 `$.NSThread.sleepForTimeInterval` 而非 `System.delay` | JXA 的 `delay()` 在特定上下文下会 -1708 |
| 过滤 DevTools/localhost 窗口 | 避免在自动化窗口中打开 tab |
| hostname 精确匹配 + 子域名匹配 | 兼容 `chatgpt.com` 和 `xxx.chatgpt.com` |
| 配置与逻辑分离 | 同一套 JS 可服务多个站点 |

## 添加新站点

1. 创建 `config/xxx-switch.json`
2. 创建 `xxx-switch.sh`（复制 `chatgpt-switch.sh`，改 config 路径）
3. 在 Raycast 中配置快捷键
