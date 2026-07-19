#!/bin/bash

# LevelUp - Health Check Script
# Comprehensive health check for the entire system

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

echo "🏥 LevelUp Health Check"
echo ""

ERRORS=0

# Check Node.js
print_info "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js: $NODE_VERSION"
else
    print_error "Node.js not found"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
print_info "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    print_success "npm: $NPM_VERSION"
else
    print_error "npm not found"
    ERRORS=$((ERRORS + 1))
fi

# Check PostgreSQL
print_info "Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    print_success "PostgreSQL installed"
    if pg_isready -q; then
        print_success "PostgreSQL is running"
    else
        print_error "PostgreSQL is not running"
        ERRORS=$((ERRORS + 1))
    fi
else
    print_error "PostgreSQL not found"
    ERRORS=$((ERRORS + 1))
fi

# Check Redis
print_info "Checking Redis..."
if command -v redis-cli &> /dev/null; then
    print_success "Redis installed"
    if redis-cli ping &> /dev/null; then
        print_success "Redis is running"
    else
        print_error "Redis is not running"
        ERRORS=$((ERRORS + 1))
    fi
else
    print_error "Redis not found"
    ERRORS=$((ERRORS + 1))
fi

# Check backend
print_info "Checking backend..."
if [ -d "my-new-app/backend" ]; then
    if [ -f "my-new-app/backend/package.json" ]; then
        print_success "Backend directory exists"
        if [ -d "my-new-app/backend/node_modules" ]; then
            print_success "Backend dependencies installed"
        else
            print_error "Backend dependencies not installed"
            ERRORS=$((ERRORS + 1))
        fi
    else
        print_error "Backend package.json not found"
        ERRORS=$((ERRORS + 1))
    fi
else
    print_error "Backend directory not found"
    ERRORS=$((ERRORS + 1))
fi

# Check frontend
print_info "Checking frontend..."
if [ -d "my-new-app" ]; then
    if [ -f "my-new-app/package.json" ]; then
        print_success "Frontend directory exists"
        if [ -d "my-new-app/node_modules" ]; then
            print_success "Frontend dependencies installed"
        else
            print_error "Frontend dependencies not installed"
            ERRORS=$((ERRORS + 1))
        fi
    else
        print_error "Frontend package.json not found"
        ERRORS=$((ERRORS + 1))
    fi
else
    print_error "Frontend directory not found"
    ERRORS=$((ERRORS + 1))
fi

# Check API endpoint (if backend is running)
print_info "Checking API endpoint..."
API_URL="${API_URL:-http://localhost:4000}"
if curl -s -f "${API_URL}/health" &> /dev/null; then
    print_success "API is responding"
else
    print_error "API is not responding (backend may not be running)"
    ERRORS=$((ERRORS + 1))
fi

echo ""
if [ $ERRORS -eq 0 ]; then
    print_success "All health checks passed! 🎉"
    exit 0
else
    print_error "$ERRORS health check(s) failed"
    exit 1
fi
