/**
 * ESLint configuration for the LevelUp backend
 * Self-contained (root: true) so it doesn't inherit the frontend's
 * Expo/React lint rules through directory-cascade merging.
 */
const path = require("path");

module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-unresolved": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: path.join(__dirname, "tsconfig.eslint.json"),
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", "*.config.js", ".eslintrc.js"],
};
