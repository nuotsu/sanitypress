# ♣️ SanityPress with TypeGen

> Zero setup stress. 100% type-safe.

An improved successor to the acclaimed Next.js + Sanity.io starter template—now with auto-generated TypeScript types from your Sanity schema and GROQ queries.

[Get started](https://www.sanity.io/get-started?template=sanitypress) | [Read more about TypeGen](https://typed.sanitypress.dev/blog/introducing-sanitypress-with-typegen) | [View on Sanity.io](https://www.sanity.io/templates/sanitypress)

![](https://cdn.sanity.io/images/cyu7k2r0/production/24aee273834491b8706ab262d25dcda73b5a856b-2178x1085.png)

## Key Features

- Next.js 16 (App Router, Server Components, TypeScript) with Tailwind 4
- Improved successor to the acclaimed [SanityPress](https://sanitypress.dev) starter template (over 400 stars)
- GROQ TypeGen for your Sanity Schema types
- [Perfect PageSpeed Insight scores](https://pagespeed.web.dev/analysis/https-typed-sanitypress-dev/78sjwe1x39?form_factor=desktop)
- Live Content API with Visual Editing
- Optimized images with Next Image component and Sanity CDN
- Auto-generated sitemap.xml and blog RSS feed

## File Structure

```
♣️ sanitypress/
├─ 📁 src/
│ ├─ 📁 app/              # Next.js App Router
│ │ ├─ 📁 (frontend)/     # Public-facing site
│ │ │ ├─ layout.tsx       # Frontend root layout
│ │ │ ├─ not-found.tsx    # 404 page
│ │ │ ├─ 📁 [[...slug]]/  # Catch-all for all standard pages
│ │ │ ├─ 📁 blog/[slug]/  # Individual blog post pages
│ │ │ ├─ 📁 blog/rss.xml/ # RSS feed endpoint
│ │ │ └─ 📁 api/          # API route handlers
│ │ │ │ ├─ 📁 draft-mode/ # Enable/disable Sanity draft mode
│ │ │ │ └─ 📁 og/         # Open Graph image generation
│ │ ├─ 📁 (studio)/admin/ # Sanity Studio (CMS editor UI)
│ │ └─ sitemap.ts         # Auto-generated sitemap
│ ├─ 📁 ui/               # React components
│ │ ├─ 📁 modules/        # One component per Sanity module
│ │ │ ├─ 📁 blog/         # Blog-specific components (post list, filters, etc.)
│ │ │ ├─ 📁 prose/        # Rich text components / portable text renderer
│ │ │ └─ ...              # Modules
│ │ ├─ 📁 header/         # Header, navigation, megamenu
│ │ ├─ 📁 footer/         # Footer and link list
│ │ └─ ...                # Shared components (CTA, Img, Logo, etc.)
│ ├─ 📁 sanity/           # Sanity CMS configuration
│ │ ├─ 📁 schemaTypes/
│ │ │ ├─ 📁 documents/    # Top-level content types (page, blog.post, site, navigation…)
│ │ │ ├─ 📁 modules/      # Page-building blocks (heroes, grids, prose, search…)
│ │ │ ├─ 📁 objects/      # Reusable field groups (cta, link, metadata…)
│ │ │ └─ 📁 fragments/    # Shared GROQ fragment definitions
│ │ ├─ 📁 lib/            # Queries, fetch helpers, image builder
│ │ ├─ 📁 ui/             # Custom Studio UI components
│ │ └─ ...                # Sanity files
│ ├─ 📁 lib/              # Shared app utilities and env helpers
│ ├─ 📁 hooks/            # Custom React hooks
│ └─ 📁 types/            # Global TypeScript declarations
├─ 📁 public/             # Static assets (favicon, etc.)
├─ .env.*                 # Environment variable template
├─ next.config.ts         # Next.js configuration
├─ sanity.config.ts       # Sanity Studio configuration
├─ sanity.cli.ts          # Sanity CLI configuration
└─ package.json
```

## Getting Started

### 1. Initialize the project

Click the [Sanity template link](https://www.sanity.io/get-started?template=sanitypress) -- OR -- install with the Sanity CLI:

```sh
npm create sanity@latest -- --template=nuotsu/sanitypress-with-typegen
```

### 2. Set environment variables

If initialized via the Sanity template link, the `.env.local` file should be created automatically.

If initialized via the CLI, duplicate the `.env.example` file as `.env.local` and assign the variables to your project:

```sh
# .env.local
NEXT_PUBLIC_BASE_URL="https://example.com" # your website's domain

NEXT_PUBLIC_SANITY_PROJECT_ID="abcd1234" # Sanity project id
NEXT_PUBLIC_SANITY_DATASET="production" # Sanity dataset name

SANITY_API_READ_TOKEN="..." # API token with "Viewer" permissions
```

⚠️ **Required**: Set `NEXT_PUBLIC_BASE_URL` to your production domain.

### 3. Install and start local server

Install required packages and dependencies with your desired package manager (e.g. npm, pnpm, deno, bun, etc.).

```sh
npm install
```

Once installed, run the development script:

```sh
npm run dev
```

Then open:

- Next.js frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/admin

### 4. Add content in your Sanity Studio

Publish the **required** documents: `site` and `page` (with the slug "index"). Otherwise, you’ll just see a blank page on the Next.js frontend.

What you'll need:

| Document        | Slug or Path | Usage              | Required? | Notes                                |
| --------------- | ------------ | ------------------ | :-------: | ------------------------------------ |
| `site`          |              | Global settings    |    Yes    |                                      |
| `page`          | `index`      | Homepage route     |    Yes    |                                      |
| `page`          | `404`        | Not found route    |           |                                      |
| `page`          | `blog`       | Blog listing route |           | Add the **Blog index** module        |
| `global-module` | `blog/`      | Blog post template |           | Add the **Blog post content** module |

Alternatively, you can run the following command to import a demo dataset with the required documents:

```sh
sanity dataset import demo.tar.gz
```

> 📸 See what the Sanity Studio backend looks like on the [Screenshots page](https://typed.sanitypress.dev/docs/sanity-studio-screenshots).

### 5. Set up deployments

Add a [Vercel](https://www.sanity.io/plugins/vercel-dashboard-widget) (default) or [Netlify widget](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify) to enable deployments from the Studio.

### 6. Customize

Adjust frontend styles to your liking, edit or add new schema and modules, etc.

## Roadmap / To-do

- read time for blog posts
- improved error handling
- featured post?
  - reference to blog.post on blog-index, blog-post-list
  - OR as `featured: true` on blog.post
- Modules
  - Announcement bar?
- rename `global-module` to `module.global`?

## \*Not included

- Internationalization (i18n) and multi-lingual support
- Next.js 16 Cache Components (not suitable for Sanity Live Content API's real-time updates)
