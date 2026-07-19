#!/usr/bin/env node

/**
 * Environment Validation Script
 * Validates environment variables for the LevelUp project
 *
 * @module scripts/validate-env
 */

const fs = require("fs");
const path = require("path");

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

function printSuccess(message) {
  console.log(`${GREEN}✅ ${message}${RESET}`);
}

function printError(message) {
  console.log(`${RED}❌ ${message}${RESET}`);
}

function printInfo(message) {
  console.log(`${YELLOW}ℹ️  ${message}${RESET}`);
}

/**
 * Check if file exists
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Load environment variables from .env file
 */
function loadEnvFile(filePath) {
  if (!fileExists(filePath)) {
    return {};
  }

  const content = fs.readFileSync(filePath, "utf8");
  const env = {};

  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts
          .join("=")
          .trim()
          .replace(/^["']|["']$/g, "");
      }
    }
  });

  return env;
}

/**
 * Validate backend environment
 */
function validateBackendEnv() {
  const backendEnvPath = path.join(__dirname, "../my-new-app/backend/.env");
  const backendEnvExamplePath = path.join(
    __dirname,
    "../my-new-app/backend/.env.example"
  );

  printInfo("Validating backend environment...");

  if (!fileExists(backendEnvPath)) {
    printError("Backend .env file not found");
    if (fileExists(backendEnvExamplePath)) {
      printInfo("Copy .env.example to .env and configure it");
    }
    return false;
  }

  const env = loadEnvFile(backendEnvPath);
  const requiredVars = ["DATABASE_URL", "REDIS_URL", "JWT_SECRET", "PORT"];

  let isValid = true;
  requiredVars.forEach((varName) => {
    if (!env[varName] || env[varName].trim() === "") {
      printError(`Missing or empty: ${varName}`);
      isValid = false;
    } else {
      printSuccess(`${varName} is set`);
    }
  });

  return isValid;
}

/**
 * Validate frontend environment
 */
function validateFrontendEnv() {
  const frontendEnvPath = path.join(__dirname, "../my-new-app/.env");
  const frontendEnvExamplePath = path.join(
    __dirname,
    "../my-new-app/.env.example"
  );

  printInfo("Validating frontend environment...");

  if (!fileExists(frontendEnvPath)) {
    printError("Frontend .env file not found");
    if (fileExists(frontendEnvExamplePath)) {
      printInfo("Copy .env.example to .env and configure it");
    }
    return false;
  }

  const env = loadEnvFile(frontendEnvPath);
  const requiredVars = ["API_URL"];

  let isValid = true;
  requiredVars.forEach((varName) => {
    if (!env[varName] || env[varName].trim() === "") {
      printError(`Missing or empty: ${varName}`);
      isValid = false;
    } else {
      printSuccess(`${varName} is set`);
    }
  });

  return isValid;
}

/**
 * Main validation function
 */
function main() {
  console.log("🔍 Validating LevelUp environment variables...\n");

  const backendValid = validateBackendEnv();
  console.log("");
  const frontendValid = validateFrontendEnv();

  console.log("");
  if (backendValid && frontendValid) {
    printSuccess("All environment variables are valid! 🎉");
    process.exit(0);
  } else {
    printError("Environment validation failed");
    process.exit(1);
  }
}

// Run validation
main();
