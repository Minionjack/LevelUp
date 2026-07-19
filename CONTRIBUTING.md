# Contributing to LevelUp

Thank you for your interest in contributing to LevelUp! This document provides guidelines and instructions for contributing to the project.

## 🎯 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher
- PostgreSQL v14 or higher
- Redis v6 or higher
- Git

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/LevelUp.git
   cd LevelUp
   ```

2. **Install dependencies**

   ```bash
   make install
   # or
   npm run install:all
   ```

3. **Set up environment variables**

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

4. **Set up the database**

   ```bash
   make db-reset
   # or
   npm run migrate && npm run seed
   ```

5. **Start development servers**
   ```bash
   make dev
   # or
   npm run dev
   ```

## 📝 Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates
- `chore/description` - Maintenance tasks

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

**Examples:**

```
feat(backend): add user preferences API endpoint

fix(frontend): resolve habit completion state issue

docs: update API documentation
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Automatic code formatting
- **EditorConfig**: Consistent editor settings

Run linting and formatting:

```bash
npm run lint
npm run format
```

### Testing

- Write tests for all new features
- Maintain >90% code coverage
- Run tests before committing:
  ```bash
  npm test
  ```

### Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new features
   - Update documentation as needed

3. **Run checks**

   ```bash
   npm run lint
   npm run typecheck
   npm test
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat(scope): your commit message"
   ```

5. **Push and create PR**

   ```bash
   git push origin feature/your-feature-name
   ```

   Then create a Pull Request on GitHub.

6. **Address review feedback**
   - Make requested changes
   - Update commits if needed
   - Respond to comments

## 🧪 Testing Guidelines

### Unit Tests

- Test individual functions and components
- Mock external dependencies
- Aim for 100% coverage of critical paths

### Integration Tests

- Test API endpoints
- Test data flows
- Test component interactions

### E2E Tests

- Test complete user journeys
- Test critical workflows
- Test error scenarios

## 📚 Documentation

- Update README.md for user-facing changes
- Update API documentation for backend changes
- Add JSDoc comments for public functions
- Update CHANGELOG.md for significant changes

## 🐛 Reporting Bugs

Use GitHub Issues with:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

## 💡 Suggesting Features

Use GitHub Discussions or Issues with:

- Clear description of the feature
- Use case and motivation
- Proposed implementation (if applicable)
- Examples or mockups (if applicable)

## 🔍 Code Review Guidelines

### For Authors

- Keep PRs focused and small
- Write clear commit messages
- Respond to feedback promptly
- Test thoroughly before requesting review

### For Reviewers

- Be constructive and respectful
- Focus on code quality and correctness
- Check for tests and documentation
- Approve when satisfied

## 📋 Checklist for Contributors

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Type checking passes
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete

## 🎉 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Credited in release notes
- Appreciated by the community!

Thank you for contributing to LevelUp! 🚀
