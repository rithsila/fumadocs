# FumaDocs Custom Style & Deployment Plan

Goal: Customize the FumaDocs-powered documentation site to visually match the current application GUI (Tailwind + Radix UI/shadcn, liquid header motion, light/dark/AMOLED themes), and deploy it separately on Proxmox LXC.

This plan is intentionally detailed and actionable so we can implement the docs site independently while preserving design consistency.

## 1) Design System Parity

Baseline from the app:
- Tailwind CSS with custom CSS variables for themes (light/dark/AMOLED)
- Typography scale and container utilities defined in `client/src/index.css`
- Radix UI primitives and shadcn/ui components styling
- Header: App logo/title, glass/liquid motion, ghost buttons for nav

Mapping to FumaDocs:
- Reuse CSS tokens: replicate color variables and theme toggles
- Typography: apply same font-family, font-size scale, headings spacing
- Components: override MDX and theme components to match shadcn/ui look
- Motion: selectively apply liquid pulse on header/nav backgrounds

## 2) Tech Approach in FumaDocs

FumaDocs is a React-based documentation framework. We’ll customize via:
- Global CSS variables and Tailwind configuration
- Overriding theme/layout components and MDX components
- Adding a header with our app branding and a Docs nav that mirrors the app

Core steps:
1. Create a dedicated styles entry (e.g., `styles/tokens.css`, `styles/globals.css`).
2. Port key tokens from the app’s `index.css`:
   - Color variables (light/dark/AMOLED) and surface/glass gradients
   - Border radius, shadows, spacing scale, container max-widths
3. Configure Tailwind in FumaDocs:
   - Same font stack (Inter or existing app font)
   - Typography plugin settings to match headings, lists, code blocks
   - Custom theme extensions for colors, radii, shadows
4. Override FumaDocs layout components:
   - Header: logo, title, and nav buttons styled like AppHeader
   - Sidebar: match ghost/secondary styles and glass surfaces
   - Content area: apply container widths and glass background when desired
5. Override MDX components to align with shadcn/ui patterns:
   - a, h1–h6, p, ul/ol, blockquote
   - Code blocks: use prism theme derived from our palette
   - Callouts/Admonitions: styled cards, subtle borders/shadows
6. Implement theme switcher (light/dark/AMOLED):
   - Add data-theme root attribute
   - Toggle persists in localStorage
   - Export CSS vars for each theme like in app
7. Optional: Liquid header motion
   - Add a simplified version of `useLiquidHeaderMotion` hook
   - Apply subtle blur and pulse gradients to the header background

## 3) Visual Specifications

Branding:
- Use APP_TITLE and APP_LOGO equivalents in FumaDocs
- Header actions: Home, Guides, API, Changelog, Search, Theme toggle

Buttons:
- Ghost variant for header nav; primary for CTAs
- Hover/active states match app’s glassmorphism

Typography:
- H1/H2: bold with tight leading; H3/H4: medium weight
- Body line-height ~1.75; link underline on hover only

Surfaces:
- Glass card background with subtle border and shadow
- Use blur and gradient tokens consistent with app

Code Blocks:
- Prism theme using our palette (background, syntax colors)
- Rounded corners, soft shadow, copy button styled like shadcn

## 4) Information Architecture & Navigation

- Top navbar mirrors app spacing and alignment
- Sidebar categories with collapsible groups
- Breadcrumbs for deep pages
- Search: keep FumaDocs default, ensure palette matches

## 5) Content Conventions

- MDX preferable for embedding React components
- Frontmatter for title, description, sidebar position
- Folder structure: `docs/{guides, api, recipes, changelog, faq}`
- Versioning: folder-based (e.g., `docs/v1`, `docs/v2`) with switcher
- i18n: `docs/{en, km}/...` with language switcher in header

## 6) Proxmox LXC Deployment Plan (Separate from App)

Environment:
- LXC on Proxmox (Debian/Ubuntu)
- Node.js LTS installed
- Reverse proxy (e.g., Nginx or Caddy) serving `https://docs.example.com`

Steps:
1. Provision LXC:
   - apt update && apt install -y curl git build-essential
   - Install Node.js LTS (via nvm or apt repository)
2. Clone FumaDocs repo into `/srv/fumadocs` (or your path):
   - git clone /Users/rithsila/Projects/fumadocs (rsync or push to remote)
3. Install deps:
   - npm ci (or pnpm i) inside the FumaDocs project
4. Add our styles and component overrides:
   - Copy `styles/tokens.css` and `styles/globals.css`
   - Configure Tailwind and MDX component overrides
   - Implement the themed header and layout
5. Build:
   - npm run build (generate static output)
6. Serve:
   - Use a static server (e.g., `serve` or Nginx) for `/var/www/docs`
   - Configure reverse proxy with TLS
7. CI/CD:
   - GitHub Actions builds and rsyncs artifacts to LXC via SSH
   - Or build in LXC and serve from a persistent directory

Security & Ops:
- Ensure no secrets in repo; use environment for analytics keys
- Backups of content (MDX) and build artifacts
- Health checks via reverse proxy; access logs for monitoring

## 7) Integration with App (Link Only)

- In the app, header "Docs" links to `APP_DOCS_URL` (env `VITE_APP_DOCS_URL`)
- Default fallback `/docs` allows reverse-proxy route to FumaDocs
- Open in new tab by default to preserve app state

## 8) Implementation Checklist

Styling & Theming:
- [ ] Add `styles/tokens.css` (themes: light/dark/AMOLED)
- [ ] Add `styles/globals.css` (typography, containers, glass surfaces)
- [ ] Configure Tailwind theme extensions
- [ ] Override layout header, sidebar, content
- [ ] Override MDX components (links, headings, lists, code, callouts)
- [ ] Add theme toggle; persist in localStorage
- [ ] Implement liquid header motion (optional)

Content & IA:
- [ ] Set up folder structure and frontmatter conventions
- [ ] Add version switcher and language switcher (if needed)
- [ ] Configure search palette to match theme

Deployment:
- [ ] LXC provisioning and Node.js install
- [ ] Reverse proxy config for `docs.example.com`
- [ ] Build and serve static output
- [ ] Set up CI/CD to deploy updates

## 9) Success Criteria

- Visual parity with app themes and components
- Smooth typography and code block rendering
- Reliable deployment on Proxmox LXC with TLS
- Rapid authoring flow with MDX and component overrides

## 10) Notes

- Use env variables for external integrations (analytics, search API)
- Keep docs site independent to avoid coupling with app release cadence
- Consider a shared design tokens package in the future for true DRY styling