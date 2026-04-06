# Skills Hub -- Design System

Complete reference for building consistent UI across the Skills Hub application.

---

## 1. Foundations

### Color Tokens

All colors are defined as CSS custom properties on `:root`.

| Token              | Value                          | Usage                            |
| ------------------ | ------------------------------ | -------------------------------- |
| `--bg-app`         | `#f8f7f7`                      | Page background                  |
| `--bg-card`        | `#ffffff`                      | Card / panel surfaces            |
| `--text-1`         | `#2e2e30`                      | Primary text, headings           |
| `--text-2`         | `#8a8a8f`                      | Secondary text, descriptions     |
| `--text-3`         | `#a0a0a5`                      | Tertiary text, metadata          |
| `--text-4`         | `#b8b8bc`                      | Disabled text, placeholders      |
| `--border`         | `rgba(0,0,0,0.04)`            | Subtle borders, dividers         |
| `--hover`          | `rgba(0,0,0,0.025)`           | Hover background overlay         |
| `--active`         | `rgba(0,0,0,0.045)`           | Active / pressed state           |
| `--accent`         | `#5e6ad2`                      | Primary accent (links, buttons)  |
| `--accent-soft`    | `rgba(94,106,210,0.07)`       | Accent tint backgrounds          |
| `--icon-sidebar`   | `#c2c2c6`                      | Sidebar icon default color       |

### Typography

**Font family:** Inter (variable, loaded via `next/font/google`).  
**CSS variable:** `--font-inter`, mapped to Tailwind's `font-sans` via `@theme inline`.  
**OpenType features:** `"cv01"` (alternate a), `"ss03"` (curved r) enabled globally.

| Role         | Size   | Weight  | Line Height | Letter Spacing | Color       |
| ------------ | ------ | ------- | ----------- | -------------- | ----------- |
| Page title   | 24px   | 600     | 1.2         | -0.025em       | `--text-1`  |
| Section head | 14px   | 600     | 1.4         | -0.01em        | `--text-1`  |
| Body         | 13px   | 400     | 1.5         | 0              | `--text-1`  |
| Secondary    | 13px   | 400     | 1.5         | 0              | `--text-2`  |
| Caption      | 11px   | 500     | 1.4         | 0.02em         | `--text-3`  |
| Tag / badge  | 11px   | 500     | 1            | 0.01em         | `--text-2`  |

### Spacing Scale

Based on a 4px grid. Use Tailwind spacing utilities (`p-1` = 4px, `p-2` = 8px, etc.).

| Token  | Value | Common Use                     |
| ------ | ----- | ------------------------------ |
| `0.5`  | 2px   | Inline icon gap                |
| `1`    | 4px   | Tight inner padding            |
| `1.5`  | 6px   | Badge padding                  |
| `2`    | 8px   | Card inner padding (compact)   |
| `3`    | 12px  | Default gap, small margin      |
| `4`    | 16px  | Card padding, section gap      |
| `5`    | 20px  | Content area padding           |
| `6`    | 24px  | Large section gap              |
| `8`    | 32px  | Page-level margin              |
| `10`   | 40px  | Major section separator        |
| `12`   | 48px  | Hero spacing                   |

### Border Radius

| Usage           | Value                   |
| --------------- | ----------------------- |
| Badge / tag     | `rounded-full` (999px)  |
| Card            | `rounded-xl` (12px)     |
| Button          | `rounded-lg` (8px)      |
| Input           | `rounded-md` (6px)      |
| Folder back     | 3px 10px 10px 10px      |
| Folder tab      | 5px 5px 0 0             |
| Scrollbar thumb | 999px                   |

---

## 2. Shadows & Elevation

| Token                | Value                                                                  | Usage                         |
| -------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| `--card-shadow`      | `0 0 0 1px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)`             | Card resting state            |
| `--card-shadow-hover`| `0 0 0 1px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.06)`            | Card hover state              |
| `--folder-shadow`    | `0 3px 10px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)`            | 3D folder back panel          |

Shadows use a two-layer approach: a 1px ring for edge definition plus a soft blur for depth.

---

## 3. Animation & Easing

| Token         | Value                              | Usage                       |
| ------------- | ---------------------------------- | --------------------------- |
| `--ease-out`  | `cubic-bezier(0.23, 1, 0.32, 1)`  | All interactive transitions |

### Duration Guidelines

| Interaction     | Duration | Easing        |
| --------------- | -------- | ------------- |
| Hover feedback  | 200ms    | `--ease-out`  |
| Card lift       | 300ms    | `--ease-out`  |
| Color shift     | 600ms    | `--ease-out`  |
| Page transition | 300ms    | `--ease-out`  |
| Micro-feedback  | 150ms    | `--ease-out`  |

---

## 4. 3D Folder Component

Each folder is built from three layers stacked with `position: absolute`:

```
.folder (container, relative)
  .tab    -- small colored rectangle at the top-left
  .back   -- full-width rectangle, receives gradient + shadow
  .front  -- full-width rectangle, overlaid with reduced opacity
```

Both `.back` and `.front` have `::after` pseudo-elements that paint a highlight gradient at the top for a 3D paper effect.

### Folder Color Mapping

Each folder gets a CSS class `f1` through `f8` corresponding to its `folderIndex` property.

| Class | Color Name | Default Palette Back Gradient           |
| ----- | ---------- | --------------------------------------- |
| `f1`  | White      | `#f2f2f5` to `#e4e4e9`                 |
| `f2`  | Blue       | `#aab6f0` to `#8494e2`                 |
| `f3`  | Gold       | `#f0d060` to `#e0b830`                 |
| `f4`  | Silver     | `#e8e9ec` to `#d4d5da`                 |
| `f5`  | Mint       | `#7cd6a8` to `#5ac488`                 |
| `f6`  | Coral      | `#f0a090` to `#e88070`                 |
| `f7`  | Purple     | `#c8b4f8` to `#a890e8`                 |
| `f8`  | Teal       | `#88d4e8` to `#60c0d8`                 |

---

## 5. Mood Palettes

Four palettes shift the folder colors globally. Applied as a class on a wrapper element:

| Palette     | Class           | Character                                     |
| ----------- | --------------- | --------------------------------------------- |
| Default     | `pal-default`   | Neutral with selective color pops              |
| Sunset      | `pal-sunset`    | Warm oranges, pinks, and golds                 |
| Ocean       | `pal-ocean`     | Cool blues, teals, and seafoam                 |
| Mono        | `pal-mono`      | Desaturated grays with subtle tonal shifts     |

Each palette defines `.back`, `.tab`, and `.front` backgrounds for all 8 folder color slots (`f1`--`f8`). Palette transitions animate over 600ms using `--ease-out` for smooth mood switching.

### Palette Structure

```css
.pal-{name} .f{n} .back  { background: linear-gradient(180deg, <light>, <dark>); }
.pal-{name} .f{n} .tab   { background: <mid>; }
.pal-{name} .f{n} .front { background: linear-gradient(180deg, <lighter>, <medium>); opacity: 0.7-0.85; }
```

---

## 6. Component Specs

### Skill Card

- Background: `--bg-card`
- Shadow: `--card-shadow` (rest), `--card-shadow-hover` (hover)
- Radius: `rounded-xl`
- Padding: `16px`
- Transition: shadow 300ms `--ease-out`, transform 300ms `--ease-out`
- Hover: translateY(-2px), shadow elevates

### Tag / Badge

- Background: `--accent-soft` or `var(--hover)`
- Text: `--text-2`
- Font: 11px / weight 500
- Padding: `2px 8px`
- Radius: `rounded-full`

### Sidebar Nav Item

- Height: 32px
- Padding: `4px 12px`
- Radius: `rounded-md`
- Icon color: `--icon-sidebar`
- Hover: background `--hover`
- Active: background `--active`, text `--text-1`

### Button (Primary)

- Background: `--accent`
- Text: `#ffffff`
- Padding: `6px 14px`
- Radius: `rounded-lg`
- Font: 13px / weight 500
- Hover: brightness(1.08)
- Active: brightness(0.96)

### Button (Ghost)

- Background: transparent
- Text: `--text-2`
- Padding: `6px 10px`
- Radius: `rounded-md`
- Hover: background `--hover`, text `--text-1`

---

## 7. Scrollbar

Custom WebKit scrollbar: 6px wide, transparent track, rounded thumb at `rgba(0,0,0,0.08)` darkening to `rgba(0,0,0,0.14)` on hover.

---

## 8. Icons

Icon library: **Lucide React** (`lucide-react`).  
Default size: 16px.  
Default stroke-width: 1.75.  
Sidebar icons use `--icon-sidebar` color.

### Metier-Specific Icons

| Metier Slug    | Lucide Icon      |
| -------------- | ---------------- |
| `design-ui`    | `palette`        |
| `graphisme`    | `pen-tool`       |
| `ux-research`  | `compass`        |
| `motion`       | `clapperboard`   |

---

## 9. Layout Guidelines

### Page Structure

```
Sidebar (fixed, 240px wide)
  Logo / wordmark
  Navigation sections
  Mood palette switcher

Main content (flex, remaining width)
  Top bar (search, user)
  Content area (scrollable)
```

### Grid

- Folder grid: CSS Grid, `repeat(auto-fill, minmax(160px, 1fr))`, gap 20px
- Skill card grid: CSS Grid, `repeat(auto-fill, minmax(280px, 1fr))`, gap 16px

### Responsive Breakpoints

| Breakpoint | Width   | Behavior                            |
| ---------- | ------- | ----------------------------------- |
| `sm`       | 640px   | Stack sidebar over content          |
| `md`       | 768px   | Collapsible sidebar                 |
| `lg`       | 1024px  | Full sidebar visible                |
| `xl`       | 1280px  | Wider content area, larger cards    |

---

## 10. Data Architecture

### Skill Object

```typescript
interface Skill {
  slug: string;        // URL-safe identifier
  name: string;        // Display name
  description: string; // Short summary
  tags: string[];      // Categorization tags
  author: string;      // Creator
  date: string;        // ISO date
  color: string;       // Folder color name
  content: string;     // Full description / body
  category: string;    // 'project' | 'metier'
  folder: string;      // Parent folder slug
}
```

### Folder Object

```typescript
interface Folder {
  slug: string;         // URL-safe identifier
  name: string;         // Display name
  skillCount: number;   // Number of skills inside
  type: 'project' | 'metier';
  color: string;        // Color name from FOLDER_COLORS
  folderIndex: number;  // Maps to CSS class f1-f8
}
```

### Folder Colors Constant

```typescript
const FOLDER_COLORS = ['white', 'blue', 'gold', 'silver', 'mint', 'coral', 'purple', 'teal'];
```

The `folderIndex` (1-8) maps directly to the CSS class used for palette coloring: a folder with `folderIndex: 3` gets class `f3`, which picks up gold-toned gradients in the default palette.
