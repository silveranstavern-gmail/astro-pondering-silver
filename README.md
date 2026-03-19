# Pondering Silver

A personal website featuring spiritual reflections, interactive tools, and resources for intentional living and self-discovery.

## 🌟 Overview

Pondering Silver is a space for depth work and luminous play – combining essays, transmissions, and soul tools for seekers navigating between introspection and adventure. Built with Astro, the site offers a fast, accessible experience with rich interactive components powered by React.

## ✨ Features

### 📝 Blog & Content
- **Markdown/MDX support** with full frontmatter customization
- **Dynamic blog posts** with keyword tagging and search functionality
- **Featured posts** for highlighting key content
- **RSS feed** for syndication
- **SEO optimization** with Open Graph and Twitter Cards

### 🛠️ Interactive Tools
- **Manifestation Tracker**: 7-day affirmation practice with virtual mala beads
- **List Tracker**: Drag-and-drop list management with persistence
- **Purchase Decision Helper**: Compare options by cost and desirability
- **Lights On Solver**: Puzzle solver for Magicraft's Lights On game

### 🎨 Design & UX
- **Responsive sidebar navigation** with collapsible desktop mode
- **Dark mode support** via Tailwind CSS
- **Accessible components** following WCAG guidelines
- **Smooth page transitions** with Astro's View Transitions
- **Client-side search** with real-time filtering

### 🔐 Privacy-First
- **No tracking or analytics**
- **Local storage only** for tool data
- **No server-side data collection**
- **Complete user control** over all saved information

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/astro-pondering-silver.git
cd astro-pondering-silver

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run clean        # Clear build cache
npm run slate        # Clear node_modules and lock file
```

## 📁 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── fonts/              # Custom Atkinson font files
├── src/
│   ├── components/
│   │   ├── tools/          # Interactive React components
│   │   ├── BaseHead.astro
│   │   ├── Header.astro
│   │   ├── Sidebar.astro
│   │   └── ...
│   ├── content/
│   │   └── blog/           # Markdown blog posts
│   ├── data/               # Structured data for services, tools, resources
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── scripts/            # Client-side JavaScript
│   ├── styles/             # Global CSS
│   └── utils/              # Utility functions
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Customization

### Adding Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2025-01-20
keywords: ["spirituality", "reflection"]
deploy: true
---

Your content here...
```

### Creating New Tools

1. Add your tool component to `src/components/tools/`
2. Create a page in `src/pages/tools/`
3. Register it in `src/data/tools.ts`

### Modifying Services

Edit `src/data/services.ts` to update offerings, pricing, or booking links.

## 🔧 Configuration

### Site Metadata

Update `src/consts.ts`:

```typescript
export const SITE_TITLE = 'Your Site Title';
export const SITE_DESCRIPTION = 'Your description';
export const SITE_URL = 'https://yoursite.com';
```

### Integrations

The site uses these Astro integrations:
- `@astrojs/react` - React component support
- `@astrojs/tailwind` - Tailwind CSS
- `@astrojs/mdx` - MDX support
- `@astrojs/sitemap` - Automatic sitemap generation
- `astro-icon` - Icon component library

## 📦 Deployment

### Netlify (Recommended)

The site is configured for Netlify deployment:

```bash
npm run build
```

Deploy the `dist/` folder to Netlify or connect your repository for automatic deployments.

### Other Platforms

The static build works on any hosting platform:
- Vercel
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront

## 🛡️ Privacy & Data

All interactive tools store data locally in the browser:
- **localStorage** is used for persistence
- **No server-side processing**
- **No third-party tracking**
- Clearing browser data removes all stored information

## 🤝 Contributing

This is a personal website, but suggestions and bug reports are welcome! Please open an issue if you find something that could be improved.

## 📝 License

This project is provided for **educational and personal use only**. 

✅ Study the code, learn from it, use it for AI training  
✅ Fork and modify for personal projects  
❌ Commercial use, client work, or template redistribution  
❌ Republishing blog content (though AI training is permitted)

See [LICENSE](LICENSE) for full terms.

**Coming Soon:** A commercial template version will be available with a license that allows you to use it for your own projects (but not resell the template itself).

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Heroicons](https://heroicons.com) and [Simple Icons](https://simpleicons.org)
- Drag-and-drop powered by [dnd kit](https://dndkit.com)
- Typography plugin by [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)

## 📧 Contact

For questions about services or collaboration:
- Email: donald.d.clements@gmail.com - Software Development related
- Email: ponderingsilver@gmail.com - Pondering Silver related.
- Website: [ponderingsilver.com](https://ponderingsilver.com)

---

**Note**: This site is in active development. Features and functionality may change as the project evolves.
