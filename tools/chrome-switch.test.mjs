import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../scripts/lib/chrome-switch.js", import.meta.url), "utf8");

function load(windows = []) {
  const shell = [];
  const application = {
    windows: () => windows,
    activate() {},
    running: () => true,
    Tab: (tab) => tab,
  };
  const Application = () => application;
  Application.currentApplication = () => ({ doShellScript: (command) => shell.push(command) });
  const context = { Application, ObjC: { import() {} } };
  runInNewContext(source, context);
  context.loadConfig = () => ({ targetList: ["chatgpt.com"], defaultURL: "https://chatgpt.com" });
  return { context, shell };
}

function windowWith(urls, mode = "normal") {
  const items = urls.map((url) => ({ url: () => url }));
  const tabs = () => items;
  tabs.push = (tab) => items.push(tab);
  return { mode: () => mode, tabs };
}

test("target matching accepts subdomains and rejects lookalikes", () => {
  const { context } = load();
  for (const url of ["https://chatgpt.com", "https://WWW.CHATGPT.COM/?q=1", "https://foo.chatgpt.com#x"]) {
    assert.equal(context.matchesTargetURL(url, ["chatgpt.com"]), true);
  }
  for (const url of ["", "https://evilchatgpt.com", "https://chatgpt.com.evil.test", "https://evil.test/chatgpt.com", "file://chatgpt.com"]) {
    assert.equal(context.matchesTargetURL(url, ["chatgpt.com"]), false);
  }
});

test("automation tabs are excluded from preferred new-tab windows", () => {
  const { context } = load();
  for (const url of ["", "devtools://devtools", "chrome://extensions", "about:blank", "data:text/html,hi", "http://localhost:3000", "http://127.0.0.1", "http://[::1]:3000"]) {
    assert.equal(context.looksLikeAutomationURL(url), true);
  }
  assert.equal(context.looksLikeAutomationURL("https://example.com"), false);
});

test("an existing target is focused without opening a new tab", () => {
  const target = windowWith(["https://example.com", "https://chatgpt.com/c/1"]);
  const { context, shell } = load([windowWith(["https://other.test"]), target]);
  context.run(["config.json"]);
  assert.equal(target.activeTabIndex, 2);
  assert.equal(target.index, 1);
  assert.equal(target.tabs().length, 2);
  assert.equal(shell.length, 0);
});

test("new tabs prefer a normal window containing a human page", () => {
  const dev = windowWith(["devtools://devtools"]);
  const popup = windowWith(["https://example.com"], "popup");
  const normal = windowWith(["https://example.org"]);
  const { context } = load([dev, popup, normal]);
  context.run(["config.json"]);
  assert.equal(normal.tabs().length, 2);
  assert.equal(dev.tabs().length, 1);
  assert.equal(popup.tabs().length, 1);
});

test("no-window and no-human-window fallback behavior stays explicit", () => {
  const empty = load();
  empty.context.run(["config.json"]);
  assert.equal(empty.shell.length, 1);
  const dev = windowWith(["devtools://devtools"]);
  const { context } = load([dev]);
  context.run(["config.json"]);
  // Existing compatibility behavior: with no preferred window, use the first window.
  assert.equal(dev.tabs().length, 2);
});
