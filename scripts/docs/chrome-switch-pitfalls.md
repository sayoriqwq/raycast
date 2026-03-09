# chrome-switch.js 踩坑记录

## 问题背景

需求：通过 Raycast 快捷键切换到 Chrome 中已有的目标 tab，若不存在则新建一个。

核心实现使用 JXA（JavaScript for Automation）操控 Chrome。以下记录了调试过程中遇到的三个坑及其根因。

---

## 坑 1：`System.delay()` 在 0 窗口时崩溃

**现象**：Chrome 运行但 0 个窗口时，脚本报错 `-1708`（信息无法识别）并退出。

**根因**：JXA 的 `System.delay()` 是 AppleScript Standard Additions 提供的命令，底层依赖 Apple Event 分发机制。在某些上下文下（如 Chrome 刚执行 `make new window` 后），当前应用无法正确处理该事件，导致 `-1708`。

**错误代码**：
```javascript
Chrome.Window().make();
System.delay(0.1);  // ← 这里炸了
```

**修复**：用 ObjC Foundation 层的线程睡眠替代，绕开 Apple Event：
```javascript
$.NSThread.sleepForTimeInterval(0.1);
```

**教训**：JXA 中 `delay()` 不可靠，涉及等待一律用 `$.NSThread.sleepForTimeInterval()`。

---

## 坑 2：`Chrome.Window().make()` 自带默认 tab

**现象**：新建窗口后 `push` 目标 tab，结果窗口里出现两个 tab——一个默认的 `chrome://newtab`，一个 ChatGPT。

**根因**：`Chrome.Window().make()` 创建的窗口自带一个默认 new-tab 页。`tabs.push()` 是在此基础上追加，不会替换已有 tab。

**错误代码**：
```javascript
Chrome.Window().make();
candidateWindow.tabs.push(Chrome.Tab({ url: config.defaultURL }));
// 结果：2 个 tab
```

**临时修复**（引入了坑 3）：
```javascript
Chrome.Window().make();
candidateWindow.tabs()[0].url = config.defaultURL;
// 结果：1 个 tab，但会闪烁
```

---

## 坑 3：先创建再改 URL 导致页面闪烁

**现象**：新建窗口后修改默认 tab 的 URL，用户会看到一个从 `chrome://newtab` 跳转到目标页面的加载过程。

**根因**：`Chrome.Window().make()` 创建窗口时，默认 tab 已经开始渲染 `chrome://newtab`。之后再设置 `tabs()[0].url = targetURL`，本质是导航跳转，Chrome 会走完整的页面卸载→加载流程，视觉上就是一次闪烁。

**错误代码**：
```javascript
Chrome.Window().make();
$.NSThread.sleepForTimeInterval(0.1);
candidateWindow.tabs()[0].url = config.defaultURL;  // ← 闪烁
```

**最终修复**：0 窗口时不用 JXA 创建窗口，改用 `open -a` 命令直接带 URL 打开，Chrome 会创建一个从一开始就加载目标 URL 的窗口：
```javascript
System.doShellScript('open -a "Google Chrome" "https://chatgpt.com"');
```

---

## 总结

| 方案 | 默认 tab | 闪烁 | 可靠性 |
|------|----------|------|--------|
| `make()` + `push()` | 会残留 | 无 | `delay` 可能崩溃 |
| `make()` + 改 URL | 无残留 | 有闪烁 | `delay` 可能崩溃 |
| `open -a` 带 URL | 无残留 | 无闪烁 | 稳定 |

最终方案：**0 窗口时用 `open -a`，有窗口时用 `tabs.push()`**。
