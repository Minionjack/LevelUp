# LevelUp: Enhanced Testing Strategy & Implementation Guide

## Overview

This enhanced testing strategy provides comprehensive, practical guidance for implementing a robust testing framework across the LevelUp application. It builds upon our existing testing philosophy with specific implementation details, patterns, and examples.

---

## 🏗️ Testing Architecture

### Testing Stack

#### Frontend Testing Stack

```json
{
  "jest": "^29.0.0",
  "@testing-library/react-native": "^12.0.0",
  "@testing-library/jest-native": "^5.0.0",
  "detox": "^20.0.0",
  "msw": "^1.0.0",
  "react-native-testing-library": "^12.0.0"
}
```

#### Backend Testing Stack

```json
{
  "jest": "^29.0.0",
  "supertest": "^6.0.0",
  "testcontainers": "^9.0.0",
  "faker": "^6.0.0",
  "ts-jest": "^29.0.0"
}
```

### Project Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── HabitCard.test.tsx
│   │   └── Navigation.test.tsx
│   ├── screens/
│   │   ├── LoginScreen.test.tsx
│   │   ├── DashboardScreen.test.tsx
│   │   └── HabitsScreen.test.tsx
│   ├── services/
│   │   ├── api.test.ts
│   │   ├── auth.test.ts
│   │   └── habits.test.ts
│   ├── utils/
│   │   ├── validation.test.ts
│   │   └── helpers.test.ts
│   └── integration/
│       ├── auth-flow.test.ts
│       └── habit-workflow.test.ts
├── e2e/
│   ├── auth.spec.js
│   ├── habits.spec.js
│   └── onboarding.spec.js
└── __mocks__/
    ├── react-native-gesture-handler.js
    ├── @react-native-async-storage.js
    └── axios.js
```

---

## 🧪 Unit Testing Implementation

### Component Testing Patterns

#### Basic Component Test

```typescript
// src/__tests__/components/Button.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../../components/ui/Button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <Button onPress={() => {}}>Test Button</Button>
    );

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress}>Test Button</Button>
    );

    fireEvent.press(getByText("Test Button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("applies correct styles based on variant", () => {
    const { getByText } = render(
      <Button variant="primary" onPress={() => {}}>
        Primary Button
      </Button>
    );

    const button = getByText("Primary Button");
    expect(button.props.style).toMatchObject({
      backgroundColor: Colors.primary,
    });
  });

  it("is disabled when disabled prop is true", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={mockOnPress}>
        Disabled Button
      </Button>
    );

    const button = getByText("Disabled Button");
    expect(button.props.accessibilityState.disabled).toBe(true);

    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
```

#### Screen Component Test

```typescript
// src/__tests__/screens/LoginScreen.test.tsx
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../store";
import { LoginScreen } from "../../screens/LoginScreen";
import { authService } from "../../services/auth";

// Mock the auth service
jest.mock("../../services/auth");

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("validates email format", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    const emailInput = getByPlaceholderText("Email");
    fireEvent.changeText(emailInput, "invalid-email");

    const loginButton = getByText("Login");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText("Please enter a valid email")).toBeTruthy();
    });
  });

  it("handles successful login", async () => {
    const mockLogin = authService.login as jest.MockedFunction<
      typeof authService.login
    >;
    mockLogin.mockResolvedValue({
      token: "test-token",
      user: { id: "1", email: "test@example.com" },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("handles login error", async () => {
    const mockLogin = authService.login as jest.MockedFunction<
      typeof authService.login
    >;
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrongpassword");
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Invalid credentials")).toBeTruthy();
    });
  });
});
```

### Service Testing Patterns

#### API Service Test

```typescript
// src/__tests__/services/api.test.ts
import { ApiClient } from "../../services/api";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ApiClient", () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
    jest.clearAllMocks();
  });

  describe("request method", () => {
    it("makes successful GET request", async () => {
      const mockResponse = { data: { id: 1, name: "Test" } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await apiClient.request({
        method: "GET",
        url: "/test",
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios).toHaveBeenCalledWith({
        method: "GET",
        url: expect.stringContaining("/test"),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("includes authorization header when token is set", async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      apiClient.setToken("test-token");

      await apiClient.request({
        method: "GET",
        url: "/protected",
      });

      expect(mockedAxios).toHaveBeenCalledWith({
        method: "GET",
        url: expect.stringContaining("/protected"),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
      });
    });

    it("handles network errors gracefully", async () => {
      const networkError = new Error("Network Error");
      mockedAxios.mockRejectedValue(networkError);

      await expect(
        apiClient.request({
          method: "GET",
          url: "/test",
        })
      ).rejects.toThrow("Network Error");
    });

    it("retries failed requests", async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios
        .mockRejectedValueOnce(new Error("Network Error"))
        .mockResolvedValueOnce(mockResponse);

      const result = await apiClient.request({
        method: "GET",
        url: "/test",
        retries: 1,
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios).toHaveBeenCalledTimes(2);
    });
  });
});
```

#### Authentication Service Test

```typescript
// src/__tests__/services/auth.test.ts
import { AuthService } from "../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage");

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("stores token and user data on successful login", async () => {
      const mockResponse = {
        token: "test-token",
        user: { id: "1", email: "test@example.com" },
      };

      // Mock API call
      jest
        .spyOn(authService["apiClient"], "request")
        .mockResolvedValue(mockResponse);

      const result = await authService.login("test@example.com", "password");

      expect(result).toEqual(mockResponse);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "auth_token",
        "test-token"
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "user_data",
        JSON.stringify(mockResponse.user)
      );
    });

    it("throws error on invalid credentials", async () => {
      const error = new Error("Invalid credentials");
      jest.spyOn(authService["apiClient"], "request").mockRejectedValue(error);

      await expect(
        authService.login("test@example.com", "wrongpassword")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("logout", () => {
    it("clears stored authentication data", async () => {
      await authService.logout();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("auth_token");
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user_data");
    });
  });

  describe("isAuthenticated", () => {
    it("returns true when token exists", async () => {
      AsyncStorage.getItem.mockResolvedValue("valid-token");

      const result = await authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it("returns false when no token exists", async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });
});
```

---

## 🔗 Integration Testing Implementation

### API Integration Tests

#### Authentication Flow Test

```typescript
// src/__tests__/integration/auth-flow.test.ts
import { ApiClient } from "../../services/api";
import { AuthService } from "../../services/auth";

describe("Authentication Flow Integration", () => {
  let apiClient: ApiClient;
  let authService: AuthService;

  beforeAll(async () => {
    // Setup test database
    await setupTestDatabase();
  });

  beforeEach(() => {
    apiClient = new ApiClient();
    authService = new AuthService();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
  });

  it("completes full registration and login flow", async () => {
    const userData = {
      email: `test-${Date.now()}@example.com`,
      password: "TestPassword123!",
      username: `testuser-${Date.now()}`,
      first_name: "Test",
      last_name: "User",
    };

    // Step 1: Register user
    const registration = await apiClient.request({
      method: "POST",
      url: "/api/v1/auth/register",
      data: userData,
    });

    expect(registration.success).toBe(true);
    expect(registration.data.user.email).toBe(userData.email);

    // Step 2: Login with registered credentials
    const login = await authService.login(userData.email, userData.password);

    expect(login.token).toBeDefined();
    expect(login.user.email).toBe(userData.email);

    // Step 3: Verify token works for protected endpoints
    apiClient.setToken(login.token);
    const profile = await apiClient.request({
      method: "GET",
      url: "/api/v1/auth/me",
    });

    expect(profile.data.email).toBe(userData.email);
  });

  it("handles token refresh correctly", async () => {
    // Login to get initial token
    const login = await authService.login("test@example.com", "password");
    const originalToken = login.token;

    // Simulate token expiration by modifying the token
    const expiredToken = originalToken + "_expired";
    apiClient.setToken(expiredToken);

    // Attempt to access protected endpoint
    try {
      await apiClient.request({
        method: "GET",
        url: "/api/v1/auth/me",
      });
    } catch (error) {
      // Should trigger token refresh
      expect(error.status).toBe(401);
    }

    // Verify new token is used
    const newToken = await authService.refreshToken();
    expect(newToken).not.toBe(originalToken);
  });
});
```

#### Habit Management Flow Test

```typescript
// src/__tests__/integration/habit-workflow.test.ts
import { ApiClient } from "../../services/api";
import { HabitService } from "../../services/habits";

describe("Habit Management Workflow", () => {
  let apiClient: ApiClient;
  let habitService: HabitService;
  let authToken: string;

  beforeAll(async () => {
    // Setup authenticated session
    const authService = new AuthService();
    const login = await authService.login("test@example.com", "password");
    authToken = login.token;
    apiClient.setToken(authToken);
  });

  beforeEach(() => {
    habitService = new HabitService();
  });

  it("creates category and habit successfully", async () => {
    // Step 1: Create category
    const category = await apiClient.request({
      method: "POST",
      url: "/api/v1/categories",
      data: {
        name: "Health & Fitness",
        icon: "dumbbell",
        color: "#FF6B6B",
      },
    });

    expect(category.success).toBe(true);
    expect(category.data.name).toBe("Health & Fitness");

    // Step 2: Create habit using the category
    const habit = await apiClient.request({
      method: "POST",
      url: "/api/v1/habits",
      data: {
        title: "Daily Exercise",
        description: "Exercise for at least 30 minutes",
        category_id: category.data.id,
        frequency: "daily",
        target_count: 1,
        xp_reward: 50,
      },
    });

    expect(habit.success).toBe(true);
    expect(habit.data.title).toBe("Daily Exercise");
    expect(habit.data.category_id).toBe(category.data.id);
  });

  it("tracks habit completion and updates progress", async () => {
    // Create a habit first
    const habit = await habitService.createHabit({
      title: "Test Habit",
      category_id: "test-category-id",
      frequency: "daily",
      target_count: 1,
      xp_reward: 25,
    });

    // Complete the habit
    const completion = await habitService.completeHabit(habit.id);

    expect(completion.success).toBe(true);
    expect(completion.data.completed_at).toBeDefined();

    // Verify progress is updated
    const updatedHabit = await habitService.getHabit(habit.id);
    expect(updatedHabit.data.current_streak).toBe(1);
    expect(updatedHabit.data.total_completions).toBe(1);
  });
});
```

---

## 🎯 End-to-End Testing Implementation

### Detox E2E Test Setup

#### Configuration

```javascript
// .detoxrc.js
module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/config.json",
  configurations: {
    "ios.sim.debug": {
      type: "ios.simulator",
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/LevelUp.app",
      build:
        "xcodebuild -workspace ios/LevelUp.xcworkspace -scheme LevelUp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      device: {
        type: "iPhone 14",
      },
    },
    "android.emu.debug": {
      type: "android.emulator",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug",
      device: {
        avdName: "Pixel_4_API_30",
      },
    },
  },
};
```

#### Authentication E2E Test

```javascript
// e2e/auth.spec.js
describe("Authentication Flow", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should complete registration flow", async () => {
    // Navigate to registration
    await element(by.id("register-button")).tap();

    // Fill registration form
    await element(by.id("email-input")).typeText("test@example.com");
    await element(by.id("password-input")).typeText("TestPassword123!");
    await element(by.id("confirm-password-input")).typeText("TestPassword123!");
    await element(by.id("username-input")).typeText("testuser");
    await element(by.id("first-name-input")).typeText("Test");
    await element(by.id("last-name-input")).typeText("User");

    // Submit registration
    await element(by.id("register-submit-button")).tap();

    // Wait for success and redirect
    await waitFor(element(by.text("Registration successful!")))
      .toBeVisible()
      .withTimeout(5000);

    // Should be redirected to onboarding
    await expect(element(by.text("Welcome to LevelUp"))).toBeVisible();
  });

  it("should complete login flow", async () => {
    // Navigate to login
    await element(by.id("login-button")).tap();

    // Fill login form
    await element(by.id("email-input")).typeText("test@example.com");
    await element(by.id("password-input")).typeText("TestPassword123!");

    // Submit login
    await element(by.id("login-submit-button")).tap();

    // Wait for successful login
    await waitFor(element(by.text("Welcome back!")))
      .toBeVisible()
      .withTimeout(5000);

    // Should be redirected to dashboard
    await expect(element(by.text("Dashboard"))).toBeVisible();
  });

  it("should handle login errors gracefully", async () => {
    await element(by.id("login-button")).tap();

    await element(by.id("email-input")).typeText("invalid@example.com");
    await element(by.id("password-input")).typeText("wrongpassword");
    await element(by.id("login-submit-button")).tap();

    await waitFor(element(by.text("Invalid credentials")))
      .toBeVisible()
      .withTimeout(3000);
  });
});
```

#### Habit Management E2E Test

```javascript
// e2e/habits.spec.js
describe("Habit Management", () => {
  beforeAll(async () => {
    await device.launchApp();
    // Login first
    await element(by.id("login-button")).tap();
    await element(by.id("email-input")).typeText("test@example.com");
    await element(by.id("password-input")).typeText("TestPassword123!");
    await element(by.id("login-submit-button")).tap();
    await waitFor(element(by.text("Dashboard")))
      .toBeVisible()
      .withTimeout(5000);
  });

  it("should create a new habit", async () => {
    // Navigate to habits tab
    await element(by.id("habits-tab")).tap();

    // Tap add habit button
    await element(by.id("add-habit-button")).tap();

    // Fill habit form
    await element(by.id("habit-title-input")).typeText("Daily Exercise");
    await element(by.id("habit-description-input")).typeText(
      "Exercise for 30 minutes"
    );

    // Select category
    await element(by.id("category-selector")).tap();
    await element(by.text("Health & Fitness")).tap();

    // Set frequency
    await element(by.id("frequency-selector")).tap();
    await element(by.text("Daily")).tap();

    // Save habit
    await element(by.id("save-habit-button")).tap();

    // Verify habit was created
    await waitFor(element(by.text("Daily Exercise")))
      .toBeVisible()
      .withTimeout(3000);
  });

  it("should complete a habit", async () => {
    // Navigate to habits
    await element(by.id("habits-tab")).tap();

    // Find and tap the habit
    await element(by.text("Daily Exercise")).tap();

    // Complete the habit
    await element(by.id("complete-habit-button")).tap();

    // Verify completion
    await waitFor(element(by.text("Habit completed!")))
      .toBeVisible()
      .withTimeout(3000);

    // Check XP gain
    await expect(element(by.text("+50 XP"))).toBeVisible();
  });
});
```

---

## 🛠️ Testing Utilities & Helpers

### Test Data Factories

```typescript
// src/__tests__/utils/testFactories.ts
import { faker } from "@faker-js/faker";

export const createMockUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  ...overrides,
});

export const createMockHabit = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  category_id: faker.string.uuid(),
  frequency: "daily",
  target_count: 1,
  current_streak: 0,
  longest_streak: 0,
  total_completions: 0,
  xp_reward: 50,
  is_active: true,
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  ...overrides,
});

export const createMockCategory = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  icon: "star",
  color: "#FFD700",
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  ...overrides,
});
```

### Custom Render Function

```typescript
// src/__tests__/utils/testUtils.tsx
import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "../../store";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: any;
  store?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store: testStore = store,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={testStore}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    );
  }

  return {
    store: testStore,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from "@testing-library/react-native";
```

### Mock Service Worker Setup

```typescript
// src/__tests__/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  // Auth endpoints
  rest.post("/api/v1/auth/register", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          user: {
            id: "1",
            email: "test@example.com",
            username: "testuser",
          },
          token: "mock-jwt-token",
        },
      })
    );
  }),

  rest.post("/api/v1/auth/login", (req, res, ctx) => {
    const { email, password } = req.body as any;

    if (email === "test@example.com" && password === "password") {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            user: {
              id: "1",
              email: "test@example.com",
            },
            token: "mock-jwt-token",
          },
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        message: "Invalid credentials",
      })
    );
  }),

  // Habits endpoints
  rest.get("/api/v1/habits", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: [
          {
            id: "1",
            title: "Daily Exercise",
            description: "Exercise for 30 minutes",
            frequency: "daily",
            target_count: 1,
            current_streak: 5,
            longest_streak: 10,
            total_completions: 25,
            xp_reward: 50,
            is_active: true,
          },
        ],
      })
    );
  }),

  rest.post("/api/v1/habits", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          id: "2",
          ...req.body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      })
    );
  }),
];
```

---

## 📊 Test Coverage & Quality Metrics

### Coverage Configuration

```json
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.{ts,tsx}',
    '<rootDir>/e2e/**/*.spec.js',
  ],
};
```

### Quality Gates

```yaml
# .github/workflows/test-quality.yml
name: Test Quality Gates

on: [push, pull_request]

jobs:
  test-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Check coverage thresholds
        run: npm run test:coverage:check

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
```

---

## 🚀 Continuous Testing Pipeline

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:all"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --bail --findRelatedTests"
    ]
  }
}
```

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16, 18]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DETOX_CONFIGURATION: ios.sim.debug
```

---

## 📈 Performance Testing

### API Performance Tests

```typescript
// src/__tests__/performance/api-performance.test.ts
import { ApiClient } from "../../services/api";

describe("API Performance Tests", () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
  });

  it("should handle concurrent requests efficiently", async () => {
    const startTime = Date.now();

    const promises = Array.from({ length: 10 }, () =>
      apiClient.request({
        method: "GET",
        url: "/api/v1/habits",
      })
    );

    const results = await Promise.all(promises);
    const endTime = Date.now();

    expect(results).toHaveLength(10);
    expect(endTime - startTime).toBeLessThan(5000); // 5 seconds max
  });

  it("should cache responses appropriately", async () => {
    const firstCall = await apiClient.request({
      method: "GET",
      url: "/api/v1/categories",
    });

    const secondCall = await apiClient.request({
      method: "GET",
      url: "/api/v1/categories",
    });

    expect(firstCall).toEqual(secondCall);
  });
});
```

### Component Performance Tests

```typescript
// src/__tests__/performance/component-performance.test.tsx
import { render } from "@testing-library/react-native";
import { HabitList } from "../../components/HabitList";

describe("Component Performance Tests", () => {
  it("should render large lists efficiently", () => {
    const largeHabitList = Array.from({ length: 100 }, (_, i) => ({
      id: `habit-${i}`,
      title: `Habit ${i}`,
      description: `Description for habit ${i}`,
    }));

    const startTime = Date.now();

    render(<HabitList habits={largeHabitList} />);

    const endTime = Date.now();

    expect(endTime - startTime).toBeLessThan(1000); // 1 second max
  });
});
```

---

## 🎯 Testing Best Practices

### Do's and Don'ts

#### ✅ Do's

- Write tests that focus on behavior, not implementation
- Use descriptive test names that explain the scenario
- Mock external dependencies consistently
- Test error conditions and edge cases
- Keep tests independent and isolated
- Use test data factories for consistent test data
- Write tests that are easy to understand and maintain

#### ❌ Don'ts

- Don't test implementation details
- Don't write brittle tests that break with refactoring
- Don't skip testing error conditions
- Don't use hardcoded test data
- Don't write tests that depend on other tests
- Don't ignore performance implications of tests

### Testing Patterns

#### Arrange-Act-Assert Pattern

```typescript
describe("UserService", () => {
  it("should update user profile", async () => {
    // Arrange
    const userService = new UserService();
    const userId = "123";
    const updates = { name: "John Doe" };
    const mockApiResponse = { success: true, data: { ...updates } };
    jest
      .spyOn(userService["apiClient"], "request")
      .mockResolvedValue(mockApiResponse);

    // Act
    const result = await userService.updateProfile(userId, updates);

    // Assert
    expect(result).toEqual(mockApiResponse);
    expect(userService["apiClient"].request).toHaveBeenCalledWith({
      method: "PUT",
      url: `/api/v1/users/${userId}`,
      data: updates,
    });
  });
});
```

#### Given-When-Then Pattern

```typescript
describe("Habit Completion", () => {
  it("should award XP when habit is completed", async () => {
    // Given
    const habit = createMockHabit({ xp_reward: 50 });
    const user = createMockUser({ current_xp: 100 });
    const habitService = new HabitService();

    // When
    const result = await habitService.completeHabit(habit.id);

    // Then
    expect(result.success).toBe(true);
    expect(result.data.xp_gained).toBe(50);
    expect(result.data.new_total_xp).toBe(150);
  });
});
```

---

_This enhanced testing strategy provides a comprehensive foundation for maintaining high code quality and reliability throughout the LevelUp application development lifecycle._
