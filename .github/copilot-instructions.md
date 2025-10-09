# Copilot Instructions for FusionStreak.github.io

## Project Overview

This is a statically-exported Next.js 15 portfolio website with MDX blog support, deployed to GitHub Pages. Uses App Router, TypeScript, Tailwind CSS v4, and custom GSAP animations.

## Architecture & Key Patterns

### Static Export Configuration

- **Build target**: Static site (`output: 'export'` in `next.config.ts`)
- **No dynamic routes at runtime**: All blog posts, projects, and experiences must be known at build time
- **generateStaticParams**: Required for all dynamic routes (see `app/blog/[slug]/page.tsx`)
- **Image optimization disabled**: Use `unoptimized: true` for images due to GitHub Pages constraints

### Content Architecture

```
content/blog/          # MDX files with frontmatter (gray-matter parsed)
app/projects/projects.ts    # Static project data array
app/experience/experiences.ts    # Static experience data array
```

**Critical**: Content is NOT in a CMS - it's hardcoded TypeScript arrays and local MDX files.

### MDX Handling (Hybrid Approach)

- **Build time**: `@next/mdx` with remark/rehype plugins in `next.config.ts`
- **Runtime**: Blog posts use `gray-matter` + custom `renderMDXToHTML` in `components/mdx-content.tsx`
- **Why both?**: Blog posts are read from filesystem at build time, converted to HTML strings, not true MDX components
- **Syntax highlighting**: Uses `rehype-highlight` with highlight.js, CSS imported in `app/layout.tsx`

### Custom Components Pattern

- **Shadcn/ui base**: Components in `components/ui/` follow shadcn conventions
- **Custom variants**: Use `class-variance-authority` (CVA) pattern
- **Path aliasing**: `@/*` maps to workspace root (see `tsconfig.json`)

### Animation System

- **GSAP integration**: Global animations managed via refs and timelines
- **PillNav component** (`components/PillNav.tsx`): Complex GSAP-based nav with circular hover animations
- **Lenis smooth scroll**: Integrated with GSAP ticker in `components/lenis-provider.tsx`
- **Client-side only**: Most animated components use `"use client"` directive

## Development Workflow

### Running Locally

```bash
pnpm dev          # Uses --turbopack flag for faster dev
pnpm build        # Creates static export in ./out/
pnpm start        # Serves the ./out/ directory
```

### Adding Content

#### Blog Posts

1. Create `content/blog/new-post.mdx` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "2024-01-15"
   excerpt: "Brief description"
   author: "Author Name"
   tags: ["tag1", "tag2"]
   featured: true
   readTime: "5 min read"
   ---
   ```
2. Rebuild site - no hot reload for MDX files in content directory

#### Projects/Experience

Edit the `projects` or `experiences` arrays in:

- `app/projects/projects.ts`
- `app/experience/experiences.ts`

Follow the TypeScript interfaces defined at the top of each file.

## Styling & Theming

### Tailwind v4 Setup

- **No tailwind.config.js**: Uses `@theme inline` in `app/globals.css`
- **Color system**: OKLCH-based design tokens with CSS custom properties
- **Dark mode**: Class-based (`.dark` parent class) via `next-themes`
- **Custom variants**: `@custom-variant dark (&:is(.dark *))` for scoped dark styles

### Design Tokens

All colors defined as CSS variables in `:root` and `.dark` in `globals.css`:

```css
--background, --foreground, --primary, --muted, --accent, etc.
```

Use Tailwind utilities: `bg-background`, `text-foreground`, `border-border`

## Deployment

### GitHub Actions Workflow

- **Trigger**: Push to `main` branch
- **Build**: `pnpm install` → `pnpm build` → uploads `./out/`
- **Deploy**: Automatic to GitHub Pages via `actions/deploy-pages@v4`
- **Cache**: Next.js build cache restored between runs
- **Required setup**: GitHub Pages source set to "GitHub Actions" in repo settings

### Static Export Gotchas

- No server-side APIs - all data fetched at build time
- No `next/image` optimization - use `unoptimized` prop
- No trailing slashes on routes by default - configured with `trailingSlash: true`
- `eslint` and TypeScript errors ignored during builds (see `next.config.ts`)

## Project-Specific Conventions

### Component Patterns

- **Server components by default**: Add `"use client"` only when needed (animations, hooks, state)
- **Async components**: Blog/project pages use async Server Components for data fetching
- **Metadata exports**: Every page exports `generateMetadata` for SEO

### File Organization

- `app/**/page.tsx`: Route pages (App Router convention)
- `components/`: Reusable components (client and server)
- `lib/`: Utilities and helper functions
- No `src/` directory - top-level `app/`, `components/`, `lib/`

### Type Safety

- Strict TypeScript enabled
- Interfaces defined inline with data (e.g., `Project` interface in `projects.ts`)
- No separate `types/` directory - colocated with usage

## Common Tasks

### Adding a new page

1. Create `app/new-page/page.tsx`
2. Add route to `NAV_ITEMS` in `app/layout.tsx`
3. Rebuild to see in static export

### Modifying animations

- GSAP timelines managed via refs in component lifecycle
- See `PillNav.tsx` for complex example with hover states
- Lenis config in `lib/lenis-config.ts` for smooth scroll tuning

### Updating styles

- Modify design tokens in `app/globals.css` (`:root` and `.dark`)
- Component-specific styles inline with `className`
- No separate CSS modules - all Tailwind-based

## Dual License Model

- **Code** (app/, components/, lib/): MIT License
- **Content** (content/, public/): CC BY-NC 4.0
- Respect both when reusing or modifying
