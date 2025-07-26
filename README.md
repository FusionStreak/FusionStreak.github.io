# Sayfullah Eid - Developer Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean design, blog functionality with MDX, and automatic deployment to GitHub Pages.

## ✨ Features

- **🏠 Welcome Page** - Modern hero section with skills showcase and quick links
- **💼 Experience Page** - Professional experience timeline with detailed achievements
- **🚀 Projects Page** - Interactive project showcase with featured and regular projects
- **📝 Blog** - MDX-powered blog with syntax highlighting and responsive design
- **🌙 Dark/Light Theme** - Automatic theme switching with system preference support
- **📱 Responsive Design** - Optimized for all device sizes
- **⚡ Fast Performance** - Static site generation for optimal loading times
- **🚀 Auto Deployment** - GitHub Actions workflow for automatic deployment to GitHub Pages

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Blog**: MDX with gray-matter for frontmatter
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **Package Manager**: pnpm

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   ├── experience/        # Experience page
│   ├── projects/          # Projects page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── nav-menu.tsx      # Navigation component
│   └── mdx-components.tsx # MDX component mappings
├── content/              # Content directory
│   └── blog/            # Blog post MDX files
├── lib/                 # Utility functions
│   ├── blog.ts         # Blog utilities
│   └── utils.ts        # General utilities
├── .github/workflows/   # GitHub Actions
└── public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/FusionStreak/FusionStreak.github.io.git
   cd FusionStreak.github.io
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Adding Content

### Adding Blog Posts

Create new MDX files in the `content/blog/` directory:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
featured: true
readTime: "5 min read"
---

# Your Post Title

Your content here using Markdown/MDX syntax...
```

### Adding Experience

Edit the `experiences` array in `app/experience/page.tsx`:

```typescript
const experiences: Experience[] = [
  {
    id: "new-id",
    title: "Your Job Title",
    company: "Company Name",
    location: "Location",
    startDate: "2024-01",
    endDate: undefined, // or "2024-12" for past roles
    description: "Job description...",
    achievements: ["Achievement 1", "Achievement 2"],
    technologies: ["React", "TypeScript", "Node.js"],
    website: "https://company.com"
  },
  // ... existing experiences
];
```

### Adding Projects

Edit the `projects` array in `app/projects/page.tsx`:

```typescript
const projects: Project[] = [
  {
    id: "new-project",
    title: "Project Name",
    description: "Short description",
    longDescription: "Detailed description...",
    technologies: ["Next.js", "TypeScript"],
    githubUrl: "https://github.com/username/repo",
    liveUrl: "https://project-demo.com",
    featured: true,
    createdAt: "2024-01-15",
    status: "completed"
  },
  // ... existing projects
];
```

## 🎨 Customization

### Updating Personal Information

1. **Update metadata** in `app/layout.tsx`
2. **Modify hero section** in `app/page.tsx`
3. **Update social links** in `app/page.tsx`
4. **Change skills** in `app/page.tsx`

### Styling

- **Colors**: Modify CSS variables in `app/globals.css`
- **Components**: Customize Shadcn/ui components in `components/ui/`
- **Layout**: Adjust the main layout in `app/layout.tsx`

## 🚀 Deployment

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main branch** - deployment will trigger automatically

### Manual Deployment

```bash
# Build the static site
pnpm build

# The output will be in the 'out' directory
# Upload the contents to your hosting provider
```

## 📦 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🛡️ Licensing

This repository uses a dual-license model:

- **Code** (in `/app`, `/components`, etc.): Licensed under the [MIT License](./LICENSE)
- **Content** (in `/content`, `/public`, etc.): Licensed under [CC BY-NC 4.0](./CONTENT_LICENSE)

If you want to reuse or republish parts of the content commercially, please contact me for permission.

---

Built with ❤️ by [Sayfullah Eid](https://github.com/FusionStreak)
