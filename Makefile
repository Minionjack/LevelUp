.PHONY: help install dev build test lint clean migrate seed db-reset

# Default target
help:
	@echo "LevelUp - Development Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make install       - Install all dependencies"
	@echo "  make dev           - Start development servers (backend + frontend)"
	@echo "  make build         - Build all projects"
	@echo "  make test          - Run all tests"
	@echo "  make lint          - Run linting"
	@echo "  make format        - Format code with Prettier"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make migrate       - Run database migrations"
	@echo "  make seed          - Seed database"
	@echo "  make db-reset      - Reset database (migrate + seed)"
	@echo "  make typecheck     - Run TypeScript type checking"

# Install dependencies
install:
	@echo "Installing all dependencies..."
	npm install
	cd my-new-app && npm install || true
	cd my-new-app/backend && npm install || true

# Development
dev:
	@echo "Starting development servers..."
	npm run dev

# Build
build:
	@echo "Building all projects..."
	npm run build

# Testing
test:
	@echo "Running all tests..."
	npm test

test-backend:
	@echo "Running backend tests..."
	npm run test:backend

test-frontend:
	@echo "Running frontend tests..."
	npm run test:frontend

# Linting
lint:
	@echo "Running linters..."
	npm run lint

lint-fix:
	@echo "Fixing linting issues..."
	npm run lint:fix

# Formatting
format:
	@echo "Formatting code..."
	npm run format

# Type checking
typecheck:
	@echo "Running TypeScript type check..."
	npm run typecheck

# Clean
clean:
	@echo "Cleaning build artifacts..."
	npm run clean
	rm -rf node_modules
	rm -rf my-new-app/node_modules
	rm -rf my-new-app/backend/node_modules

# Database
migrate:
	@echo "Running database migrations..."
	npm run migrate

seed:
	@echo "Seeding database..."
	npm run seed

db-reset: migrate seed
	@echo "Database reset complete!"

# Setup (first time)
setup: install
	@echo "Setting up development environment..."
	@echo "Please configure your .env files:"
	@echo "  - my-new-app/backend/.env"
	@echo "  - my-new-app/.env"
	@echo ""
	@echo "Then run: make db-reset"

