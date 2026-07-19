#!/bin/bash

# LevelUp - Project Validation Script
# This script validates the project setup and code quality

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

echo "🔍 Validating LevelUp project..."
echo ""

ERRORS=0

# Check if package.json exists
if [ -f "package.json" ]; then
    print_success "package.json found"
else
    print_error "package.json not found"
    ERRORS=$((ERRORS + 1))
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_success "Dependencies installed"
else
    print_error "Dependencies not installed. Run: npm install"
    ERRORS=$((ERRORS + 1))
fi

# Run linting
echo ""
print_info "Running ESLint..."
if npm run lint > /dev/null 2>&1; then
    print_success "ESLint passed"
else
    print_error "ESLint failed"
    ERRORS=$((ERRORS + 1))
fi

# Check formatting
echo ""
print_info "Checking code formatting..."
if npm run format:check > /dev/null 2>&1; then
    print_success "Code formatting is correct"
else
    print_error "Code formatting issues found. Run: npm run format"
    ERRORS=$((ERRORS + 1))
fi

# Type checking
echo ""
print_info "Running TypeScript type check..."
if npm run typecheck > /dev/null 2>&1; then
    print_success "TypeScript type check passed"
else
    print_error "TypeScript type check failed"
    ERRORS=$((ERRORS + 1))
fi

# Summary
echo ""
if [ $ERRORS -eq 0 ]; then
    print_success "All validations passed! 🎉"
    exit 0
else
    print_error "$ERRORS validation(s) failed"
    exit 1
fi

