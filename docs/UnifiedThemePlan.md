# XAUUSD Platform - Unified Theme Design System

## Overview

This document defines the **unified theme system** for the complete XAUUSD Gold Prediction platform, extending Fumadocs' **iOS 26 Liquid Tinted aesthetic** to all components:

- ✅ **Documentation** (Fumadocs - existing)
- 🎨 **Dashboard** (TailAdmin integration)
- 📰 **News Feed** (custom components)
- 📓 **Trading Journal** (Deltalytix integration)

---

## 🎨 Current Theme System (Fumadocs)

### **Design Philosophy: iOS 26 Liquid Tinted**

Your current Fumadocs implementation features Apple's iOS 26 aesthetic with:

- **Glassmorphism** - Translucent surfaces with backdrop blur
- **Vibrant colors** - OKLCH color space for perceptually uniform colors
- **Fluid animations** - Spring-based easing curves
- **Dynamic tinting** - Subtle color overlays and gradients
- **Premium feel** - Elevated shadows with colored glows

### **Theme Files Architecture**

```
packages/ui/css/
├── liquid-tinted.css        # Main theme (Light/Dark/AMOLED modes)
├── ios26-tokens.css         # Design tokens (colors, spacing, etc.)
├── ios26-animations.css     # Animation curves and keyframes
└── preset.css               # Base styles

apps/docs/app/
└── global.css               # App-specific customization
```

---

## 🎯 Unified Design Tokens

### **Color System**

Your existing iOS 26 color palette (OKLCH color space):

#### **Light Mode**
```css
--color-fd-background: oklch(97% 0.01 250);      /* Soft white with blue tint */
--color-fd-foreground: oklch(20% 0.02 250);      /* Deep blue-black */
--color-fd-primary: oklch(64% 0.19 248);         /* Vibrant blue */
--color-fd-accent: oklch(90% 0.08 260 / 0.6);    /* Soft purple */
--color-fd-card: oklch(97% 0.01 250 / 0.7);      /* Translucent card */
```

#### **Dark Mode**
```css
--color-fd-background: oklch(13% 0.02 250);      /* Deep blue-black */
--color-fd-foreground: oklch(94% 0.01 250);      /* Soft white */
--color-fd-primary: oklch(76% 0.19 248);         /* Bright blue */
--color-fd-accent: oklch(34% 0.1 210 / 0.4);     /* Teal accent */
```

#### **AMOLED Mode**
```css
--color-fd-background: oklch(0% 0 0);            /* Pure black */
--color-fd-primary: oklch(78% 0.19 248);         /* Ultra-bright blue */
```

#### **Additional Platform Colors** (for XAUUSD-specific elements)

```css
/* Trading-Specific Colors */
--color-gold: oklch(75% 0.15 85);                /* Gold accent */
--color-bullish: oklch(65% 0.15 145);            /* Green for bullish */
--color-bearish: oklch(62% 0.18 25);             /* Red for bearish */
--color-neutral: oklch(68% 0.02 250);            /* Gray for neutral */

/* Sentiment Colors */
--color-sentiment-positive: var(--color-ios26-success);
--color-sentiment-negative: var(--color-ios26-error);
--color-sentiment-neutral: oklch(70% 0.02 250);

/* Chart Colors */
--color-chart-up: oklch(65% 0.15 145);          /* Candlestick green */
--color-chart-down: oklch(62% 0.18 25);         /* Candlestick red */
--color-chart-grid: oklch(50% 0.01 250 / 0.2);  /* Grid lines */
```

---

### **Typography System**

Your current iOS 26 typography (SF Pro inspired):

```css
/* Font Stack */
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", 
             "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Font Sizes */
--font-size-ios26-xs: 0.75rem;      /* 12px - small labels */
--font-size-ios26-sm: 0.875rem;     /* 14px - captions */
--font-size-ios26-base: 1rem;       /* 16px - body */
--font-size-ios26-md: 1.0625rem;    /* 17px - iOS preferred body */
--font-size-ios26-lg: 1.125rem;     /* 18px - large body */
--font-size-ios26-xl: 1.25rem;      /* 20px - subheadings */
--font-size-ios26-2xl: 1.5rem;      /* 24px - headings */
--font-size-ios26-3xl: 1.875rem;    /* 30px - large headings */
--font-size-ios26-4xl: 2.25rem;     /* 36px - hero text */

/* Font Weights */
--font-weight-ios26-light: 300;
--font-weight-ios26-regular: 400;
--font-weight-ios26-medium: 500;
--font-weight-ios26-semibold: 600;
--font-weight-ios26-bold: 700;

/* Line Heights */
--line-height-ios26-tight: 1.2;
--line-height-ios26-normal: 1.5;
--line-height-ios26-relaxed: 1.625;

/* Letter Spacing */
--letter-spacing-ios26-tight: -0.01em;  /* For headings */
--letter-spacing-ios26-normal: 0em;     /* For body */
--letter-spacing-ios26-wide: 0.01em;    /* For labels */
```

**Platform-Specific Typography:**

```css
/* Dashboard Numbers (Large metrics) */
--font-size-metric: var(--font-size-ios26-4xl);
--font-weight-metric: var(--font-weight-ios26-semibold);
--line-height-metric: 1.1;
--letter-spacing-metric: -0.02em;

/* Trading Journal Entry */
--font-size-journal: var(--font-size-ios26-md);
--line-height-journal: var(--line-height-ios26-relaxed);

/* News Headlines */
--font-size-news-headline: var(--font-size-ios26-2xl);
--font-weight-news-headline: var(--font-weight-ios26-semibold);
--line-height-news-headline: var(--line-height-ios26-tight);
```

---

### **Spacing System**

Your current iOS 26 spacing (4px base):

```css
--spacing-ios26-1: 0.25rem;   /* 4px */
--spacing-ios26-2: 0.5rem;    /* 8px */
--spacing-ios26-3: 0.75rem;   /* 12px */
--spacing-ios26-4: 1rem;      /* 16px */
--spacing-ios26-5: 1.25rem;   /* 20px */
--spacing-ios26-6: 1.5rem;    /* 24px */
--spacing-ios26-8: 2rem;      /* 32px */
--spacing-ios26-10: 2.5rem;   /* 40px */
--spacing-ios26-12: 3rem;     /* 48px */
--spacing-ios26-16: 4rem;     /* 64px */
```

**Component-Specific Spacing:**

```css
/* Card Padding */
--spacing-card-sm: var(--spacing-ios26-4);
--spacing-card-md: var(--spacing-ios26-6);
--spacing-card-lg: var(--spacing-ios26-8);

/* Section Spacing */
--spacing-section: var(--spacing-ios26-12);

/* Dashboard Grid Gap */
--spacing-grid-gap: var(--spacing-ios26-6);
```

---

### **Border Radius**

Your current iOS 26 rounded corners:

```css
--radius-ios26-sm: 0.5rem;    /* 8px - small buttons */
--radius-ios26-md: 0.75rem;   /* 12px - inputs, cards */
--radius-ios26-lg: 1rem;      /* 16px - large cards */
--radius-ios26-xl: 1.25rem;   /* 20px - modals */
--radius-ios26-2xl: 1.5rem;   /* 24px - hero sections */
--radius-ios26-full: 9999px;  /* Pills, avatars */
```

---

### **Shadows & Elevation**

Your current iOS 26 shadow system:

```css
/* Subtle Shadows */
--shadow-ios26-subtle: 
  0 1px 2px var(--color-ios26-shadow-subtle);

/* Medium Shadows */
--shadow-ios26-medium: 
  0 1px 3px var(--color-ios26-shadow-subtle),
  0 2px 6px var(--color-ios26-shadow-medium);

/* Elevated Shadows */
--shadow-ios26-elevated: 
  0 4px 12px var(--color-ios26-shadow-medium),
  0 8px 24px var(--color-ios26-shadow-elevated);

/* Colored Shadows (Primary) */
--shadow-ios26-primary: 
  0 4px 16px var(--color-ios26-shadow-primary),
  0 2px 8px var(--color-ios26-shadow-subtle);
```

**Component-Specific Shadows:**

```css
/* Dashboard Cards */
--shadow-dashboard-card: var(--shadow-ios26-medium);
--shadow-dashboard-card-hover: var(--shadow-ios26-elevated);

/* Modal Overlays */
--shadow-modal: var(--shadow-ios26-elevated);

/* News Cards */
--shadow-news-card: var(--shadow-ios26-subtle);
```

---

### **Animations & Transitions**

Your current iOS 26 animation system:

#### **Easing Curves (Spring-based)**

```css
/* Spring Curves */
--ease-ios26-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-ios26-spring-soft: cubic-bezier(0.23, 1, 0.32, 1);
--ease-ios26-spring-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Standard Easing */
--ease-ios26-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-ios26-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-ios26-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

#### **Duration Values**

```css
--duration-ios26-instant: 100ms;
--duration-ios26-fast: 150ms;
--duration-ios26-normal: 220ms;
--duration-ios26-slow: 320ms;
--duration-ios26-slower: 500ms;
```

#### **Platform Animations**

```css
/* Dashboard Metric Updates */
--animate-metric-update: 
  all var(--duration-ios26-normal) var(--ease-ios26-spring);

/* News Card Hover */
--animate-news-hover: 
  transform var(--duration-ios26-fast) var(--ease-ios26-out);

/* Chart Transitions */
--animate-chart: 
  all var(--duration-ios26-slow) var(--ease-ios26-smooth);
```

---

### **Glassmorphism & Backdrop Blur**

Your current iOS 26 glass effects:

```css
/* Blur Strengths */
--blur-ios26-sm: 12px;
--blur-ios26-md: 24px;
--blur-ios26-lg: 32px;
--blur-ios26-xl: 48px;

/* Glass Surface */
[data-ui="liquid"] .bg-fd-card {
  backdrop-filter: blur(var(--blur-ios26-lg));
  background-color: color-mix(in oklch, var(--color-fd-card) 82%, transparent);
  border: 1px solid color-mix(in oklch, var(--color-fd-border) 60%, transparent);
}
```

---

## 📐 Component Theming Guidelines

### **1. Dashboard Components**

#### **TailAdmin Integration**

Replace TailAdmin's default colors with iOS 26 tokens:

```css
/* TailAdmin Overrides */
.tailadmin-card {
  background: var(--color-fd-card);
  color: var(--color-fd-card-foreground);
  border-radius: var(--radius-ios26-lg);
  box-shadow: var(--shadow-dashboard-card);
  backdrop-filter: blur(var(--blur-ios26-lg));
}

.tailadmin-primary {
  background: var(--color-fd-primary);
  color: var(--color-fd-primary-foreground);
}

.tailadmin-button {
  border-radius: var(--radius-ios26-md);
  font-weight: var(--font-weight-ios26-medium);
  transition: var(--animate-metric-update);
}
```

#### **Dashboard-Specific Components**

```css
/* Metric Card */
.metric-card {
  background: var(--color-fd-card);
  border-radius: var(--radius-ios26-xl);
  padding: var(--spacing-card-lg);
  box-shadow: var(--shadow-dashboard-card);
  backdrop-filter: blur(var(--blur-ios26-lg));
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-dashboard-card-hover);
  transition: var(--animate-metric-update);
}

/* Metric Value */
.metric-value {
  font-size: var(--font-size-metric);
  font-weight: var(--font-weight-metric);
  line-height: var(--line-height-metric);
  letter-spacing: var(--letter-spacing-metric);
  color: var(--color-fd-primary);
}

/* Bullish/Bearish Indicators */
.indicator-bullish {
  color: var(--color-bullish);
  background: color-mix(in oklch, var(--color-bullish) 15%, transparent);
  border: 1px solid color-mix(in oklch, var(--color-bullish) 30%, transparent);
}

.indicator-bearish {
  color: var(--color-bearish);
  background: color-mix(in oklch, var(--color-bearish) 15%, transparent);
  border: 1px solid color-mix(in oklch, var(--color-bearish) 30%, transparent);
}
```

---

### **2. News Components**

```css
/* News Card */
.news-card {
  background: var(--color-fd-card);
  border-radius: var(--radius-ios26-lg);
  padding: var(--spacing-card-md);
  box-shadow: var(--shadow-news-card);
  backdrop-filter: blur(var(--blur-ios26-md));
  transition: var(--animate-news-hover);
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-ios26-elevated);
}

/* News Headline */
.news-headline {
  font-size: var(--font-size-news-headline);
  font-weight: var(--font-weight-news-headline);
  line-height: var(--line-height-news-headline);
  letter-spacing: var(--letter-spacing-ios26-tight);
  color: var(--color-fd-foreground);
}

/* Sentiment Badge */
.sentiment-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-ios26-2);
  padding: var(--spacing-ios26-1) var(--spacing-ios26-3);
  border-radius: var(--radius-ios26-full);
  font-size: var(--font-size-ios26-sm);
  font-weight: var(--font-weight-ios26-medium);
}

.sentiment-bullish {
  background: color-mix(in oklch, var(--color-bullish) 15%, transparent);
  color: var(--color-bullish);
  border: 1px solid color-mix(in oklch, var(--color-bullish) 30%, transparent);
}

.sentiment-bearish {
  background: color-mix(in oklch, var(--color-bearish) 15%, transparent);
  color: var(--color-bearish);
  border: 1px solid color-mix(in oklch, var(--color-bearish) 30%, transparent);
}

.sentiment-neutral {
  background: color-mix(in oklch, var(--color-neutral) 15%, transparent);
  color: var(--color-neutral);
  border: 1px solid color-mix(in oklch, var(--color-neutral) 30%, transparent);
}
```

---

### **3. Trading Journal Components**

```css
/* Deltalytix Integration */
.journal-entry {
  background: var(--color-fd-card);
  border-radius: var(--radius-ios26-lg);
  padding: var(--spacing-card-md);
  box-shadow: var(--shadow-ios26-medium);
  backdrop-filter: blur(var(--blur-ios26-lg));
}

/* Trade Entry Form */
.trade-form {
  font-size: var(--font-size-journal);
  line-height: var(--line-height-journal);
}

.trade-form-input {
  background: var(--color-fd-muted);
  border: 1px solid var(--color-fd-border);
  border-radius: var(--radius-ios26-md);
  padding: var(--spacing-ios26-3) var(--spacing-ios26-4);
  font-family: var(--font-sans);
  transition: all var(--duration-ios26-fast) var(--ease-ios26-out);
}

.trade-form-input:focus {
  outline: 2px solid var(--color-fd-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-fd-background),
              0 0 0 6px var(--color-fd-ring);
}

/* P&L Display */
.pnl-positive {
  color: var(--color-bullish);
  font-weight: var(--font-weight-ios26-semibold);
}

.pnl-negative {
  color: var(--color-bearish);
  font-weight: var(--font-weight-ios26-semibold);
}
```

---

### **4. Chart Components**

```css
/* Financial Chart Container */
.chart-container {
  background: var(--color-fd-card);
  border-radius: var(--radius-ios26-xl);
  padding: var(--spacing-card-lg);
  box-shadow: var(--shadow-dashboard-card);
  backdrop-filter: blur(var(--blur-ios26-xl));
}

/* Chart Colors (for react-financial-charts) */
.chart-up {
  fill: var(--color-chart-up);
  stroke: var(--color-chart-up);
}

.chart-down {
  fill: var(--color-chart-down);
  stroke: var(--color-chart-down);
}

.chart-grid {
  stroke: var(--color-chart-grid);
  stroke-dasharray: 4 4;
}

/* Chart Tooltip */
.chart-tooltip {
  background: var(--color-fd-popover);
  border-radius: var(--radius-ios26-md);
  padding: var(--spacing-ios26-3) var(--spacing-ios26-4);
  box-shadow: var(--shadow-ios26-elevated);
  backdrop-filter: blur(var(--blur-ios26-xl));
  font-size: var(--font-size-ios26-sm);
}
```

---

## 🎨 Tailwind CSS Integration

### **Extend Tailwind Config**

Create `tailwind.config.ts` in your project root:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './apps/docs/**/*.{ts,tsx,mdx}',
    './packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables for dynamic theming
        background: 'var(--color-fd-background)',
        foreground: 'var(--color-fd-foreground)',
        primary: {
          DEFAULT: 'var(--color-fd-primary)',
          foreground: 'var(--color-fd-primary-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-fd-card)',
          foreground: 'var(--color-fd-card-foreground)',
        },
        // XAUUSD-specific colors
        gold: 'var(--color-gold)',
        bullish: 'var(--color-bullish)',
        bearish: 'var(--color-bearish)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      fontSize: {
        'metric': 'var(--font-size-metric)',
        'journal': 'var(--font-size-journal)',
      },
      borderRadius: {
        'ios': 'var(--radius-ios26-md)',
        'ios-lg': 'var(--radius-ios26-lg)',
        'ios-xl': 'var(--radius-ios26-xl)',
      },
      boxShadow: {
        'dashboard': 'var(--shadow-dashboard-card)',
        'elevated': 'var(--shadow-ios26-elevated)',
      },
      backdropBlur: {
        'ios': 'var(--blur-ios26-lg)',
      },
      animation: {
        'liquid-fade': 'liquid-fade 220ms var(--ease-ios26-out)',
        'liquid-slide': 'liquid-slide 280ms var(--ease-ios26-spring)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### **Usage in Components**

```tsx
// Dashboard MetricCard component
export function MetricCard({ title, value, trend }: MetricCardProps) {
  return (
    <div className="bg-card rounded-ios-xl p-6 shadow-dashboard backdrop-blur-ios
                    hover:-translate-y-0.5 transition-all duration-220 ease-out">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>
      <p className="text-metric font-semibold text-primary">
        {value}
      </p>
      <span className={trend === 'up' ? 'text-bullish' : 'text-bearish'}>
        {trend === 'up' ? '↑' : '↓'}
      </span>
    </div>
  );
}
```

---

## 📱 Responsive Design

### **Breakpoints (Tailwind defaults + iOS guidance)**

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### **Touch Targets (iOS Guidelines)**

```css
--touch-target-ios26-min: 44px;         /* Minimum tap target */
--touch-target-ios26-comfortable: 48px; /* Recommended */
--touch-target-ios26-large: 56px;       /* Large buttons */
```

---

## 🎯 Implementation Plan

### **Phase 1: Extend Theme Tokens (Week 1)**

1. **Create platform tokens file:**
   ```
   packages/ui/css/xauusd-tokens.css
   ```

2. **Define trading-specific colors:**
   - Gold accent colors
   - Bullish/bearish indicators
   - Chart colors
   - Sentiment badges

3. **Add component tokens:**
   - Dashboard metrics
   - News cards
   - Journal entries

### **Phase 2: TailAdmin Theme Override (Week 1-2)**

1. **Create TailAdmin theme file:**
   ```
   packages/ui/css/tailadmin-liquid.css
   ```

2. **Override default TailAdmin classes:**
   - Replace colors with `--color-fd-*` variables
   - Update border radius to iOS 26 values
   - Apply glassmorphism effects

3. **Test dashboard components:**
   - Ensure cards match Fumadocs aesthetic
   - Verify hover states and animations

### **Phase 3: News Component Styles (Week 2)**

1. **Create news component styles:**
   ```
   packages/ui/css/news-liquid.css
   ```

2. **Style news cards:**
   - Apply glassmorphism
   - Add sentiment badges
   - Implement hover effects

3. **Test responsive layouts:**
   - Mobile news feed
   - Tablet grid layout
   - Desktop multi-column

### **Phase 4: Journal Component Styles (Week 2)**

1. **Create journal styles:**
   ```
   packages/ui/css/journal-liquid.css
   ```

2. **Style Deltalytix components:**
   - Trade entry forms
   - P&L displays
   - Performance charts

3. **Ensure consistency:**
   - Match Fumadocs theme
   - Use iOS 26 animations

### **Phase 5: Unified Import (Week 3)**

1. **Update global.css:**
   ```css
   @import 'fumadocs-ui/css/liquid-tinted.css';
   @import 'fumadocs-ui/css/ios26-tokens.css';
   @import 'fumadocs-ui/css/xauusd-tokens.css';     /* NEW */
   @import 'fumadocs-ui/css/tailadmin-liquid.css';   /* NEW */
   @import 'fumadocs-ui/css/news-liquid.css';        /* NEW */
   @import 'fumadocs-ui/css/journal-liquid.css';     /* NEW */
```

2. **Test across all components:**
   - Documentation pages
   - Dashboard
   - News feed
   - Trading journal

3. **Verify theme modes:**
   - Light mode
   - Dark mode
   - AMOLED mode

---

## 📋 File Structure

```
packages/ui/css/
├── liquid-tinted.css           # Base theme (existing)
├── ios26-tokens.css            # Core tokens (existing)
├── ios26-animations.css        # Animations (existing)
├── xauusd-tokens.css           # NEW: Platform-specific tokens
├── tailadmin-liquid.css        # NEW: TailAdmin theme override
├── news-liquid.css             # NEW: News component styles
└── journal-liquid.css          # NEW: Journal component styles

apps/docs/app/
└── global.css                  # Import all themes
```

---

## ✅ Verification Plan

### **Automated Tests**

Run existing visual tests:
```bash
BASE_URL=http://localhost:3000 pnpm --filter docs test:visual
```

### **Manual Testing Checklist**

1. **Theme Modes:**
   - [ ] Light mode renders correctly across all pages
   - [ ] Dark mode renders correctly across all pages
   - [ ] AMOLED mode renders correctly across all pages
   - [ ] Theme toggle persists across navigation

2. **Component Consistency:**
   - [ ] Dashboard cards match Fumadocs aesthetic
   - [ ] News cards use same glassmorphism
   - [ ] Journal forms have consistent styling
   - [ ] All buttons use iOS 26 animations

3. **Responsive Design:**
   - [ ] Mobile layout works on all pages
   - [ ] Tablet layout is optimized
   - [ ] Desktop layout uses full width appropriately

4. **Animations:**
   - [ ] Hover effects use spring curves
   - [ ] Transitions are smooth (220-320ms)
   - [ ] No janky animations

5. **Colors:**
   - [ ] Bullish/bearish colors are consistent
   - [ ] Gold accents are subtle and appropriate
   - [ ] Sentiment badges are clearly visible

---

## 📖 Usage Guide

### **For Developers**

**Creating a new themed component:**

```tsx
import { cn } from '@/lib/utils';

export function ThemedCard({ children, className }: ThemedCardProps) {
  return (
    <div className={cn(
      // Base styles using CSS variables
      'bg-card text-card-foreground',
      'rounded-ios-lg p-6',
      'shadow-dashboard backdrop-blur-ios',
      // Hover effects with iOS animations
      'hover:-translate-y-0.5',
      'transition-all duration-220',
      // Additional classes
      className
    )}>
      {children}
    </div>
  );
}
```

**Using platform-specific colors:**

```tsx
<div className="text-bullish">Price is rising ↑</div>
<div className="text-bearish">Price is falling ↓</div>
<div className="bg-gold/10 border border-gold/30">Gold Alert</div>
```

---

## 🎨 Design Tokens Quick Reference

| Category | Token | Value |
|----------|-------|-------|
| **Primary** | `--color-fd-primary` | `oklch(64% 0.19 248)` |
| **Bullish** | `--color-bullish` | `oklch(65% 0.15 145)` |
| **Bearish** | `--color-bearish` | `oklch(62% 0.18 25)` |
| **Radius** | `--radius-ios26-lg` | `1rem` |
| **Blur** | `--blur-ios26-lg` | `32px` |
| **Duration** | `--duration-ios26-normal` | `220ms` |
| **Easing** | `--ease-ios26-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## 🚀 Next Steps

1. **Review this plan** - Ensure it aligns with your vision
2. **Create token files** - Add XAUUSD-specific tokens
3. **Override TailAdmin** - Apply Liquid Tinted theme
4. **Test components** - Verify visual consistency
5. **Document usage** - Create component examples

---

## 📞 Questions?

This plan maintains your existing iOS 26 Liquid Tinted aesthetic while extending it to all platform components. Let me know if you'd like to:

- Adjust any color values
- Add more component-specific tokens
- Modify animation timing
- Change the implementation approach

Ready to proceed with implementation? 🎨
