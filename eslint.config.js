import eslintJS from "@eslint/js";
import stylisticPlugin from "@stylistic/eslint-plugin";
import vitestPlugin from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import {
  importX as importXPlugin,
  createNodeResolver,
} from "eslint-plugin-import-x";
import nodePlugin from "eslint-plugin-n";
import globals from "globals";
import tsEslint from "typescript-eslint";

// Shared constants:
const PARSED_EXTENSIONS = [".ts", ".js"];

export default defineConfig(
  /////////////////////////////////////////////////////////////////////////////
  // GLOBAL CONFIGS
  {
    name: "global/ignores",
    ignores: ["**/node_modules/", "**/coverage/", "**/dist/"],
  },
  {
    name: "global/languageOptions",
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "global/linterOptions",
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    name: "global/plugins",
    plugins: {
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": tsEslint.plugin,
      "import-x": importXPlugin,
      "n": nodePlugin,
      "vitest": vitestPlugin,
    },
    settings: {
      ...importXPlugin.configs.typescript.settings,
      "import-x/extensions": PARSED_EXTENSIONS,
      "import-x/parsers": {
        "@typescript-eslint/parser": PARSED_EXTENSIONS,
      },
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
        createNodeResolver({ extensions: PARSED_EXTENSIONS }),
      ],
    },
  },
  /////////////////////////////////////////////////////////////////////////////
  // ALL FILES
  {
    name: "files:all/base",
    files: ["src/**/*.ts", "./*.[tj]s"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // MERGE PRESETS:
      ...stylisticPlugin.configs.customize(
        { semi: true, quotes: "double", arrowParens: true, braceStyle: "1tbs" } // prettier-ignore
      ).rules,
      ...eslintJS.configs.recommended.rules,
      ...importXPlugin.configs.recommended.rules,
      ...importXPlugin.configs.typescript.rules,
      ...nodePlugin.configs["flat/recommended-module"].rules,
      ...[
        ...tsEslint.configs.strictTypeChecked,
        ...tsEslint.configs.stylisticTypeChecked, // prettier-ignore
      ].reduce((acc, { rules = {} }) => ({ ...acc, ...rules }), {}),

      // RULE CUSTOMIZATIONS:

      // RULES: eslint (builtin)
      "default-case": "error", //      switch-case statements must have a default case
      "default-case-last": "error", // switch-case statements' default case must be last
      "eqeqeq": ["error", "always"],
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
      "prefer-const": ["warn", { destructuring: "all" }],
      "prefer-object-has-own": "error",
      "prefer-promise-reject-errors": "error",

      /* RULES: import-x (eslint-plugin-import-x)
      As recommended by typescript-eslint, the following import-x rules are disabled because they
      degrade performance and TypeScript provides the same checks as part of standard type checking.
      https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import */
      "import-x/default": "off",
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off",
      "import-x/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal", "parent", ["index", "sibling"], "type"], // prettier-ignore
          "alphabetize": { order: "asc", orderImportKind: "desc" },
          "newlines-between": "never",
        },
      ],

      // RULES: n (eslint-plugin-n)
      "n/no-missing-import": ["error", { ignoreTypeImport: true }],
      "n/no-process-env": "error",
      "n/no-unpublished-import": ["error", { ignoreTypeImport: true }],

      // RULES: @typescript-eslint (typescript-eslint)
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/prefer-nullish-coalescing": "off",

      // RULES: eslint-config-prettier (must be last to remove rules that conflict with prettier)
      ...eslintConfigPrettier.rules,
    },
  },
  /////////////////////////////////////////////////////////////////////////////
  // TEST FILES
  {
    files: ["src/**/*.{test,spec}.[tj]s"],
    languageOptions: {
      globals: vitestPlugin.environments.env.globals,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "vitest/consistent-test-it": ["error", { fn: "test" }],
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "warn",
      "vitest/valid-expect": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  }
  /////////////////////////////////////////////////////////////////////////////
);
