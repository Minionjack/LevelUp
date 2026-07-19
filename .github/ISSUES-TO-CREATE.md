# Issues to create

`gh` isn't installed in the environment that wrote this file, so these are staged here to paste into GitHub by hand (Issues → New issue), or run through `gh issue create` once `gh` is installed and authenticated (`brew install gh && gh auth login`). Delete this file once the issues exist for real.

Two milestones: **MVP** (finishes the interrupted frontend-backend wiring) and **Hardening** (security/dependency debt + real test coverage). Create the milestones first, then the issues below reference them.

---

## Milestone: MVP

### Objectives/quests: backend persistence

**Milestone:** MVP
Currently "Objectives" only exists as local Redux state (`objectiveSlice`) with no backend table or routes — habits and categories both have real persisted CRUD, objectives don't. Add a migration (mirror `habits`' shape: `id`, `user_id`, `title`, `description`, `type`, `progress`, `target`, `status`, `deadline`, timestamps) and `routes/objectives.ts` (CRUD + a `/complete` endpoint), following the exact pattern already established in `routes/habits.ts`. Add integration tests matching `habits.test.ts`'s coverage (ownership isolation, persistence-after-fetch).

### Wire objectiveSlice to the real backend

**Milestone:** MVP
Depends on the objectives backend issue above. Add `createAsyncThunk` actions (`fetchObjectives`, `createObjectiveThunk`, `completeObjectiveThunk`) to `objectiveSlice.ts`, following the `habitSlice.ts` pattern from this session (axios via `src/services/api.ts`, token from `getState().auth`).

### Build real objectives tab UI

**Milestone:** MVP
`app/(tabs)/objectives.tsx` is still local-state-only (uses `initializeSampleData`, not the API). Rebuild it to dispatch the real thunks from the issue above, with loading/error/empty states matching `habits.tsx`'s pattern.

### Build real categories UI

**Milestone:** MVP
The backend categories routes already exist and are tested — nothing in the frontend calls them. Add a categories management screen (or fold into the habit-creation flow as a picker) that dispatches real create/list/delete against `/api/v1/categories`.

### Build real character/profile screens

**Milestone:** MVP
`app/(tabs)/character.tsx` and `profile.tsx` are still stubs backed by local-only `characterSlice`/user state. Decide scope: either wire to real backend data (requires new backend work — character stats aren't in the schema at all yet) or explicitly keep local-only and document that decision in `docs/STATUS.md`.

### Full golden-path verification via Expo Go

**Milestone:** MVP
Once objectives + categories + character are wired, do a full manual pass tapping through the actual app on a physical device (not curl): register → login → create habit → complete habit → create objective → complete objective → force-quit → reopen → confirm all state persisted via the API. Document any gaps found.

### Turn shared/ into a proper workspace package

**Milestone:** MVP
`shared/types` is reached via fragile relative paths that have caused the same off-by-one bug three times across sessions (see `CLAUDE.md` landmines), and the backend can't even import it directly due to a `tsconfig.json` `rootDir` conflict (works around it today by duplicating `JWTPayload` locally). Add `shared/package.json`, add it to the root `workspaces` array, and switch consumers to import it as a real package instead of `../../../shared/types`.

---

## Milestone: Hardening

### Upgrade @fastify/jwt (7.x → 10.x)

**Milestone:** Hardening
Current version has an open JWT algorithm-confusion / `iss`-claim-validation CVE. Breaking change — check the migration guide before bumping.

### Upgrade bcrypt (5.x → 6.x)

**Milestone:** Hardening
Current version pulls in a vulnerable `tar`/`@mapbox/node-pre-gyp` chain (path traversal). Breaking API change in 6.x.

### Upgrade fastify (4.x → 5.x)

**Milestone:** Hardening
Current version has an open DoS advisory (unbounded memory in `sendWebStream`). Also would let us drop the `unknown`-cast workaround for the logger type mismatch noted in `CLAUDE.md`.

### Upgrade vitest (1.x → 4.x) and the @typescript-eslint/eslint toolchain

**Milestone:** Hardening
vitest 1.x has an open critical advisory (arbitrary file read via the UI server, dev-only but still critical-rated) and is 3 majors behind. Separately, `@typescript-eslint` is pinned to `^6.13.1` while `eslint-config-expo` expects v7+/v8 (two rules are currently disabled as a workaround, see `CLAUDE.md`) — bump `@typescript-eslint` + `eslint` (8 → 9, flat config) together in one pass since they're coupled.

### Write frontend test coverage

**Milestone:** Hardening
Zero frontend test files exist. Start with the screens built this session (`login.tsx`, `register.tsx`, `habits.tsx`) using `@testing-library/react-native` (not `react-test-renderer`, which is deprecated under React 19) — form validation, thunk dispatch, loading/error/empty states.

### Offline-first sync

**Milestone:** Hardening
`redux-persist` persists state locally but there's no actual offline support: no network-state detection (`NetInfo`), no queue for actions made while offline, no conflict resolution when reconnecting. This was in the original README's feature list and has never been built.
