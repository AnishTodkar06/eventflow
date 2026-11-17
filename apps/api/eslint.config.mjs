import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "coverage/**",
  ]),

  {
    files: ["src/**/*.ts", "test/**/*.ts"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
