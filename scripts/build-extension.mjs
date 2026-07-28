import { copyFile, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const extensionDirectory = process.cwd();
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
      manifest.commands.map(({ name }) =>
        copyFile(join(outputDirectory, `${name}.js`), join(extensionDirectory, `${name}.js`)),
      ),
    );
  }
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}
