#!/bin/bash

# LevelUp - Development Environment Setup Script
# This script sets up the development environment for the LevelUp project

set -e

echo "🚀 LevelUp - Setting up development environment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    print_success "npm installed: $NPM_VERSION"
else
    print_error "npm is not installed. Please install npm v8 or higher."
    exit 1
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    print_success "PostgreSQL installed"
else
    print_warning "PostgreSQL not found. Please ensure PostgreSQL v14+ is installed."
fi

# Check Redis
if command -v redis-cli &> /dev/null; then
    print_success "Redis installed"
else
    print_warning "Redis not found. Please ensure Redis v6+ is installed."
fi

echo ""
echo "Installing dependencies..."

# Install root dependencies
if [ -f "package.json" ]; then
    print_info "Installing root dependencies..."
    npm install
    print_success "Root dependencies installed"
else
    print_error "package.json not found in root directory"
    exit 1
fi

# Install frontend dependencies
if [ -d "my-new-app" ]; then
    if [ -f "my-new-app/package.json" ]; then
        print_info "Installing frontend dependencies..."
        cd my-new-app
        npm install
        cd ..
        print_success "Frontend dependencies installed"
    else
        print_info "Frontend package.json not found, skipping..."
    fi
else
    print_info "Frontend directory not found, skipping..."
fi

# Install backend dependencies
if [ -d "my-new-app/backend" ]; then
    if [ -f "my-new-app/backend/package.json" ]; then
        print_info "Installing backend dependencies..."
        cd my-new-app/backend
        npm install
        cd ../..
        print_success "Backend dependencies installed"
    else
        print_info "Backend package.json not found, skipping..."
    fi
else
    print_info "Backend directory not found, skipping..."
fi

echo ""
print_info "Setting up git hooks..."
if [ -d ".git" ]; then
    npx husky install || print_warning "Husky setup failed, but continuing..."
    print_success "Git hooks configured"
else
    print_info "Not a git repository, skipping git hooks..."
fi

echo ""
print_success "Setup complete! 🎉"
echo ""
print_info "Next steps:"
echo "  1. Configure environment variables:"
echo "     - Copy my-new-app/backend/.env.example to my-new-app/backend/.env"
echo "     - Copy my-new-app/.env.example to my-new-app/.env"
echo "  2. Set up the database:"
echo "     - Run: make db-reset"
echo "     - Or: npm run migrate && npm run seed"
echo "  3. Start development:"
echo "     - Run: make dev"
echo "     - Or: npm run dev"
echo ""
