@AGENTS.md

# Anchored OS — project overview

This site is **Anchored OS**: the homepage for Anchored, a Roblox IP agency
("we turn IP & content into Roblox games"), rendered as a retro desktop OS
(PostHog-inspired) — wallpaper with draggable portfolio icons, windows, a Start
menu, and a taskbar.

## Stack
- Next.js 16 (App Router, `output: "export"` — fully static), React 19, Tailwind v4, framer-motion.
- Per AGENTS.md, read `node_modules/next/dist/docs/` before using unfamiliar Next APIs.

## Structure
- `src/components/os/` — the desktop UI:
  - `Desktop.tsx` — orchestrator: window manager (open/focus/minimize/maximize/drag,
    z-order) + icon layout. Icons are free-draggable on desktop and a static grid on
    mobile; positions persist in `localStorage["anchored:iconpos"]`.
  - `Window.tsx` (draggable window chrome), `DesktopIcon.tsx` (icon + drag),
    `Taskbar.tsx` (Start menu + taskbar), `WindowBody.tsx` (per-app content).
- `src/data/desktopItems.ts` — all desktop content (system apps, portfolio projects,
  services, socials). **Edit copy / portfolio here.**
- `src/app/` — `page.tsx` renders `<Desktop/>`; `projects/` holds long-form case-study
  pages under their own dark layout; `icon.svg` is the favicon.
- Brand: navy `#0c2b54` / `#003A70`, blue `#0072CE`. Anchor marks in `public/`:
  `W_anchored_symbol.png` (white), `C_anchored_signature_h_eng.png` (navy wordmark).

## Deploy & domain
- **Live: https://anchored.kr** → Vercel team `anchored`, project `anchored-web`.
  Deploy the live site with `vercel deploy --prod --scope anchored`.
- DNS: Gabia nameservers + Gabia DNS. Apex `A 76.76.21.21`. Email is Google Workspace
  (MX/TXT live in Gabia DNS) — **never touch the MX/TXT records.**
- `next.config.ts` gates the GitHub Pages `basePath` behind `DEPLOY_TARGET=github-pages`;
  the Pages workflow is unrelated to the live (Vercel) site.

## Conventions
- **Do not push directly to `main`** — open a PR and merge.
- Verify UI changes by running the app (dev server + screenshot) before deploying.
