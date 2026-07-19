/**
 * Lint-staged configuration for LevelUp
 * Runs linters and formatters on staged files before commit
 */
module.exports = {
  // TypeScript and JavaScript files
  "**/*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],

  // JSON files
  "**/*.json": ["prettier --write"],

  // Markdown files
  "**/*.md": ["prettier --write"],

  // CSS and style files
  "**/*.{css,scss,less}": ["prettier --write"],
};
