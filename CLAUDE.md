# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Tagarr?

A Next.js service that automatically tags movies (Radarr) and TV series (Sonarr) based on MDBList presence. It syncs lists daily at midnight UTC, adding/removing tags based on whether items appear on configured lists.

## Commands

```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Production build
pnpm test         # Run all tests
pnpm test <path>  # Run single test file
pnpm lint         # Lint with auto-fix (Biome)
pnpm typecheck    # TypeScript check
```

## Architecture

```
src/
├── app/                    # Next.js App Router
│   └── api/                # REST endpoints (ping, workflows)
├── components/             # React components
│   └── ui/                 # shadcn/ui primitives
├── db/                     # SQLite + Kysely ORM
│   ├── config/             # Config table queries
│   └── migrations/         # Schema migrations
├── workflows/              # Workflow orchestration
│   └── tag-media/          # Main tagging workflow + steps
├── services/               # External API clients
│   ├── arr-service/        # Radarr/Sonarr client
│   └── mdblist/            # MDBList client
├── lib/                    # Utilities (logger, helpers)
└── mocks/                  # MSW test fixtures
```

**Key patterns:**
- Path alias: `@/` maps to `src/`
- Logging: Use `createLogger('[Context]')` from `@/lib/logger`
- UI components: shadcn/ui in `@/components/ui/`
- Workflows: Functions marked with `'use workflow'` directive

## Tech Stack

- **Framework:** Next.js 16 (App Router, RSC)
- **Database:** SQLite (better-sqlite3) + Kysely ORM
- **UI:** React 19, Tailwind CSS 4, Radix UI, shadcn/ui
- **Forms:** react-hook-form + Zod validation
- **Testing:** Vitest + Testing Library + MSW
- **Linting:** Biome (strict mode)
- **Package Manager:** pnpm

## Code Style (Biome enforced)

- No `console.log` (use logger)
- No unused imports/variables
- Use `type` imports: `import type { Foo } from './types'`
- Single quotes, spaces for indentation
- React fragments: `<>` not `<React.Fragment>`
- Prefer `for...of` over `.forEach()`

## Testing

Tests use happy-dom environment with MSW for HTTP mocking. Test files are colocated with source (`*.test.ts`).

## API Endpoints

- `GET /api/ping` - Health check
- `POST /api/workflows/movies` - Trigger Radarr tagging
- `POST /api/workflows/series` - Trigger Sonarr tagging
- `GET /api/workflows/{runId}` - Query workflow status

Add `?sync` param to workflow endpoints to wait for completion.
