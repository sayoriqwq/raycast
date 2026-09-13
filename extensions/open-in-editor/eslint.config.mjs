import { defineConfig } from "eslint/config";
import raycastConfig from "@raycast/eslint-config";

export default defineConfig([
  { ignores: ["dist/**", "*.js", "raycast-env.d.ts"] },
  ...raycastConfig,
]);
