@AGENTS.md

# Anchored web — project overview

The homepage for Anchored, a **Roblox-native production company** (Seoul). The live
design (v4, since 2026-10-05) follows Porto Rocha's site grammar: a fixed left sidebar
(wordmark, live Seoul clock, iOS-style stacked project cards) and a main column (hero
media, "studio updates" masonry feed), dark by default with a light-mode switch, KO/EN/JA.

## Stack
- Next.js 16 (App Router; serverful because of `/api/roblox`), React 19, Tailwind v4, framer-motion.
- Per AGENTS.md, read `node_modules/next/dist/docs/` before using unfamiliar Next APIs.

## Structure
- `src/app/(site)/` — v4 pages inside the sidebar shell: `/` (hero + feed), `/about`,
  `/projects/[slug]` (12 productions, SSG); `/projects` redirects to `/all`.
- `src/app/all/` — full-screen "Show all projects" index with search.
- `src/components/v4/` — `Shell` (sidebar + main, mobile list/content views), `Stack`
  (stacked sidebar cards), `controls` (pill, KO/EN/JA, theme switch, clock), `icons`
  (generated app-icon glyphs + posters), `HomeView` / `AboutView` / `ProjectView` / `AllView`.
- `src/data/v4.ts` — productions (icon colors, captures), feed items, about copy.
  Production detail copy (tagline/summary/role/bullets/meta, ko/en/ja) comes from
  `src/data/desktopItems.ts`; positioning copy from `src/data/v2.ts`.
- Theme: `<html data-v4theme="dark|light">` set before paint by the inline script in the
  root layout; colors are CSS vars (`--v4-*`) exposed as `bg-v-*` / `text-v-*` utilities.
  Tailwind v4 only generates utilities for tokens in the **first** `@theme` block of
  `globals.css`.
- Archived variants: `/os` (retro desktop OS, `src/components/os/`), `/v2` (Finance-theme
  cards), `/v3` (Kodansha-style editorial); `/v2` and `/v3` are `noindex` drafts.
- Brand: blue `#0072CE`; marks in `public/` (`B_` black / `C_` navy signature, `W_` white symbol).
- Images: Anchored Guild Roblox captures are `rbxcdn` 180-day URLs — replace with
  self-hosted files before they expire.

## Deploy & domain
- **Live: https://anchored.kr** → Vercel team `anchored`, project `anchored-web`.
  Deploy the live site with `vercel deploy --prod --scope anchored`.
- DNS: Gabia nameservers + Gabia DNS. Apex `A 76.76.21.21`. Email is Google Workspace
  (MX/TXT live in Gabia DNS) — **never touch the MX/TXT records.**
- `next.config.ts` gates the GitHub Pages `basePath` behind `DEPLOY_TARGET=github-pages`;
  the Pages workflow is unrelated to the live (Vercel) site.

## Local build caveat
- This repo lives under a Korean-named directory (`…/앵커드/anchored-web`), and a stray
  lockfile in `$HOME` made Next infer the workspace root there — so Turbopack idents
  included the Korean path segment and its truncation panicked mid-character
  (`start byte index … is not a char boundary`). **Fixed by pinning `turbopack.root`
  (+ `outputFileTracingRoot`) to the project dir in `next.config.ts`.** If it ever
  resurfaces, `npm run build:local` / `npm run dev:webpack` are webpack fallbacks.

## Conventions
- **Do not push directly to `main`** — open a PR and merge.
- Verify UI changes by running the app (dev server + screenshot) before deploying.
