/**
 * Prettier configuration for LevelUp
 * Consistent code formatting across the project
 */
module.exports = {
  // Basic formatting
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // Object and array formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",

  // End of line
  endOfLine: "lf",

  // File-specific overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 100,
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
  ],
};
