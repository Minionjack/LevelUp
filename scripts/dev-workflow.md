# LevelUp Development Workflow Guide

## 🚀 Quick Start

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Minionjack/LevelUp.git
   cd LevelUp
   ```

2. **Run setup script**

   ```bash
   ./scripts/setup.sh
   ```

3. **Configure environment**
   - Update `my-new-app/backend/.env` with your database credentials
   - Update `my-new-app/.env` with your frontend configuration

4. **Set up database**

   ```bash
   npm run migrate
   npm run seed
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

## 📋 Daily Development Workflow

### Starting Your Day

1. **Pull latest changes**

   ```bash
   git pull origin main
   ```

2. **Check system health**

   ```bash
   ./scripts/health-check.sh
   ```

3. **Install any new dependencies**

   ```bash
   npm run install:all
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

### During Development

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following the style guide
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**

   ```bash
   # Run all tests
   npm test

   # Run API tests
   ./scripts/test-api.sh

   # Check types
   npm run typecheck

   # Lint code
   npm run lint
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Pre-commit hooks will automatically:
   - Run ESLint
   - Format code with Prettier
   - Run type checking
   - Run lint-staged checks

### Before Pushing

1. **Run full test suite**

   ```bash
   npm test
   npm run test:coverage
   ```

2. **Check code quality**

   ```bash
   npm run lint
   npm run format:check
   npm run typecheck
   ```

3. **Push to remote**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🔧 Common Tasks

### Running Tests

```bash
# All tests
npm test

# Backend only
npm run test:backend

# Frontend only
npm run test:frontend

# With coverage
npm run test:coverage

# API integration tests
./scripts/test-api.sh
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run typecheck
```

### Database Operations

```bash
# Run migrations
npm run migrate

# Seed database
npm run seed

# Reset database
npm run db:reset
```

### Building

```bash
# Build all
npm run build

# Backend only
npm run build:backend

# Frontend only
npm run build:frontend
```

## 🐛 Debugging

### Backend Debugging

1. **Check backend logs**

   ```bash
   cd my-new-app/backend
   npm run dev
   ```

2. **Test API endpoints**

   ```bash
   ./scripts/test-api.sh
   ```

3. **Check database**
   ```bash
   psql -h localhost -U your_user -d levelup_db
   ```

### Frontend Debugging

1. **Check Expo logs**

   ```bash
   cd my-new-app
   npm start
   ```

2. **Use React Native Debugger**
   - Press `Cmd+D` (iOS) or `Cmd+M` (Android)
   - Select "Debug"

### Health Checks

```bash
# Full system health check
./scripts/health-check.sh

# Check API health
curl http://localhost:4000/health
```

## 📝 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:

```bash
git commit -m "feat: add user profile editing"
git commit -m "fix: resolve habit completion bug"
git commit -m "docs: update API documentation"
```

## 🔄 Git Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `fix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### Pull Request Process

1. **Create PR** from your feature branch to `develop`
2. **Ensure all checks pass**:
   - Tests pass
   - Code coverage maintained
   - Linting passes
   - Type checking passes
3. **Request review** from team members
4. **Address feedback** and update PR
5. **Merge** after approval

## 🧪 Testing Strategy

### Unit Tests

- Test individual functions and components
- Located in `*.test.ts` or `*.spec.ts` files
- Run with: `npm test`

### Integration Tests

- Test API endpoints and data flows
- Located in `*.integration.test.ts` files
- Run with: `npm run test:integration`

### E2E Tests

- Test complete user journeys
- Located in `e2e/` directory
- Run with: `npm run test:e2e`

## 📊 Code Quality Standards

### Coverage Requirements

- Backend: >95% coverage
- Frontend: >90% coverage
- Critical paths: 100% coverage

### Performance Targets

- API response time: <200ms
- App cold start: <2 seconds
- Screen transitions: <1 second

## 🚨 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Find process using port
lsof -i :4000

# Kill process
kill -9 <PID>
```

**Database connection failed**

```bash
# Check PostgreSQL is running
pg_isready

# Check connection string in .env
cat my-new-app/backend/.env | grep DATABASE_URL
```

**Dependencies out of sync**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Type errors**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run typecheck
```

## 📚 Additional Resources

- [Style Guide](../docs/sprints/sprint-1/01-style-guide.md)
- [Testing Strategy](../docs/sprints/sprint-1/02-testing-strategy.md)
- [API Documentation](../docs/technical/api-documentation.md)
- [Project Summary](../docs/PROJECT_SUMMARY.md)

## 🤝 Getting Help

- Check documentation in `/docs`
- Review existing code for examples
- Ask team members for guidance
- Create an issue on GitHub for bugs

---

**Last Updated**: January 2025  
**Maintained by**: LevelUp Development Team
