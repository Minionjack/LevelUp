# Development Guide

This guide provides comprehensive information for developers working on the LevelUp project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Debugging](#debugging)
- [Troubleshooting](#troubleshooting)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **PostgreSQL**: v14 or higher
- **Redis**: v6 or higher
- **Git**: Latest version

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Minionjack/LevelUp.git
   cd LevelUp
   ```

2. **Run setup script**

   ```bash
   ./scripts/setup.sh
   # or
   make setup
   ```

3. **Configure environment variables**

   ```bash
   # Backend
   cd my-new-app/backend
   cp .env.example .env
   # Edit .env with your database credentials

   # Frontend
   cd ../..
   cd my-new-app
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Set up database**

   ```bash
   make db-reset
   ```

5. **Start development servers**
   ```bash
   make dev
   ```

## 📁 Project Structure

```
LevelUp/
├── .github/              # GitHub workflows and templates
├── .husky/               # Git hooks
├── .vscode/              # VS Code settings
├── docs/                 # Project documentation
├── scripts/              # Utility scripts
├── my-new-app/           # Main application
│   ├── app/             # Expo Router screens
│   ├── components/      # Reusable UI components
│   ├── src/             # Source code
│   │   ├── contexts/   # React contexts
│   │   ├── screens/    # Screen components
│   │   ├── services/   # API services
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utility functions
│   └── backend/         # Backend API
│       ├── src/        # Backend source
│       │   ├── config/ # Configuration
│       │   ├── routes/ # API routes
│       │   ├── types/  # TypeScript types
│       │   └── utils/  # Utility functions
│       └── scripts/    # Database scripts
└── package.json         # Root package.json (workspace)
```

## 🔄 Development Workflow

### Daily Workflow

1. **Pull latest changes**

   ```bash
   git pull origin develop
   ```

2. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and test**

   ```bash
   # Run tests
   npm test

   # Check linting
   npm run lint

   # Format code
   npm run format
   ```

4. **Commit changes**

   ```bash
   git add .
   git commit -m "feat(scope): your commit message"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Available Commands

```bash
# Development
make dev              # Start all development servers
make dev:backend      # Start backend only
make dev:frontend     # Start frontend only

# Building
make build            # Build all projects
make build:backend    # Build backend
make build:frontend   # Build frontend

# Testing
make test             # Run all tests
make test:backend     # Run backend tests
make test:frontend    # Run frontend tests

# Code Quality
make lint             # Run linting
make lint-fix         # Fix linting issues
make format           # Format code
make typecheck        # Type check

# Database
make migrate          # Run migrations
make seed             # Seed database
make db-reset         # Reset database (migrate + seed)
```

## 📝 Code Standards

### TypeScript

- Use TypeScript strict mode
- Define types for all functions and components
- Avoid `any` type (use `unknown` if necessary)
- Use interfaces for object shapes
- Use enums for constants

### Code Style

- Follow ESLint rules (Airbnb configuration)
- Use Prettier for formatting
- Maximum line length: 80 characters
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings (configurable)

### Naming Conventions

- **Files**: kebab-case (`user-service.ts`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions/Variables**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserData`)

### File Organization

- One component/function per file
- Group related files in directories
- Use index files for exports
- Keep files focused and small (<300 lines)

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend

# With coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new features
- Aim for >90% code coverage
- Test edge cases and error scenarios
- Use descriptive test names
- Keep tests independent and isolated

### Test Structure

```typescript
describe("FeatureName", () => {
  describe("methodName", () => {
    it("should do something when condition", () => {
      // Arrange
      const input = "test";

      // Act
      const result = methodName(input);

      // Assert
      expect(result).toBe("expected");
    });
  });
});
```

## 🐛 Debugging

### Backend Debugging

1. **VS Code Debugger**
   - Use "Debug Backend" configuration
   - Set breakpoints in TypeScript files
   - Inspect variables and call stack

2. **Console Logging**

   ```typescript
   console.log("Debug info:", data);
   console.error("Error:", error);
   ```

3. **Postman/Insomnia**
   - Test API endpoints
   - Inspect request/response
   - Test authentication

### Frontend Debugging

1. **React Native Debugger**
   - Use React DevTools
   - Inspect component tree
   - View Redux state

2. **Expo DevTools**
   - View logs
   - Reload app
   - Inspect network requests

3. **Console Logging**
   ```typescript
   console.log("Debug info:", data);
   console.warn("Warning:", warning);
   ```

## 🔧 Troubleshooting

### Common Issues

#### Dependencies Installation Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Issues

- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check database exists
- Verify user permissions

#### Redis Connection Issues

- Check Redis is running
- Verify REDIS_URL in .env
- Test connection: `redis-cli ping`

#### Port Already in Use

```bash
# Find process using port
lsof -i :4000

# Kill process
kill -9 <PID>
```

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run typecheck
```

### Getting Help

- Check [Documentation](./README.md)
- Review [Contributing Guide](../CONTRIBUTING.md)
- Search [GitHub Issues](https://github.com/Minionjack/LevelUp/issues)
- Ask in [Discussions](https://github.com/Minionjack/LevelUp/discussions)

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Fastify Docs](https://www.fastify.io/docs/latest/)
- [Expo Docs](https://docs.expo.dev/)

---

**Happy Coding!** 🚀
