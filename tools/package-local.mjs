import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const extensionDirectory = process.cwd();
const check = process.argv.includes("--check");
const manifest = JSON.parse(await readFile(join(extensionDirectory, "package.json"), "utf8"));
const outputDirectory = await mkdtemp(join(tmpdir(), `${manifest.name}-`));

try {
  const result = spawnSync("ray", ["build", "-I", "-e", "dev", "-o", outputDirectory], {
    cwd: extensionDirectory,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
  } else {
    await Promise.all(
      manifest.commands.map(async ({ name }) => {
        const generated = join(outputDirectory, `${name}.js`);
        const committed = join(extensionDirectory, `${name}.js`);
        if (check) {
          const [expected, actual] = await Promise.all([readFile(generated), readFile(committed)]);
          if (!expected.equals(actual)) {
            throw new Error(`${name}.js is stale; run pnpm run package:local in ${manifest.name}`);
          }
        } else {
          await copyFile(generated, committed);
        }
      }),
    );
  }
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}
