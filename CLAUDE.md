# LevelUp

Adaptive self-improvement game: React Native (Expo Router) frontend + Fastify backend, PostgreSQL + Redis. Revived from a dormant/half-migrated state — see "Current state" below for what's actually built vs aspirational.

## Architecture

```
levelup/
├── shared/types/         # Types shared by frontend + backend (see landmine below)
├── my-new-app/           # Frontend workspace (@levelup/frontend)
│   ├── app/               # Expo Router screens (file-based routing) — THE live route tree
│   ├── src/
│   │   ├── screens/, components/, store/slices/, services/, hooks/, constants/, utils/, types/
│   └── backend/           # Backend workspace (@levelup/backend), nested inside frontend's dir
│       └── src/
│           ├── routes/, middleware/, services/, config/, scripts/, migrations/
└── package.json          # Root: npm workspaces (my-new-app, my-new-app/backend)
```

- Root `package.json` has `workspaces: ["my-new-app", "my-new-app/backend"]`. Run `npm install` from the repo root; it covers all three.
- State management: Redux Toolkit, slices in `my-new-app/src/store/slices/`. `authSlice` and `habitSlice` have real `createAsyncThunk` actions hitting the backend. **`characterSlice`, `objectiveSlice`, `inventorySlice` are still local-only** — no backend persistence.
- Backend: Fastify + Zod validation + `pg` (raw SQL, no ORM) + Redis (caching, not yet used for much) + `@fastify/jwt` (two registrations — access token default namespace, refresh token under `namespace: "refresh"`, see `config/plugins.ts`).
- Auth: JWT access + refresh tokens, `authenticate` middleware (`backend/src/middleware/auth.ts`) attaches `request.user`. `AppError` (`backend/src/middleware/error-handler.ts`) is the standard way to throw API errors: `throw new AppError(statusCode, code, message, details?)`.

## Commands

```bash
# Install (from repo root, covers all 3 workspaces)
npm install

# Backend (run from my-new-app/backend/, or npm run dev:backend from root)
npm run dev              # tsx watch src/index.ts
npm run build             # tsc -> dist/
npx tsc --noEmit          # typecheck
npx vitest run             # 22 integration tests, hits real local Postgres/Redis
npm run migrate           # idempotent, tracks applied migrations in a `migrations` table
npm run seed               # idempotent, skips if users already exist
npx eslint src --ext .ts

# Frontend (run from my-new-app/)
npm start                  # expo start
npx tsc --noEmit
npx jest                   # currently 0 test files — reports "no tests found", that's expected
npx eslint . --ext .ts,.tsx

# Full bundle sanity check (catches errors tsc alone won't, e.g. missing native modules)
npx expo start   # then curl the entry bundle:
curl "http://localhost:8081/node_modules/expo-router/entry.bundle?platform=ios&dev=true" -o /tmp/bundle.js
```

## Conventions

- **Conventional commits** (`feat:`, `fix:`, `test:`, `chore:`), one logical change per commit.
- **Husky hooks are live and enforced** — pre-commit runs `lint-staged` (eslint --fix + prettier), commit-msg runs commitlint. Don't `--no-verify` without asking first.
- **Ask before deleting** anything beyond what a task directly touches — several past sessions found dead code (old Context-API-era screens/services, duplicate route trees) and it was always removed only after explicit confirmation.
- **Explain before applying** non-trivial fixes, especially dependency/config changes — this codebase has a history of "obvious" fixes having a second-order gotcha (see landmines).
- Prefer running real verification (typecheck + lint + tests + a full Metro bundle fetch) over assuming a fix works from reading the diff.

## Known landmines

- **`shared/types` relative-path fragility.** Files reach it via relative paths (`../../../shared/types` etc.) and the "how many `..`" count is easy to get wrong — this exact off-by-one bug has recurred **three separate times** across sessions (backend `middleware/auth.ts`/`types/index.ts`, frontend `store/slices/authSlice.ts`/`habitSlice.ts`). Double-check the actual directory depth before trusting a relative import here. The backend additionally can't import across the workspace boundary at all due to `rootDir: "./src"` in its `tsconfig.json` (breaks `tsc` emit) — `JWTPayload` is duplicated locally in `backend/src/types/index.ts` instead. Real fix, not yet done: turn `shared/` into a proper workspace package.
- **`@typescript-eslint` is pinned to `^6.13.1`, but `eslint-config-expo@10` expects v7/v8** for two rules (`no-empty-object-type`, `no-wrapper-object-types`). They're explicitly disabled in `my-new-app/.eslintrc.js` rather than erroring on every file. A real fix means a coordinated `@typescript-eslint` + `eslint` major bump — don't do it piecemeal.
- **ESLint configs are deliberately self-contained per workspace** (`root: true` in both `my-new-app/.eslintrc.js` and `my-new-app/backend/.eslintrc.js`, each with its own `tsconfigRootDir` and an absolute `path.join(__dirname, ...)` resolver path). This exists because `parserOptions.project`/import-resolver paths are resolved relative to **invocation directory**, not the config file — Husky's hooks run from the repo root, so a relative path silently resolves to the wrong tsconfig there even though `npm run lint` (which `cd`s first) works fine. If lint starts failing only via git hooks and not via `npm run lint`, this is almost certainly why.
- **`.env` files are gitignored** (correctly) but that means undeclared assumptions don't show up in git history. Frontend: only vars prefixed `EXPO_PUBLIC_` are visible to client code (`EXPO_PUBLIC_API_URL`, not `API_URL`). Testing on a physical phone via Expo Go additionally requires: backend `.env` needs `HOST=0.0.0.0` (defaults to `localhost`, which a phone can't reach), and frontend `.env`'s `EXPO_PUBLIC_API_URL` needs the Mac's LAN IP (`ipconfig getifaddr en0`), not `localhost`.
- **`react-native-worklets` version must match Expo Go's native side exactly**, via a root-level `"overrides"` entry in `package.json` (currently pinned `0.5.1` for Expo SDK 54's Expo Go client). Expo Go is a fixed pre-built app — its native modules can't be changed short of a custom dev client, so the JS-side version has to match it, not the other way around. If a `react-native-reanimated` upgrade changes the required native worklets version, expect this pin to need updating too, and check for an actual "Mismatch between JavaScript part and native part of Worklets" error in Expo Go as the symptom. Also note: `react-native-reanimated` is hoisted to the _root_ `node_modules` in this workspace, so `my-new-app/package.json` declaring a version alone isn't sufficient — reanimated's own internal `require()` resolves against whatever's hoisted at the root, hence the need for the override.
- **A corrupted `node_modules`/`package-lock.json` can present as wildly different, seemingly-unrelated errors** on repeated reinstall attempts (missing type declarations for otherwise-fine packages, `ERR_MODULE_NOT_FOUND` for real dependencies, native binaries that fail codesign validation). If `npm install` gets interrupted (timeout, Ctrl-C) or is run while a dev server / Metro / `tsx watch` is actively running and holding file handles into `node_modules`, expect this. Fix: kill all `tsx watch`/`expo start`/`metro` processes first, then `rm -rf node_modules **/node_modules package-lock.json && npm install` from a fully quiescent state.
- Several dependencies (`prop-types`, `eslint-config-expo`, `eslint-import-resolver-typescript`, `jest-expo`) were previously **undeclared phantom dependencies** — present in `node_modules` by hoisting accident but never in any `package.json`, so a clean `npm ci` would never have had a working lint/test setup. All now explicitly declared. If a new mysterious "works locally, fails fresh" issue shows up, check for another one (`date-fns`, imported by the currently-dead `src/utils/format.ts`, is a live example — resolves today only by hoisting accident).

## Current state (honest, as of the session that wrote this file)

**Backend — real and tested:**

- Auth: register, login, `/me`, refresh, logout. Habits: full CRUD + `/complete` (increments streak/completion counters). Categories: full CRUD. All scoped to the authenticated user, all covered by 22 passing integration tests (`backend/src/routes/*.test.ts`, vitest + supertest against a real local Postgres/Redis).
- Migrations: one (`001_initial_schema.sql`) — `users`, `categories`, `habits`, `habit_completions`. No `objectives`/quests table yet.

**Frontend — partially wired:**

- `app/(auth)/login.tsx`, `register.tsx`: real forms dispatching `loginUser`/`registerUser`.
- `app/(tabs)/habits.tsx`: real list/create/complete dispatching `fetchHabits`/`createHabitThunk`/`completeHabitThunk`, with loading/error/empty states.
- `app/index.tsx`: routes to login or tabs based on real (redux-persist-rehydrated) auth state.
- **Not yet built**: `app/(tabs)/objectives.tsx`, `character.tsx`, `profile.tsx`, `categories.tsx` are still placeholder/local-state-only screens. No backend persistence for objectives/quests, character stats, or inventory — those Redux slices are local-only.
- No test files exist for the frontend (`npx jest` correctly reports 0 found).

**Never built** (despite README claims): AI coaching, journaling, offline-first sync (redux-persist persists auth/character/inventory locally, but there's no NetInfo/sync-queue/conflict-resolution), Detox e2e, Sentry.

**Removed as dead code** (confirmed zero live references before deletion): an old Context-API-era implementation (`src/contexts/`, `src/services/{api,authService,categoryService,habitService}.ts`, duplicate `src/app/` route tree, unused `Button`/`Card`/`Input` components) — this was a first attempt at frontend-backend integration that got abandoned mid-rewrite in favor of the current Redux Toolkit approach, and its types had drifted from the current `shared/types` shape.

## Docs folder

`docs/` contains sprint-tracking docs (`SPRINT_1_COMPLETE_SUMMARY.md`, `sprints/sprint-2/02-sprint-review.md`, etc.) claiming "100% tested," "all endpoints connected," full frontend-backend integration — **none of that was true of the code at the time those docs were read**; they describe the abandoned first attempt above, and following them at face value cost a real session an unnecessary archaeology dig. Treat everything under `docs/` as historical/aspirational unless independently verified against actual code.
