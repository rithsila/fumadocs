# Technical Documentation

## Architecture Overview
- Monorepo with apps, packages, and examples.
- UI tokens and themes live in `packages/ui/css/*` and are imported in app global CSS.
- Components and layouts consume `--color-fd-*` tokens via Tailwind classes.
- Theme management via `next-themes` in `RootProvider` (`packages/ui/src/provider/base.tsx:91`).

## Key Modules
- UI components and layouts: `packages/ui/src/components/**`, `packages/ui/src/layouts/**`.
- Popover, navigation menu, dialog wrappers integrate Radix primitives.
- Typography system: `packages/ui/src/theme/typography/styles.ts:130`.
- Search: `packages/ui/src/components/dialog/search.tsx` and `packages/ui/src/contexts/search.tsx`.

## APIs
- Layouts: `fumadocs-ui/layouts/{docs,home,notebook}` provide props for links, tabs, sidebar, tree.
- Provider: `fumadocs-ui/provider/next` exports `RootProvider` with `theme`, `search`, `i18n` options.
- Components: `fumadocs-ui/components/*` export React components (buttons, popovers, cards, callouts, tabs, etc.).

## Deployment Procedures
- Next.js build:
```bash
pnpm --filter docs build
pnpm --filter docs start
```
- Static hosting behind reverse proxy:
  - Configure TLS and proxy to the app port.
- Proxmox LXC (example steps):
  - Provision container, install Node.js LTS, clone repo, `pnpm i`, build, serve via Nginx/Caddy.

## Notes
- No database schema in this repository; content is MDX files.
- Env var `GITHUB_TOKEN` used for sponsors page; store securely.