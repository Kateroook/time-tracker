# Time Tracker Design System

A scalable, consistent design system ensuring visual consistency across all pages and components.

## Colors

All colors are defined as CSS variables in `:root`:

- **Primary Colors**
  - `--color-primary: #007aff` - Main brand color (blue)
  - `--color-primary-700: #0051d5` - Darker primary for hover states

- **Semantic Colors**
  - `--color-danger: #ff3b30` - Error/destructive actions (red)
  - `--color-success: #34c759` - Success messages (green)

- **Neutral Colors**
  - `--color-bg: #f5f5f7` - Page background
  - `--color-surface: #ffffff` - Card/container background
  - `--color-surface-variant: #fafafa` - Hover state for surfaces
  - `--color-text: #1d1d1f` - Primary text
  - `--color-muted: #6e6e73` - Secondary/muted text
  - `--color-muted-2: #8e8e93` - Tertiary text
  - `--color-border: rgba(0,0,0,0.06)` - Subtle borders

- **Surface Colors (for alerts)**
  - `--color-danger-surface: #fff5f5` - Error alert background
  - `--color-danger-ghost: rgba(255,59,48,0.08)` - Error alert overlay
  - `--color-success-surface: #f2fff6` - Success alert background

## Spacing

Base unit is 4px:

- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 20px`
- `--space-6: 24px`
- `--space-8: 32px`
- `--space-12: 48px`

## Border Radius

- `--radius-sm: 8px` - Small buttons, inputs
- `--radius-md: 12px` - Standard components
- `--radius-lg: 20px` - Cards, large containers
- `--radius-round: 999px` - Badges, pills

## Typography

- `--font-base: Inter, ui-sans-serif, system-ui, ...` - Primary font stack
- `--font-size-base: 16px` - Base font size

## Shadows

- `--shadow-1: 0 1px 3px rgba(0,0,0,0.04)` - Subtle
- `--shadow-2: 0 4px 24px rgba(0,0,0,0.06)` - Standard
- `--shadow-hover: 0 8px 32px rgba(0,0,0,0.08)` - Elevated
- `--shadow-focus: 0 0 0 4px rgba(0, 122, 255, 0.08)` - Input focus
- `--shadow-focus-error: 0 0 0 4px rgba(255, 59, 48, 0.08)` - Input error focus

---

## Design Classes

### Cards & Containers

```css
.ds-card           /* Full-width card with gradient bg, padding, shadow, border */
.ds-card-item      /* Item card for lists (padding, radius, border, hover animation) */
```

**Usage:**
```tsx
<Box className="ds-card">...</Box>
<Paper className="ds-card-item">...</Paper>
```

### Typography

```css
.ds-heading        /* Bold, letter-spacing, primary color */
.ds-text-bold      /* font-weight: 600 */
.ds-text-semibold  /* font-weight: 500 */
.ds-text-body      /* 0.95rem size, primary color */
.ds-text-muted     /* Secondary text color */
.ds-text-small     /* 0.95rem size */
.ds-text-sm        /* 0.875rem size */
.ds-text-base      /* 1rem size */
.ds-text-lg        /* 1.125rem size */
.ds-text-xs        /* 0.75rem size */

/* Font size heading classes */
.ds-h1             /* font-size: 2rem */
.ds-h2             /* font-size: 1.75rem */
.ds-h3             /* font-size: 1.5rem */
.ds-h4             /* font-size: 1.125rem */
.ds-h5             /* font-size: 1.05rem */
.ds-h6             /* font-size: 0.95rem */

/* Responsive heading classes */
.ds-heading-lg-sm   /* 2rem (xs), 2.5rem (sm+) - for main page titles */
.ds-heading-md-sm   /* 1.4rem (xs), 1.75rem (sm+) - for section headers */
.ds-heading-sm-sm   /* 1.5rem (xs), 1.75rem (sm+) - for subsections */

/* Letter spacing */
.ds-tracking-tight /* letter-spacing: -0.02em */
.ds-tracking-normal /* letter-spacing: 0 */

/* Text alignment */
.ds-text-center    /* text-align: center */
.ds-text-left      /* text-align: left */
.ds-text-right     /* text-align: right */

/* Font styles */
.ds-italic         /* font-style: italic (for emphasis) */
.ds-not-italic     /* font-style: normal (reset) */
.ds-oblique        /* font-style: oblique */

/* Whitespace */
.ds-whitespace-nowrap /* white-space: nowrap */
```

**Usage:**
```tsx
<Typography className="ds-heading ds-heading-lg-sm">Page Title</Typography>
<Typography className="ds-heading ds-heading-md-sm">Section Header</Typography>
<Typography className="ds-h3">Fixed 1.5rem heading</Typography>
<Typography className="ds-text-muted ds-text-sm">Subtitle</Typography>
<Typography className="ds-italic">Emphasized text</Typography>
<Typography className="ds-text-body ds-italic">Description</Typography>
```

### Buttons

```css
.ds-btn              /* Base button styles (radius, padding, font-weight) */
.ds-btn-primary      /* Primary button (blue, shadow, hover animation) */
.ds-btn-ghost        /* Ghost button (transparent, inherit text color) */
```

**Usage:**
```tsx
<Button className="ds-btn ds-btn-primary">Save</Button>
<Button className="ds-btn ds-btn-ghost">Cancel</Button>
```

### Layout & Flexbox

```css
.ds-flex-row        /* display: flex; flex-direction: row */
.ds-flex-col        /* display: flex; flex-direction: column */
.ds-flex-between    /* flex, space-between, center items */
.ds-flex-center     /* flex, center items both axes */
.ds-gap-1           /* gap: 8px */
.ds-gap-2           /* gap: 16px */
.ds-gap-3           /* gap: 24px */
```

**Usage:**
```tsx
<Box className="ds-flex-between ds-gap-2">
  <span>Left</span>
  <span>Right</span>
</Box>
```

### Width & Sizing

```css
.ds-w-full          /* width: 100% */
.ds-max-w-sm        /* max-width: 700px (form containers) */
.ds-max-w-md        /* max-width: 900px (page containers) */
.ds-mx-auto         /* margin-left: auto; margin-right: auto (center) */
```

### Spacing Utilities

```css
.ds-mb-1, .ds-mb-2, .ds-mb-3, .ds-mb-4  /* margin-bottom */
.ds-mt-1, .ds-mt-2, .ds-mt-3            /* margin-top */
.ds-p-2, .ds-p-3                        /* padding */
.ds-px-2, .ds-py-2                      /* horizontal/vertical padding */

/* Responsive Padding */
.ds-p-card                              /* Responsive card padding: 1.5rem (xs) → 2.5rem (sm) → 3rem (md) */
```

**Usage:**
```tsx
<Box className="ds-mb-3 ds-w-full">Content</Box>
<Box className="ds-max-w-sm ds-mx-auto">Centered form</Box>
<Box className="ds-card ds-p-card">Responsive padded card</Box>
```

### Text Alignment

```css
.ds-text-center     /* text-align: center */
.ds-text-left       /* text-align: left */
.ds-text-right      /* text-align: right */
```

### Header Patterns

```css
.ds-header         /* flex, space-between, center, mb-6, wrap, gap-2 */
.ds-subheader      /* flex, space-between, center, mb-3, gap-2 */
```

**Usage:**
```tsx
<Box className="ds-header">
  <Typography className="ds-heading">Title</Typography>
  <Box className="ds-badge">Badge</Box>
</Box>
```

### Badges

```css
.ds-badge         /* Rounded pill, subtle bg, font-weight-500 */
```

**Usage:**
```tsx
<Box className="ds-badge">12 hrs</Box>
```

### Alerts

```css
.ds-alert              /* Base alert (radius, padding, border) */
.ds-alert--error       /* Red variant */
.ds-alert--success     /* Green variant */
```

**Usage:**
```tsx
<div className="ds-alert ds-alert--error">Error message</div>
<div className="ds-alert ds-alert--success">Success!</div>
```

### Forms

```css
.ds-input-root         /* Standard input styling */
.ds-input-root:hover   /* Hover state */
.ds-input-root:focus-within  /* Focus state */
.ds-input-error        /* Error state */
```

### Spacing Utilities

```css
.ds-mb-1, .ds-mb-2, .ds-mb-3, .ds-mb-4  /* margin-bottom */
.ds-mt-1, .ds-mt-2, .ds-mt-3            /* margin-top */
.ds-p-2, .ds-p-3                        /* padding */
.ds-px-2, .ds-py-2                      /* horizontal/vertical padding */
```

**Usage:**
```tsx
<Box className="ds-mb-3 ds-w-full">Content</Box>
<Box className="ds-max-w-sm ds-mx-auto">Centered form</Box>
```

### Empty States

```css
.ds-empty-state    /* Centered, padded, muted color */
```

**Usage:**
```tsx
<Box className="ds-empty-state">
  <Typography>No items yet</Typography>
</Box>
```

---

## Best Practices

1. **Always use tokens for colors** — Never hardcode hex colors; use CSS variables
2. **Leverage design classes** — Use `.ds-*` classes for layout and spacing instead of inline `sx` props
3. **Maintain spacing consistency** — Use `--space-*` units; avoid arbitrary pixel values
4. **Reuse card variants** — Use `.ds-card` for main containers, `.ds-card-item` for list items
5. **Flex layout** — Use `.ds-flex-*` and `.ds-gap-*` for consistent spacing between elements
6. **Typography hierarchy** — Apply `.ds-heading`, `.ds-text-muted`, etc. for visual consistency

---

## Adding New Design Tokens

When adding new styles:

1. Define variables in `:root` (e.g., `--color-warning: #ff9500`)
2. Create reusable classes (e.g., `.ds-btn-secondary`)
3. Document in this file
4. Update existing components to use the new class

---

## File Structure

- `frontend/src/styles/design.css` — All design tokens and classes
- `frontend/src/pages/Home.tsx` — Main page using design system
- `frontend/src/components/TimeEntryForm.tsx` — Form component using design system
- `frontend/src/components/EntryList.tsx` — List component using design system
