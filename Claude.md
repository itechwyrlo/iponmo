# IponMo — Client Architecture Guide

This file is for any AI continuing work on this project.
Read it fully before writing or modifying any file.

---

## What This App Is

IponMo is a Progressive Web App (PWA) for managing paluwagan (Filipino rotating savings groups).
Stack: React 18, TypeScript, Vite, React Router DOM v6, React Hot Toast.

---

## Architecture Reference

All patterns in this project follow this article strictly:
https://medium.com/@obrm770/best-practices-and-design-patterns-in-react-js-for-high-quality-applications-6b203be747fb

Do not introduce patterns not covered by this article without explicit instruction from the developer.

---

## Folder Structure

```
src/
├── features/                  # Feature modules, self-contained
│   └── auth/
│       ├── components/        # Presentational components (receive props, no logic)
│       ├── hooks/             # Custom hooks (stateful logic, start with use)
│       ├── services/          # API calls and pure functions (no state)
│       ├── types/             # TypeScript interfaces for this feature
│       └── utils/             # Pure utility functions for this feature
├── components/                # Shared presentational components
├── context/                   # React context providers (global state)
├── hooks/                     # Shared custom hooks
├── pages/                     # Container components, one per route
├── App.tsx                    # Router setup, lazy loading, providers
├── main.tsx                   # Entry point only
├── index.css                  # Global styles
└── vite-env.d.ts              # Vite environment type declarations
```

New features go in `src/features/<feature-name>/` with the same sub-folder pattern.

---

## Pages vs Presentational Components

Pages (src/pages/):
- Read from context or custom hooks
- Manage page-level state
- Pass typed props down to presentational components
- Never contain inline business logic

Presentational components (src/features/*/components/):
- Receive typed props only
- Render UI
- Fire callbacks, own no logic
- Never call hooks that touch context or services directly

---

## Custom Hooks vs Service Functions

Custom Hook (use* prefix, lives in hooks/):
- Use when logic involves useState, useEffect, or context
- Example: useLogin, useRegister, useForm

Service Function (lives in services/):
- Use when logic is pure, no React state involved
- Example: authService.ts, jwtDecode.ts

---

## Backend API Contract

Base URL comes from environment variable: import.meta.env.VITE_API_BASE_URL
Local dev: https://localhost:7001
All fetch calls use credentials: 'include' for HTTP-only cookie handling.

### POST /api/auth/register — HTTP 201
Request: { fullName, email, password, confirmPassword, role? }
Response: { userId, email }
NOTE: Does NOT return a token. Redirect to /login after success.

### POST /api/auth/login
Request: { email, password }
Response: { accessToken, userId }
NOTE: refreshToken arrives as HTTP-only cookie, not in response body.
Email and role must be decoded from the JWT accessToken payload.
JWT claims: sub (userId), email, role, jti, exp.

### POST /api/auth/refresh — requires Authorization: Bearer <token>
No request body. Server reads HTTP-only cookie automatically.
Response: { accessToken, userId }

### POST /api/auth/logout — HTTP 204 — requires Authorization: Bearer <token>
No request body. Server revokes refresh token and blacklists jti.

---

## Auth State

Stored in AuthContext (src/context/AuthContext.tsx).
accessToken stored in localStorage under key: auth_token
AuthUser (userId, email, role) stored in localStorage under key: auth_user
On logout, both are cleared and logoutService is called to revoke server-side tokens.

---

## Environment Variables

.env.development — local dev, points to https://localhost:7001
.env.production  — replace VITE_API_BASE_URL with real production URL before deploying

All env variables must be prefixed VITE_ to be accessible in the client.

---

## Coding Rules

### TypeScript
- All files use .ts or .tsx. No .js or .jsx.
- Every prop, state, hook return, and function parameter must be explicitly typed.
- Use interface for object shapes. Use type for unions and aliases.
- No any. Use unknown and narrow it, or model the type properly.
- noUnusedLocals and noUnusedParameters are enforced by tsconfig.

### No Dead Code
- Every import, variable, parameter must be used.
- Do not leave commented-out code.
- Do not add props a component does not use.

### No Assumptions
- If a requirement is unclear, stop and ask the developer.
- Do not invent field names, API contracts, or business rules not explicitly specified.
- Do not add features not asked for.

### No Hallucination
- Do not assume the backend returns fields not listed in this document.
- Do not assume component props exist without checking the interface.
- Do not introduce libraries not already in package.json without asking.

### Stay in Architecture
- Do not move logic into presentational components.
- Do not put API calls directly in pages or components. Use services.
- Do not put stateful logic directly in pages. Use custom hooks.
- Do not use useState for navigation. Use React Router useNavigate.
- Do not duplicate state across context and a page's useState.

### Naming Conventions
- Components and pages: PascalCase (LoginForm.tsx, RegisterPage.tsx)
- Hooks: camelCase with use prefix (useLogin.ts, useForm.ts)
- Services and utils: camelCase (authService.ts, jwtDecode.ts)
- Types: PascalCase in .types.ts file (AuthUser, LoginRequest)
- Constants: UPPER_SNAKE_CASE (TOKEN_KEY, API_URL)
- File name must match the exported name exactly

### Keys in Lists
Always use stable unique IDs as keys. Never use array index as key.

### React.memo
Only wrap components in React.memo when there is a measured performance reason.
Do not apply it by default.

### Code Splitting
Pages are lazy-loaded via React.lazy in App.tsx.
Wrap all lazy routes in a single Suspense in App.tsx.

---

## What Is Built So Far

- Auth types: RegisterRequest, LoginRequest, RegisterResponse, LoginResponse, RefreshResponse, AuthUser
- Auth service: register, login, refreshToken, logout
- Auth hooks: useRegister, useLogin
- Shared hook: useForm
- Auth components: RegisterForm, LoginForm (presentational)
- Pages: RegisterPage, LoginPage, HomePage (placeholder)
- Context: AuthContext with saveAuth and clearAuth
- Utils: jwtDecode (pure base64 JWT decoder, no library)
- Routing: React Router with ProtectedRoute HOC
- PWA: configured via vite-plugin-pwa

## What Is Not Built Yet

- Groups feature (list, detail, payments, members, history)
- Profile page
- Bottom navigation
- Group creation
- Member management
- Payment tracking

---

## Updated — Full Pages and Components Built

### Pages
- LoginPage.tsx — auth form, spinner on submit
- RegisterPage.tsx — auth form, spinner on submit, redirects to /login on success
- GroupListPage.tsx — group list with skeleton loading, empty state, FAB to create
- GroupDetailPage.tsx — group header skeleton, lazy tab loading (payments, members, history)
- ProfilePage.tsx — user info, sign out
- MainLayout.tsx — wraps authenticated routes, shows BottomNav except on group detail

### Shared Components
- BottomNav.tsx — Home and Profile tabs
- ProtectedRoute.tsx — redirects to /login if no token
- Skeleton.tsx — GroupCardSkeleton, GroupDetailSkeleton, TabContentSkeleton, Skeleton
- Spinner.tsx — circular spinner for auth buttons
- EmptyState.tsx — professional no-data message

### Groups Feature
- group.types.ts — GroupSummary, GroupDetail, MemberDetail, PaymentStatus, PayoutHistory, CreateGroupRequest
- groupService.ts — getGroups, getGroupDetail, getGroupMembers, getGroupPayments, getGroupHistory, createGroup, markPaymentAsPaid
- useGroups.ts — fetches group list, exposes loading, error, refetch
- useGroupDetail.ts — fetches header on mount, fetches each tab on first visit (lazy), caches loaded tabs
- GroupCard.tsx — presentational group summary card
- PaymentsTab.tsx — payment list, mark paid button for organizer
- MembersTab.tsx — member list sorted by payout order
- HistoryTab.tsx — payout history list
- PaymentInfoSheet.tsx — bottom sheet with GCash and Maya copy buttons
- CreateGroupModal.tsx — bottom sheet form to create a group

### Loading Strategy
- Auth forms: circular Spinner inside the submit button
- Group list: three GroupCardSkeleton placeholders
- Group detail header: GroupDetailSkeleton
- Tab content: TabContentSkeleton (three rows of avatar + text)
- Empty states: EmptyState component with professional message

### Routing
- /login — public
- /register — public
- / — protected, GroupListPage
- /groups/:id — protected, GroupDetailPage, no BottomNav
- /profile — protected, ProfilePage
