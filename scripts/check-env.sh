#!/bin/bash

# LevelUp - Environment Variables Check Script
# This script checks if all required environment variables are set

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

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

echo "🔍 Checking environment variables..."
echo ""

# Check backend .env
BACKEND_ENV="my-new-app/backend/.env"
BACKEND_ENV_EXAMPLE="my-new-app/backend/.env.example"

if [ -f "$BACKEND_ENV" ]; then
    print_success "Backend .env file exists"
    
    # Check required backend variables
    source "$BACKEND_ENV"
    
    REQUIRED_BACKEND_VARS=(
        "DATABASE_URL"
        "REDIS_URL"
        "JWT_SECRET"
        "PORT"
    )
    
    MISSING_BACKEND_VARS=()
    
    for var in "${REQUIRED_BACKEND_VARS[@]}"; do
        if [ -z "${!var}" ]; then
            MISSING_BACKEND_VARS+=("$var")
        fi
    done
    
    if [ ${#MISSING_BACKEND_VARS[@]} -eq 0 ]; then
        print_success "All required backend environment variables are set"
    else
        print_error "Missing backend environment variables:"
        for var in "${MISSING_BACKEND_VARS[@]}"; do
            echo "  - $var"
        done
    fi
else
    print_warning "Backend .env file not found"
    if [ -f "$BACKEND_ENV_EXAMPLE" ]; then
        print_info "Copy $BACKEND_ENV_EXAMPLE to $BACKEND_ENV and configure it"
    fi
fi

echo ""

# Check frontend .env
FRONTEND_ENV="my-new-app/.env"
FRONTEND_ENV_EXAMPLE="my-new-app/.env.example"

if [ -f "$FRONTEND_ENV" ]; then
    print_success "Frontend .env file exists"
    
    # Check required frontend variables
    source "$FRONTEND_ENV"
    
    REQUIRED_FRONTEND_VARS=(
        "API_URL"
    )
    
    MISSING_FRONTEND_VARS=()
    
    for var in "${REQUIRED_FRONTEND_VARS[@]}"; do
        if [ -z "${!var}" ]; then
            MISSING_FRONTEND_VARS+=("$var")
        fi
    done
    
    if [ ${#MISSING_FRONTEND_VARS[@]} -eq 0 ]; then
        print_success "All required frontend environment variables are set"
    else
        print_error "Missing frontend environment variables:"
        for var in "${MISSING_FRONTEND_VARS[@]}"; do
            echo "  - $var"
        done
    fi
else
    print_warning "Frontend .env file not found"
    if [ -f "$FRONTEND_ENV_EXAMPLE" ]; then
        print_info "Copy $FRONTEND_ENV_EXAMPLE to $FRONTEND_ENV and configure it"
    fi
fi

echo ""
print_info "Environment check complete!"

