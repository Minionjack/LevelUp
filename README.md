# LevelUp - Adaptive Self-Improvement Game

> **LevelUp turns your goals into an adventure. It adapts to who you want to be, guides you daily, and lets you see the real progress in your life — from habits and mindset to finances and style. Stop wishing, start becoming.**

## 🎯 Project Overview

LevelUp is a pioneering adaptive self-improvement game that transforms daily habits and personal growth into an engaging, RPG-like experience. Built with React Native and a robust backend API, it provides personalized guidance, gamified progress tracking, and real-world transformation tools.

### Key Features

- **🎮 Gamified Experience**: RPG-like progression with XP, levels, and achievements
- **🧠 AI-Powered Coaching**: Personalized guidance and insights
- **📊 Progress Tracking**: Visual progress indicators and analytics
- **🎯 Habit Management**: Smart habit creation and tracking
- **📝 Journaling**: AI-enhanced reflection and goal setting
- **🏆 Quest System**: Challenging missions for personal growth
- **📱 Offline-First**: Works seamlessly without internet connection
- **♿ Accessibility**: WCAG 2.1 AA compliant design

## 🏗️ Architecture

### Tech Stack

#### Frontend (React Native)

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI Components**: Custom design system
- **Testing**: Jest + React Native Testing Library + Detox

#### Backend (Node.js)

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT
- **Testing**: Jest + Supertest

#### Infrastructure

- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Documentation**: Comprehensive docs in `/docs`
- **Code Quality**: ESLint + Prettier

### Project Structure

```
Self-help/
├── docs/                          # Project documentation
│   └── sprints/                   # Sprint documentation
│       ├── README.md              # Sprint documentation guide
│       ├── sprint-1/              # Backend API Development
│       │   ├── 01-style-guide.md  # Enhanced style guide
│       │   ├── 02-testing-strategy.md # Testing strategy
│       │   └── 03-sprint-plan.md  # Sprint 1 plan
│       └── sprint-2/              # Frontend-Backend Integration
│           └── 01-sprint-plan.md  # Sprint 2 plan
├── my-new-app/                    # Main application
│   ├── app/                      # Expo Router screens
│   ├── components/               # Reusable UI components
│   ├── constants/                # App constants
│   ├── hooks/                    # Custom React hooks
│   ├── src/                      # Main source code
│   │   ├── contexts/             # React contexts
│   │   ├── screens/              # Screen components
│   │   ├── services/             # API services
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Utility functions
│   └── backend/                  # Backend API
│       ├── src/                  # Backend source
│       │   ├── config/           # Configuration
│       │   ├── routes/           # API routes
│       │   ├── types/            # TypeScript types
│       │   └── utils/            # Utility functions
│       ├── scripts/              # Database scripts
│       └── package.json          # Backend dependencies
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **PostgreSQL**: v14 or higher
- **Redis**: v6 or higher
- **Expo CLI**: Latest version
- **Git**: Latest version

### Quick Setup

**Option 1: Using the setup script (Recommended)**

```bash
git clone https://github.com/Minionjack/LevelUp.git
cd LevelUp
./scripts/setup.sh
```

**Option 2: Using Make**

```bash
git clone https://github.com/Minionjack/LevelUp.git
cd LevelUp
make setup
```

**Option 3: Manual Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/Minionjack/LevelUp.git
   cd LevelUp
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   # or
   npm install
   cd my-new-app && npm install
   cd backend && npm install
   ```

3. **Set up environment variables**

   ```bash
   # Backend environment
   cd my-new-app/backend
   cp .env.example .env
   # Edit .env with your database and Redis credentials

   # Frontend environment
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

   This will start both backend and frontend servers concurrently.

### Development Setup

#### Using Make (Recommended)

```bash
# Start all development servers
make dev

# Run all tests
make test

# Run linting
make lint

# Format code
make format

# Type check
make typecheck

# Database operations
make migrate      # Run migrations
make seed         # Seed database
make db-reset     # Reset database (migrate + seed)
```

#### Individual Commands

**Backend Development**

```bash
# Start development server
npm run dev:backend

# Run tests
npm run test:backend

# Run tests with coverage
npm run test:coverage:backend

# Run database migrations
npm run migrate

# Seed database
npm run seed
```

**Frontend Development**

```bash
# Start Expo development server
npm run dev:frontend

# Run tests
npm run test:frontend

# Run E2E tests
npm run test:e2e

# Build for production
npm run build:frontend
```

**Code Quality**

```bash
# Run all linters
npm run lint

# Fix linting issues
npm run lint:fix

# Format all code
npm run format

# Check formatting
npm run format:check

# Type check
npm run typecheck
```

#### Utility Scripts

```bash
# Check environment variables
./scripts/check-env.sh

# Validate project setup
./scripts/validate.sh

# Setup development environment
./scripts/setup.sh
```

## 📚 Documentation

### Getting Started

- [Development Guide](docs/DEVELOPMENT.md) - Comprehensive development guide
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to the project
- [System Improvements](docs/IMPROVEMENTS.md) - Overview of system improvements

### Sprint Documentation

- [Sprint Overview](docs/sprints/README.md) - Complete sprint documentation structure
- [Sprint 1: Backend API](docs/sprints/sprint-1/) - Backend development documentation
- [Sprint 2: Frontend Integration](docs/sprints/sprint-2/) - Frontend-backend integration
- [Sprint 3: Advanced Features](docs/sprints/sprint-3/) - Advanced features and polish

### Key Documents

- [Style Guide](docs/sprints/sprint-1/01-style-guide.md) - Comprehensive coding standards and component library
- [Testing Strategy](docs/sprints/sprint-1/02-testing-strategy.md) - Testing approach and implementation guide
- [Current Sprint Plan](docs/sprints/sprint-2/01-sprint-plan.md) - Sprint 2 goals and roadmap
- [API Documentation](http://localhost:4000/docs) - Interactive API docs (when server running)
- [Project Summary](docs/PROJECT_SUMMARY.md) - High-level project overview

## 🧪 Testing

### Testing Strategy

We follow a comprehensive testing pyramid approach:

- **Unit Tests (70%)**: Individual functions and components
- **Integration Tests (20%)**: API endpoints and data flows
- **E2E Tests (10%)**: Complete user journeys

### Running Tests

```bash
# Backend tests
cd my-new-app/backend
npm test                    # Unit tests
npm run test:integration    # Integration tests

# Frontend tests
cd my-new-app
npm test                    # Unit tests
npm run test:e2e           # E2E tests with Detox
```

### Test Coverage

- **Backend**: >95% code coverage
- **Frontend**: >90% code coverage
- **Critical paths**: 100% coverage

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/me
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### Habits Endpoints

```http
GET /api/v1/habits
POST /api/v1/habits
GET /api/v1/habits/:id
PUT /api/v1/habits/:id
DELETE /api/v1/habits/:id
POST /api/v1/habits/:id/complete
```

### Categories Endpoints

```http
GET /api/v1/categories
POST /api/v1/categories
GET /api/v1/categories/:id
PUT /api/v1/categories/:id
DELETE /api/v1/categories/:id
```

### Health Check

```http
GET /health
```

## 🎨 Design System

### Color Palette

- **Primary**: Deep Blue-Grey (#2C3E50)
- **Secondary**: Calming Green (#4CAF50)
- **Accent**: Gold (#FFD700) for XP and achievements
- **Neutrals**: Off-whites and dark greys

### Typography

- **Headings**: Modern sans-serif (Open Sans, Lato)
- **Body**: Highly readable sans-serif (Roboto, Inter)
- **Minimum size**: 14pt for mobile readability

### Components

We maintain a comprehensive component library with:

- Buttons (Primary, Secondary, Outline)
- Cards (Base, Habit, Achievement)
- Inputs (Text, Select, Toggle)
- Navigation elements
- Progress indicators

## ♿ Accessibility

### Standards Compliance

- **WCAG 2.1 AA**: Full compliance
- **Screen Reader Support**: Comprehensive
- **Keyboard Navigation**: Full support
- **High Contrast**: Supported
- **Dynamic Type**: Supported

### Implementation

All components include:

- Proper accessibility labels
- Screen reader support
- Keyboard navigation
- Focus management
- Semantic HTML structure

## 📱 Platform Support

### Mobile

- **iOS**: 13.0+
- **Android**: API level 21+
- **React Native**: Latest stable
- **Expo**: Latest SDK

### Development

- **macOS**: 10.15+
- **Windows**: 10+
- **Linux**: Ubuntu 18.04+

## 🚀 Deployment

### Backend Deployment

```bash
# Production build
cd my-new-app/backend
npm run build

# Start production server
npm start
```

### Frontend Deployment

```bash
# Build for production
cd my-new-app
npm run build

# Deploy to Expo
expo publish
```

## 📊 Performance

### Benchmarks

- **Cold Start**: <2 seconds
- **Screen Transitions**: <1 second
- **API Response Time**: <200ms
- **Bundle Size**: <50MB
- **Memory Usage**: <100MB

### Optimization

- **Code Splitting**: Implemented
- **Lazy Loading**: Images and components
- **Caching**: API responses and images
- **Bundle Optimization**: Tree shaking and minification

## 🔒 Security

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Token Refresh**: Automatic token renewal
- **Password Hashing**: bcrypt with salt
- **Rate Limiting**: API endpoint protection

### Data Protection

- **Input Validation**: Comprehensive validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Content sanitization
- **HTTPS**: All communications encrypted

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**

   ```bash
   npm test
   npm run lint
   ```

3. **Commit with conventional commits**

   ```bash
   git commit -m "feat: add new habit tracking feature"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards

- **TypeScript**: Strict mode enabled (see `tsconfig.json`)
- **ESLint**: Airbnb configuration with custom rules (see `.eslintrc.json`)
- **Prettier**: Consistent formatting (see `.prettierrc.json`)
- **EditorConfig**: Consistent editor settings (see `.editorconfig`)
- **Conventional Commits**: Standardized commit messages (see `.commitlintrc.json`)
- **Git Hooks**: Pre-commit linting and formatting (see `.husky/`)
- **Code Review**: Required for all PRs

### Development Tools

- **VS Code**: Recommended editor with settings (see `.vscode/`)
- **Make**: Common tasks automation (see `Makefile`)
- **Scripts**: Utility scripts for setup and validation (see `scripts/`)
- **CI/CD**: GitHub Actions workflows (see `.github/workflows/`)

### Testing Requirements

- **Unit Tests**: Required for new features
- **Integration Tests**: Required for API changes
- **E2E Tests**: Required for user flows
- **Coverage**: Maintain >90% coverage

## 📈 Monitoring & Analytics

### Performance Monitoring

- **Error Tracking**: Sentry integration
- **Performance Metrics**: Custom analytics
- **User Analytics**: Privacy-compliant tracking
- **Crash Reporting**: Automatic crash detection

### Health Checks

- **API Health**: `/health` endpoint
- **Database Connectivity**: Regular checks
- **Redis Connectivity**: Cache health monitoring
- **External Services**: Third-party service monitoring

## 🆘 Support

### Documentation

- **API Docs**: Comprehensive endpoint documentation
- **Component Library**: Interactive component examples
- **Architecture Guide**: System design documentation
- **Troubleshooting**: Common issues and solutions

### Getting Help

- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Wiki**: Project wiki for detailed guides
- **Email**: Direct support for urgent issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Community**: For the amazing framework
- **Expo Team**: For the development platform
- **Fastify Team**: For the high-performance web framework
- **Open Source Contributors**: For the libraries and tools

---

**LevelUp** - Transform your life, one habit at a time. 🚀
