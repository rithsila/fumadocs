# Fumadocs Monorepo

## Overview
- Documentation framework and UI for React/Next.js with MDX content, theming, search, and component layouts.
- Includes a docs app (`apps/docs`), UI library (`packages/ui`), OpenAPI tooling, and examples.
- Supports Liquid Tinted aesthetic (iOS 26) as an opt-in theme, light/dark/AMOLED modes, and fluid motion.

## System Requirements
- Node.js 18+ (LTS recommended)
- pnpm 8+
- macOS/Linux/Windows supported
- Optional: Playwright (for visual tests), Bun (used by some scripts)

## Installation
```bash
pnpm i
```

## Quick Start
- Development (docs app):
```bash
pnpm --filter docs dev
```
- Production start:
```bash
pnpm --filter docs start
```
- Build:
```bash
pnpm --filter docs build
```

## Configuration
- Tailwind preset and themes are imported in `apps/docs/app/global.css`:
```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/liquid-tinted.css';
@import 'fumadocs-ui/css/preset.css';
```
- Activate Liquid UI:
  - Set `data-ui="liquid"` on the root element in `apps/docs/app/layout.tsx`.
  - System font mapping under Liquid: `--font-sans` switches to iOS system stack.
- Theme modes (light/dark/system/amoled) are managed by `next-themes` and the theme toggle.
- Environment variables:
  - `GITHUB_TOKEN` is required for the sponsors page.

## Usage
- Add content (MDX) under `apps/docs/content/**`.
- Use layouts from `fumadocs-ui/layouts/{docs,home,notebook}`.
- Components consume CSS tokens via classes like `bg-fd-card`, `text-fd-muted-foreground`, `ring-fd-ring`.
- Enable visual tests:
```bash
BASE_URL=http://localhost:3000 pnpm --filter docs test:visual
```

## File Structure
```
apps/
  docs/                # Next.js docs app
    app/               # App Router, global styles, providers
    content/           # MDX content
    components/        # Site-specific components
packages/
  ui/                  # Fumadocs UI library (layouts, components, themes)
  openapi/             # OpenAPI → MDX tooling and UI
  mdx-remote/          # MDX rendering support
  core/                # Headless core utilities (search, framework providers)
examples/              # Example apps
documents/             # Project documents and plans
```

## Customization
- Design tokens: update/extend `packages/ui/css/*.css` (e.g., `liquid-tinted.css`).
- Toggle themes with `ThemeToggle` component and `next-themes`.
- Add animations and motion in `apps/docs/app/global.css` (keyframes and variables).
- Override layout components by copying from `packages/ui/src/layouts/**` into your app if deeper changes are needed.

## Contribution Guidelines
- Fork and create feature branches.
- Write clear commit messages (Conventional Commits preferred).
- Run lint and tests before opening a PR:
```bash
pnpm --filter docs lint
BASE_URL=http://localhost:3000 pnpm --filter docs test:visual
```
- Open a PR to `main` with a description and screenshots when applicable.

## License
- MIT
