import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";

const require = createRequire(import.meta.url);

// Exercise the shipped command bundles without launching Raycast or desktop apps.
async function loadCommand(name, overrides = {}) {
  const opened = [];
  const toasts = [];
  const dependencies = {
    "@raycast/api": {
      Toast: { Style: { Failure: "failure", Success: "success" } },
      showToast: async (toast) => toasts.push(toast),
      open: async (...args) => opened.push(args),
      getSelectedFinderItems: async () => [{ path: "/tmp/project" }],
      getApplications: async () => [],
      ...overrides.api,
    },
    "node:child_process": {
      execFileSync: () => { throw new Error("CLI unavailable"); },
      spawnSync: () => ({ status: 0 }),
      ...overrides.process,
    },
    "node:fs": { existsSync: () => true },
    "node:os": { userInfo: () => ({ shell: "/bin/zsh" }) },
  };
  const module = { exports: {} };
  const source = await readFile(new URL(`../extensions/${name}.js`, import.meta.url), "utf8");
  runInNewContext(source, {
    module, Error, URL,
    require: (id) => dependencies[id] ?? require(id),
  });
  await module.exports.default();
  return { opened, toasts };
}

test("editor commands report launch failures through feedback", async () => {
  for (const [command, bundleId] of [
    ["open-in-vscode", "com.microsoft.VSCode"],
    ["open-in-zed-preview", "dev.zed.Zed-Preview"],
    ["open-in-codex", "com.openai.codex"],
  ]) {
    const { toasts } = await loadCommand(`open-in-editor/${command}`, {
      api: {
        getApplications: async () => [{ bundleId, path: "/Applications/Editor.app" }],
        open: async () => { throw new Error("CLI unavailable"); },
      },
    });
    assert.equal(toasts.length, 1);
    assert.equal(toasts[0].style, "failure");
    assert.equal(toasts[0].message, "CLI unavailable");
  }
});

test("missing editor produces an actionable message", async () => {
  const { toasts } = await loadCommand("open-in-editor/open-in-vscode");
  assert.equal(toasts[0].title, "Visual Studio Code is not installed");
});

test("WezTerm decodes local directory URLs and rejects remote URLs", async () => {
  for (const cwd of [pathToFileURL("/tmp/中文 folder/#100%").href, "file://remote/tmp/project"]) {
    const { opened, toasts } = await loadCommand("terminal-finder/wezterm-to-finder", {
      process: {
        execFileSync: (_file, args) => args[0] === "-lc"
          ? "/usr/local/bin/wezterm"
          : JSON.stringify([{ cwd, is_active: true }]),
      },
    });
    if (cwd.includes("remote")) {
      assert.equal(opened.length, 0);
      assert.equal(toasts[0].style, "failure");
    } else {
      assert.equal(opened[0][0], "/tmp/中文 folder/#100%");
      assert.equal(toasts[0].style, "success");
    }
  }
});

test("WezTerm falls back to the application when its CLI is unavailable", async () => {
  const { opened, toasts } = await loadCommand("terminal-finder/finder-to-wezterm");
  assert.equal(opened[0][1], "com.github.wez.wezterm");
  assert.equal(toasts[0].style, "success");
});

test("failed WezTerm fallback reports failure without a success notification", async () => {
  const { toasts } = await loadCommand("terminal-finder/finder-to-wezterm", {
    api: { open: async () => { throw new Error("WezTerm is not installed"); } },
  });
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].style, "failure");
  assert.equal(toasts[0].message, "WezTerm is not installed");
});

test("Finder distinguishes empty selection from Automation failure", async () => {
  for (const name of ["terminal-finder/finder-to-wezterm", "terminal-finder/finder-to-ghostty", "open-in-editor/open-in-vscode"]) {
    for (const denied of [false, true]) {
      const { opened, toasts } = await loadCommand(name, {
        api: {
          getApplications: async () => [{ bundleId: "com.microsoft.VSCode", path: "/Applications/Code.app" }],
          getSelectedFinderItems: async () => [],
        },
        process: {
          execFileSync: () => {
            if (denied) throw new Error("Not authorized to send Apple events to Finder (-1743)");
            return "";
          },
        },
      });
      assert.equal(opened.length, 0);
      assert.equal(toasts[0].style, "failure");
      if (denied) assert.match(toasts[0].message, /-1743/);
      else assert.equal(toasts[0].title, "No Finder items or window selected");
    }
  }
});

test("Ghostty failures never inject input into the terminal", async () => {
  for (const phase of ["read", "open"]) {
    const scripts = [];
    const { toasts } = await loadCommand("terminal-finder/ghostty-to-finder", {
      process: {
        execFileSync: (file, args) => {
          assert.equal(file, "/usr/bin/osascript");
          scripts.push(args[1]);
          if (phase === "read") throw new Error("Automation denied (-1743)");
          return "/tmp/project";
        },
      },
      api: { open: async () => { throw new Error("Finder unavailable"); } },
    });
    assert.equal(scripts.length, 1);
    assert.doesNotMatch(scripts[0], /System Events|keystroke|key code|input text/);
    assert.equal(toasts.length, 1);
    assert.equal(toasts[0].style, "failure");
  }
});

test("Ghostty opens its reported directory in Finder", async () => {
  const { opened, toasts } = await loadCommand("terminal-finder/ghostty-to-finder", {
    process: { execFileSync: () => "/tmp/project" },
  });
  assert.equal(opened[0][0], "/tmp/project");
  assert.equal(opened[0][1], "com.apple.finder");
  assert.equal(toasts[0].style, "success");
});
