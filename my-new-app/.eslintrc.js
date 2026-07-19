const path = require("path");

/**
 * ESLint configuration for the LevelUp frontend (Expo/React Native).
 * Self-contained (root: true) so it doesn't merge with the backend's
 * Node-focused config through directory-cascade merging.
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["expo", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint"],
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
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    // eslint-config-expo expects @typescript-eslint v7+/v8 for these two
    // rules; this project is pinned to v6.13.1 (see Phase 3 notes on
    // upgrading @typescript-eslint). Disabled rather than left erroring
    // with "rule definition not found" on every file.
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-wrapper-object-types": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  },
  ignorePatterns: [".eslintrc.js"],
};
