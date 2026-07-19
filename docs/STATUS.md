# LevelUp — Actual Status

This file describes what's really built, as verified by running the code — not aspiration. Everything under `docs/archive/` predates this file and should be treated as historical/aspirational; several of those documents (the sprint summaries in particular) claim features as "100% tested" and "complete" that do not exist in the current codebase. See `CLAUDE.md` for architecture, commands, and known landmines.

## Backend — real and tested

- **Auth**: register, login, `GET /me`, refresh (separate access/refresh JWT secrets), logout. All in `my-new-app/backend/src/routes/auth.ts`.
- **Habits**: full CRUD + `POST /:id/complete` (increments `total_completions`/`current_streak`/`longest_streak`, no streak-break-on-missed-day logic yet).
- **Categories**: full CRUD.
- Everything above is scoped to the authenticated user and covered by 22 passing integration tests (`vitest` + `supertest` against a real local Postgres/Redis, see `backend/src/routes/*.test.ts`).
- One migration (`001_initial_schema.sql`): `users`, `categories`, `habits`, `habit_completions`. **No `objectives`/quests table.**

## Frontend — partially wired

- `app/(auth)/login.tsx`, `register.tsx`: real forms, dispatch `loginUser`/`registerUser`.
- `app/(tabs)/habits.tsx`: real list/create/complete, dispatches `fetchHabits`/`createHabitThunk`/`completeHabitThunk`, with loading/error/empty states.
- `app/index.tsx`: routes to login or tabs based on real (persisted) auth state.
- **Still stubs / local-state-only, no backend wiring**: `app/(tabs)/objectives.tsx`, `character.tsx`, `profile.tsx`, `categories.tsx`. The corresponding Redux slices (`objectiveSlice`, `characterSlice`, `inventorySlice`) hold state locally only.
- 0 frontend test files.

## Never built (despite README/archived docs claiming otherwise)

- AI-powered coaching, journaling.
- Offline-first sync — `redux-persist` persists `auth`/`character`/`inventory` locally so state survives an app restart, but there's no network-state detection, sync queue, or conflict resolution.
- Detox E2E tests, Sentry error tracking.
- Quest/objective backend persistence (exists as local-only "Objectives" UI, not connected to any API).

## Removed as dead code this project

An earlier implementation attempt (React Context + a `services/` API layer: `AuthContext`, `ThemeContext`, `services/{api,authService,categoryService,habitService}.ts`, a duplicate `src/app/` route tree, unused `Button`/`Card`/`Input` components) was abandoned mid-rewrite in favor of the current Redux Toolkit approach and its types had drifted from the current `shared/types` shape. Confirmed zero live references before removal. The `docs/archive/` sprint docs describe _that_ implementation as complete — it's the source of the "100% tested" claims that don't match current code.

## CI

`.github/workflows/ci.yml` runs lint, format check, typecheck, backend migrations + integration tests (against real Postgres/Redis service containers), frontend tests (`--passWithNoTests`, since none exist yet), a security audit (non-blocking), and a build step (backend `tsc`, frontend `expo export --platform ios`).
