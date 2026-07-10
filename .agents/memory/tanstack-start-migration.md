---
name: TanStack Start → Vite migration
description: Patterns learned when converting a TanStack Start (Nitro/SSR) app to the Replit pnpm workspace react-vite scaffold
---

## Key patterns

**Files to delete from the backup copy:**
- `src/server.ts`, `src/start.ts` — Nitro server entry points, not needed
- `src/router.tsx`, `src/routeTree.gen.ts` — TanStack Router glue, replaced by wouter
- `src/routes/__root.tsx` — TanStack root layout with HeadContent/Scripts — replace with standard React
- `src/routes/index.tsx` etc — TanStack file-route convention, convert to `src/pages/Home.tsx`

**Why:** TanStack Start uses `createFileRoute` / `createRootRouteWithContext` patterns that don't exist in plain Vite. The Replit scaffold uses wouter.

**Imports to fix:**
- `import { ... } from "@tanstack/react-router"` → remove or replace with wouter equivalents
- `import { createServerFn } from "@tanstack/react-start"` → convert to plain async function or fetch call
- `import process from "node:process"` → use `import.meta.env.MODE` in client code

**Asset handling:**
- TanStack Start/Lovable asset JSON files (`*.asset.json`) work in Vite via JSON import + `assetUrl()` helper that prepends the Lovable CDN origin. Keep `src/lib/asset-url.ts` and the asset JSON files as-is.

**CSS migration:**
- The scaffold's `src/index.css` has placeholder `red` tokens in `:root` — always replace with the actual theme from `src/styles.css` in the backup.
- Tailwind v4 `@theme inline` block in the backup uses direct CSS variable references (e.g. `--color-background: var(--background)`) — the scaffold uses `hsl(var(--background))` wrappers. Match the backup's approach since oklch values don't work with hsl().

**Font migration:**
- Lovable/TanStack apps use Satoshi from `api.fontshare.com`. Add `<link>` tag to `index.html` instead of the scaffold's Inter Google Font link.

**`pnpm add` note:**
- The `fullstack-copy-frontend.sh` script tries to install `node:process` as a package (it's a Node built-in), which fails. The rest of the install also fails. Run `pnpm add gsap` (or any missing deps) separately after the copy script.
