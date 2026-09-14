import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { access, constants, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const json = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));
const manifest = await json("raycast-source.json");

function run(command, args, cwd = root, env = process.env) {
  const result = spawnSync(command, args, { cwd, env, stdio: "inherit" });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed`);
}

assert.equal(manifest.schemaVersion, 1);
const scripts = manifest.scriptCommands;
const declared = [...scripts.entrypoints, ...scripts.supportExecutables, ...scripts.supportFiles];
assert.equal(new Set(declared).size, declared.length, "Duplicate source paths");
for (const path of declared) {
  assert(path.startsWith("scripts/") && !path.split("/").includes(".."), `Invalid source path: ${path}`);
  assert(!manifest.excluded.includes(path), `Excluded source: ${path}`);
  await access(join(root, path));
}
for (const path of [...scripts.entrypoints, ...scripts.supportExecutables]) {
  await access(join(root, path), constants.X_OK);
  run("bash", ["-n", join(root, path)]);
}
for (const path of scripts.entrypoints) {
  const text = await readFile(join(root, path), "utf8");
  for (const key of ["schemaVersion", "title", "mode", "packageName", "description", "icon"]) {
    assert(new RegExp(`^# @raycast\\.${key} .+$`, "m").test(text), `${path}: missing ${key}`);
  }
  assert.match(text, /^# @raycast\.schemaVersion 1$/m);
  assert.match(text, /^# @raycast\.mode silent$/m);
  const references = [
    ...[...text.matchAll(/^# @raycast\.icon(?:Dark)? (.+)$/gm)].map((match) => match[1]),
    ...[...text.matchAll(/"\$SCRIPT_DIR\/([^"\n]+)"/g)].map((match) => match[1]),
  ];
  for (const reference of references) {
    const target = relative(root, resolve(root, dirname(path), reference));
    assert(declared.includes(target), `${path}: undeclared dependency ${target}`);
  }
}
// Catch a newly added command, config, runtime file or icon omitted from the whitelist.
for (const directory of ["scripts", "scripts/config", "scripts/icons", "scripts/lib"]) {
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    if (!entry.isFile() || !/\.(sh|json|png|js)$/.test(entry.name)) continue;
    const path = `${directory}/${entry.name}`;
    assert(declared.includes(path) || manifest.excluded.includes(path), `Undeclared asset: ${path}`);
  }
}
for (const path of scripts.supportFiles) {
  if (path.endsWith(".js")) run("node", ["--check", join(root, path)]);
  if (!path.endsWith(".json")) continue;
  const config = await json(path);
  assert(Array.isArray(config.targetList) && config.targetList.length > 0, `${path}: empty targets`);
  assert(config.targetList.every((target) => typeof target === "string" && /^[a-z0-9.-]+$/i.test(target)));
  const url = new URL(config.defaultURL);
  assert(["http:", "https:"].includes(url.protocol));
  assert(config.targetList.some((target) => url.hostname === target || url.hostname.endsWith(`.${target}`)));
}

for (const extension of manifest.extensions) {
  const cwd = join(root, extension.path);
  const pkg = await json(`${extension.path}/package.json`);
  assert.equal(pkg.name, extension.name);
  assert(pkg.categories.length > 0);
  for (const command of pkg.commands) {
    await access(join(cwd, "src", `${command.name}.ts`));
    await access(join(cwd, "assets", command.icon ?? pkg.icon));
  }
  run("pnpm", ["install", "--frozen-lockfile"], cwd);
  // Raycast 2.0.3 enables npm-only Store lockfile rules when CI=true.
  // Our pnpm lockfile is checked by the frozen install above; keep all other lint checks.
  run("pnpm", ["run", "lint"], cwd, { ...process.env, CI: "false" });
  const types = await readFile(join(cwd, "raycast-env.d.ts"));
  run("pnpm", ["run", "build"], cwd);
  run("pnpm", ["run", "package:local", "--check"], cwd);
  assert(types.equals(await readFile(join(cwd, "raycast-env.d.ts"))), `${pkg.name}: generated types were stale`);
}
run("node", ["--test", "tools/extensions.test.mjs", "tools/chrome-switch.test.mjs"]);
console.log("Source contract, syntax, lint, dist builds, local bundles and behavior checks passed.");
