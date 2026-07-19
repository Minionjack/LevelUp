#!/bin/bash

# LevelUp - API Test Script
# Tests the backend API endpoints

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

API_URL="${API_URL:-http://localhost:4000}"
API_PREFIX="${API_PREFIX:-/api/v1}"

echo "🧪 Testing LevelUp API..."
echo "API URL: ${API_URL}"
echo ""

# Test health endpoint
print_info "Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "${API_URL}/health" || echo -e "\n000")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    print_success "Health check passed (HTTP $HTTP_CODE)"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    print_error "Health check failed (HTTP $HTTP_CODE)"
    echo "$BODY"
    exit 1
fi

echo ""

# Test API info endpoint
print_info "Testing API info endpoint..."
INFO_RESPONSE=$(curl -s -w "\n%{http_code}" "${API_URL}${API_PREFIX}" || echo -e "\n000")
HTTP_CODE=$(echo "$INFO_RESPONSE" | tail -n1)
BODY=$(echo "$INFO_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    print_success "API info endpoint passed (HTTP $HTTP_CODE)"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    print_error "API info endpoint failed (HTTP $HTTP_CODE)"
    echo "$BODY"
fi

echo ""
print_success "API tests complete!"
