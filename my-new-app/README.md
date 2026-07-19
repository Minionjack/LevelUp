# LevelUp Frontend

React Native/Expo frontend application for LevelUp - RPG-style habit tracking.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 8+
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Environment Setup

1. Copy `.env.example` to `.env`
2. Update `EXPO_PUBLIC_API_URL` with your backend URL

## 📱 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── XPBar.tsx       # XP progress bar
│   ├── StatBar.tsx     # Individual stat bar
│   ├── CharacterStats.tsx # All stats display
│   └── CharacterAvatar.tsx # Character avatar
├── screens/            # Screen components
│   └── DashboardScreen.tsx
├── store/              # Redux store
│   ├── index.ts       # Store configuration
│   └── slices/        # Redux slices
│       ├── authSlice.ts
│       ├── characterSlice.ts
│       ├── habitSlice.ts
│       ├── objectiveSlice.ts
│       └── inventorySlice.ts
├── services/           # API services
│   ├── api.ts         # API client
│   ├── authService.ts
│   └── habitService.ts
├── types/              # TypeScript types
├── utils/              # Utility functions
│   └── rpgCalculations.ts
└── hooks/              # Custom hooks
```

## 🎮 Features

### RPG Progression System

- Character stats (STR, AGI, INT, VIT, CHA, LUK)
- XP and leveling system
- Rank progression
- Stat point allocation

### Components

- Animated XP bar
- Character avatar with animations
- Stat bars with progress
- Level up celebrations

## 🛠️ Development

```bash
# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📚 Documentation

- [RPG Progression Design](../docs/SOLO_LEVELING_DESIGN.md)
- [3D Models Guide](../docs/3D_MODELS_IMPLEMENTATION.md)
- [Feature Ideas](../docs/FRONTEND_FEATURE_IDEAS.md)
