## Overview
- Redesign all UI to Apple’s Liquid Tinted aesthetic while preserving existing functionality and APIs.
- Maintain full backward compatibility by introducing a new theme with opt-in activation.
- Deliver updated components, design tokens, dark/light support, fluid animations, responsive behavior, style documentation, and a visual regression suite.

## Current Architecture (Summary)
- Styling via Tailwind v4 and theme CSS variables `--color-fd-*` imported in `apps/docs/app/global.css`.
- Theme files live in `packages/ui/css/*` (e.g., `neutral.css`, `black.css`) and override variables with `.dark` blocks (example in `packages/ui/css/neutral.css:3`).
- Components consume tokens through utilities like `bg-fd-card`, `text-fd-muted-foreground`, `ring-fd-ring` (e.g., `packages/ui/src/components/ui/button.tsx:1`, `packages/ui/src/components/card.tsx:33`).
- Theme toggling via `next-themes` (`packages/ui/src/components/layout/theme-toggle.tsx:1`).
- Typography customization lives in `packages/ui/src/theme/typography/*` and `apps/docs/app/layout.tsx` font variables.

## Implementation Phases
### Phase 1: Design Tokens & Theme Foundation
- Create new theme CSS `packages/ui/css/liquid-tinted.css` using `@theme` to define Liquid tokens:
  - Core surfaces: `--color-fd-background`, `--color-fd-card`, `--color-fd-popover`, `--color-fd-muted` with translucent oklch values and gradient overlays.
  - Foregrounds: `--color-fd-foreground`, `--color-fd-muted-foreground` tuned for contrast.
  - Accents & ring: `--color-fd-primary`, `--color-fd-accent`, `--color-fd-ring` with liquid tint gradients.
  - Static status colors remain from `default.css:24` to preserve compatibility.
- Add `.dark` block in the theme mirroring Liquid dark aesthetics (see `packages/ui/css/neutral.css:22` for pattern).
- Import path via app or docs: add `@import 'fumadocs-ui/css/liquid-tinted.css';` next to existing preset imports in `apps/docs/app/global.css`.
- Provide an opt-in activation attribute: on `html`/`body` set `data-ui="liquid"` (no API change for `next-themes`).

### Phase 2: Global Surface Effects (Translucency & Gradients)
- Add CSS rules scoped by `[data-ui="liquid"]` to apply glass/tint effects to common surfaces without altering component APIs:
  - Targets: `.bg-fd-card`, `.bg-fd-popover`, `.bg-fd-secondary`, and menu/dialog sheet surfaces.
  - Apply `backdrop-filter: blur(var(--fd-glass-blur, 24px))` and subtle inner shadows; blend using `background: color-mix(in oklch, var(--color-fd-card) 80%, transparent)`.
  - Add gradient overlays with `::before` where needed for hero/large surfaces.
- Keep existing classes and props untouched for backward compatibility.

### Phase 3: Typography (iOS 26 System Font)
- Load SF Pro (system) via `next/font` using local/system stack and map to `--font-sans`:
  - Update `apps/docs/app/layout.tsx` to set `--font-sans` to `-apple-system, BlinkMacSystemFont, "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif` when `[data-ui="liquid"]` is present.
- Adjust type scale and weights in `packages/ui/src/theme/typography/styles.ts` to Liquid sizes/line-height, preserving prose rules.
- Respect `prefers-reduced-motion` and accessibility: keep `em`-based sizing within current typography system.

### Phase 4: Component Styling Alignment
- Buttons (`packages/ui/src/components/ui/button.tsx:1`):
  - Add Liquid variant in `cva` (no breaking changes) or rely on updated tokens to achieve gradients/tint.
  - Introduce soft inner shadow and state transitions using tokenized `shadow-fd-*` and gradient `bg-gradient-to-*` derived from `--color-fd-primary`.
- Cards (`packages/ui/src/components/card.tsx:33`): liquid glass surface, hover tint, rounded-xl stays; apply backdrop blur via global rules.
- Inputs/Popovers/Menus (`packages/ui/src/components/ui/*`, `packages/ui/src/components/dialog/*`): unify surfaces with tint and consistent focus rings `ring-fd-ring`.
- Layout chrome (`packages/ui/src/layouts/{docs,home,notebook}/**`): ensure navbar/sidebar/tabs adopt liquid surfaces and transitions while preserving structure.
- Maintain public props and exported types; default visuals remain unchanged unless `data-ui="liquid"` is set.

### Phase 5: Animations & Motion
- Define fluid motion keyframes in `apps/docs/app/global.css` and reuse Tailwind animate plugin:
  - Micro-interactions: fade/scale, liquid slide, tint pulse with cubic-bezier ease.
  - Page transitions: gentle blur-in for overlays and popovers.
- Apply motion only under `[data-ui="liquid"]` and guard with `@media (prefers-reduced-motion: reduce)`.

### Phase 6: Responsiveness & Layout
- Maintain existing breakpoints; tune container width tokens (`--fd-layout-width`) for Liquid visuals.
- Verify content scaling and icon sizes in `packages/ui/src/layouts/**` and primary components.

### Phase 7: Dark/Light Mode Support
- Provide full dark mode overrides in `liquid-tinted.css` with `.dark` block mirroring light tint structure.
- `next-themes` continues handling `light/dark/system`; Liquid activation remains orthogonal via `data-ui` attribute.

### Phase 8: Visual Regression Testing
- Add Playwright screenshot tests for core components in both light/dark and Liquid on/off:
  - Location: `apps/docs/tests/visual/*.spec.ts`.
  - Scenarios: buttons (all variants/sizes), cards, inputs, popovers, sidebar/navbar, tabs.
  - Baselines per theme state; CI gate to detect unintended visual diffs.
- Supplement with unit tests (Vitest) for token presence and class derivations where applicable.

### Phase 9: Documentation & Guides
- Style Guide pages with design tokens and usage in `apps/docs/content/docs/ui/liquid-tinted/*`:
  - Tokens table: variables under `@theme` with examples.
  - Component guidelines: buttons, cards, inputs, overlays with screenshots.
- Implementation Guide: activation instructions (`data-ui="liquid"`), theming, and extension patterns.

## Backward Compatibility Strategy
- No breaking changes to component props/exports.
- Opt-in via CSS import and `[data-ui="liquid"]` attribute; existing apps remain on `neutral.css` by default.
- All styling uses existing `--color-fd-*` tokens; new effects applied conditionally.

## Acceptance Criteria
- Color scheme uses liquid tint gradients and translucent surfaces across all components.
- Typography switched to iOS 26 system font stack with correct scaling/weights.
- Buttons/cards/inputs/popovers redesigned consistently without breaking APIs.
- Fluid motion and transitions added and respect reduced-motion.
- Full responsiveness verified across major breakpoints.
- Dark/light parity implemented for Liquid visuals.
- Visual regression suite captures light/dark and Liquid variants.
- Style documentation and implementation guide published.

## File-Level Changes (Highlights)
- `packages/ui/css/liquid-tinted.css` (new): theme variables, `.dark` overrides, conditional surface rules.
- `apps/docs/app/global.css`: import Liquid theme and keyframes/utilities.
- `apps/docs/app/layout.tsx`: conditional mapping of `--font-sans` to SF Pro stack.
- `packages/ui/src/components/ui/button.tsx:1`: token-aligned gradients/shadows; optional Liquid variant.
- `packages/ui/src/components/card.tsx:33`: benefits from global surface rules.
- `packages/ui/src/theme/typography/styles.ts`: scale/weight adjustments.
- `apps/docs/tests/visual/*`: Playwright specs and baselines.
- Docs pages under `apps/docs/content/docs/ui/liquid-tinted/*`.

## Risks & Mitigations
- Glass effects performance: cap blur radius; disable under reduced-motion/low-end via media queries.
- Contrast in dark mode: validate WCAG AA with foreground/background pairs.
- Theming conflicts: scope all new rules under `[data-ui="liquid"]`.

## Rollout Plan
1. Add theme tokens and import paths.
2. Implement global surface effects under activation flag.
3. Align components and typography.
4. Add motion and responsiveness tuning.
5. Author docs and implementation guide.
6. Add Playwright visual tests and enable CI gate.
7. Verify across light/dark and opt-in/out, then enable in docs site.