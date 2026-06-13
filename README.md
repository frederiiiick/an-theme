# An-theme

Anime-inspired design system and UI component library for React and Next.js applications.

An-theme provides reusable themes, design tokens, components, and animations inspired by anime aesthetics. No copyrighted assets are used -- only color palettes, typography styles, motion language, and visual motifs are derived as inspiration.

## Features

- Two anime-inspired themes: `tora` (Toradora) and `spy` (Spy x Family)
- Namespaced CSS custom properties (`--an-*`) that never conflict with your app
- anime.js v4 powered animation system with `prefers-reduced-motion` support
- Fully typed React components (Button, Card, Badge)
- Zero-conflict Tailwind CSS v4 integration via `@source` directive
- Tree-shakeable ESM output

## Installation

```bash
pnpm add @anthropic-an/an-theme
```

### Peer Dependencies

```bash
pnpm add react react-dom tailwindcss
```

## Setup

Add the `@source` directive to your app's CSS entry point so Tailwind can detect classes used by an-theme components:

```css
/* globals.css */
@import "tailwindcss";
@source "../node_modules/@anthropic-an/an-theme/dist/**/*.js";
```

## Usage

```tsx
import { AnThemeProvider, Button, Card, Badge } from '@anthropic-an/an-theme';

function App() {
  return (
    <AnThemeProvider theme="tora">
      <Card variant="elevated" hoverable>
        <Badge color="primary">New</Badge>
        <h2>Hello World</h2>
        <Button variant="primary">Click Me</Button>
      </Card>
    </AnThemeProvider>
  );
}
```

## Available Themes

### tora

Warm, playful, and energetic. Inspired by Toradora's visual palette.

- Orange primary (`#FD9450`)
- Coral red secondary (`#CF4B63`)
- Golden amber accent (`#CEB768`)
- Deep navy text (`#1A3A4E`)
- Quicksand + Nunito typography
- Bouncy spring animations

### spy

Sophisticated, military-toned elegance. Inspired by Spy x Family's visual palette.

- Sage green primary (`#57675C`)
- Deep crimson secondary (`#CE351C`)
- Warm gold accent (`#EECB61`)
- Near-black text (`#2C2827`)
- Space Grotesk + Inter typography
- Smooth composed animations

## Components

### Button

```tsx
<Button variant="primary" size="md" animate loading={false}>
  Click Me
</Button>
```

**Variants:** `primary` | `secondary` | `ghost` | `outline`
**Sizes:** `sm` | `md` | `lg`

### Card

```tsx
<Card variant="elevated" hoverable>
  <p>Card content</p>
</Card>
```

**Variants:** `default` | `glass` | `elevated`

### Badge

```tsx
<Badge variant="soft" color="success">Active</Badge>
```

**Variants:** `default` | `outline` | `soft`
**Colors:** `primary` | `secondary` | `accent` | `success` | `warning` | `danger`

## Theme Provider

Wrap your app with `AnThemeProvider` to activate a theme:

```tsx
import { AnThemeProvider } from '@anthropic-an/an-theme';

<AnThemeProvider theme="tora">
  {/* your app */}
</AnThemeProvider>
```

### Theme Switching

```tsx
import { useAnTheme } from '@anthropic-an/an-theme';

function ThemeSwitcher() {
  const { themeId, setTheme } = useAnTheme();

  return (
    <button onClick={() => setTheme(themeId === 'tora' ? 'spy' : 'tora')}>
      Switch Theme
    </button>
  );
}
```

## Animation System

The animation system wraps anime.js v4 with React hooks and respects `prefers-reduced-motion`.

```tsx
import { useAnimate } from '@anthropic-an/an-theme';

function AnimatedComponent() {
  const { ref, play } = useAnimate<HTMLDivElement>();

  return (
    <div ref={ref} onClick={() => play('bounceIn')}>
      Click to animate
    </div>
  );
}
```

**Available presets:** `fadeIn` | `fadeUp` | `fadeDown` | `slideLeft` | `slideRight` | `scaleIn` | `glowPulse` | `float` | `bounceIn`

## CSS Custom Properties

All tokens use the `--an-` prefix and are scoped to the theme provider element:

```css
var(--an-color-primary)
var(--an-color-secondary)
var(--an-color-accent)
var(--an-color-bg)
var(--an-color-surface)
var(--an-color-text)
var(--an-font-heading)
var(--an-font-body)
var(--an-radius-md)
var(--an-shadow-md)
var(--an-duration-normal)
```

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm dev

# Run tests
pnpm test

# Build the library
pnpm build

# Lint
pnpm lint

# Format
pnpm format
```

## License

MIT
