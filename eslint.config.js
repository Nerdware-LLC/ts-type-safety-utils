import eslintJS from "@eslint/js";
import stylisticPlugin from "@stylistic/eslint-plugin";
import vitestPlugin from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import-x";
import nodePlugin from "eslint-plugin-n";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  ///////////////////////////////////////////////////////////////////
  // ALL FILES
  {
    files: ["src/**/*.ts", "./*.[tj]s"],
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": tsEslint.plugin,
      "import-x": importPlugin,
      "n": nodePlugin,
    },
    settings: {
      "import-x/extensions": [".ts", ".js"],
      "import-x/parsers": {
        "@typescript-eslint/parser": [".ts", ".js"],
      },
      "import-x/resolver": {
        node: { extensions: [".ts", ".js"] },
        typescript: { project: ["tsconfig.json"] },
      },
    },
    rules: {
      // MERGE PRESETS:
      ...stylisticPlugin.configs.customize(
        { semi: true, quotes: "double", arrowParens: true, braceStyle: "1tbs" } // prettier-ignore
      ).rules,
      ...eslintJS.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
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
          "groups": ["builtin", "external", "internal", "parent", "sibling", "type"], // prettier-ignore
          "alphabetize": { order: "asc", orderImportKind: "desc" },
          "newlines-between": "never",
        },
      ],

      // RULES: n (eslint-plugin-n)
      "n/no-missing-import": "off", // Does not work with path aliases
      "n/no-process-env": "error",
      "n/no-unpublished-import": ["error", { allowModules: ["type-fest"] }],

      // RULES: @typescript-eslint (typescript-eslint)
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/prefer-nullish-coalescing": "off",

      // RULES: eslint-config-prettier (must be last to remove rules that conflict with prettier)
      ...eslintConfigPrettier.rules,
    },
  },
  ////////////////////////////////////////////////////////////////
  // TEST FILES
  {
    files: ["src/**/*.{test,spec}.[tj]s"],
    languageOptions: {
      globals: vitestPlugin.environments.env.globals,
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "warn",
      "vitest/valid-expect": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
  ///////////////////////////////////////////////////////////////////
);
