# Next.js + Sanity.io Starter Template

An opinionated and minimally styled starter template with Tailwind CSS and pre-built schema and modules for rapid website development.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnuotsu%2Fnext-sanity-template&env=NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_TOKEN)

🖋️ Published on [Sanity.io](https://www.sanity.io/templates/next-sanity-template)

⚡ [Perfect Lighthouse scores](https://pagespeed.web.dev/analysis/https-next-sanity-template-demo-vercel-app/df9thblp9o?form_factor=desktop) on desktop and 98/100 on mobile.

🚀 Checkout the [demo site](https://next-sanity-template-demo.vercel.app), [playground](https://next-sanity-template-demo.vercel.app/playground) and [docs](https://next-sanity-template-demo.vercel.app/docs) page.

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Time-based revalidation](#time-based-revalidation)
- [Visual Editing](#visual-editing)
- [Staging](#staging)
- [Helpful Resources](#helpful-resources)
- [External References](#external-references)

## Key Features

- Modern Frontend Development with Next.js (App Router, RSC, Typescript) and Tailwind CSS.
- [Pre-configured Sanity schema](/sanity/schemas/index.ts) for rapid content structuring.
- [Pre-built frontend components](/next/src/ui/) for rapid website development.
- [Visual editing](#visual-editing) in Presentation mode inside the Sanity Studio.
- Auto-generated [sitemap.xml](/next/src/app/sitemap.ts) and [blog rss.xml](/next/src/app/blog/rss.xml/route.ts).

## Getting Started

### 1. Start a new repo with the [GitHub template](https://github.com/new?template_name=next-sanity-template&template_owner=nuotsu)

### 2. Retrieve a new Sanity project ID

```sh
npm -y create sanity@latest
```

> [!NOTE]
> The CLI will ask to create new a directory with the Sanity files, but you can remove once the project ID is retrieved.

### 3. Update environment variables

```sh
# /next/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID = ...
NEXT_PUBLIC_SANITY_TOKEN = ... # retrieve from https://sanity.io/manage
NEXT_PUBLIC_REVALIDATE = ... # number in seconds; leave empty for `revalidate: false`

# /sanity/.env.local
SANITY_STUDIO_PROJECT_ID = ...
SANITY_STUDIO_PREVIEW_URL = ... # your live or staging site URL
```

### 4. Populate the Sanity project with content

- Site settings ([sanity/schemas/documents/site.ts](sanity/schemas/documents/site.ts))
- Pages ([sanity/schemas/documents/page.ts](sanity/schemas/documents/page.ts))
- Blog posts ([sanity/schemas/documents/blog.post.ts](sanity/schemas/documents/blog.post.ts))

> [!IMPORTANT]
> Required: Add a page with the slug `index` for the Homepage<br>
> Optional: Add a page with the slug `404` for the 404 page

### 5. Set up the Sanity Dashboard with your deployment service

```sh
# Vercel — https://www.sanity.io/plugins/vercel-dashboard-widget
npm i sanity-plugin-dashboard-widget-vercel

# Netlify — https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify
npm i sanity-plugin-dashboard-widget-netlify
```

### 6. Customize the frontend

Feel free to adjust styles, add more schema and modules, and more.

## Time-based Revalidation

Set `NEXT_PUBLIC_REVALIDATE` (optional) environment variable to allow [time-based revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation) for published Sanity documents.

Leave blank to disable revalidation (`{ next: { revalidate: false } }`).

```sh
# /next/.env.local
NEXT_PUBLIC_REVALIDATE = 3600	# every hour
```

When empty (`revalidate: false`), published Sanity documents will only be pushed to the live site when a new deployment is triggered.

## Visual Editing

> [!NOTE]
> Currently in beta; Currently only works on the local development environment of the Sanity Studio.

Content can be edited and previewed live from the Sanity Presentation mode by navigating to the **Editor** tab in the Studio.

## Staging

Create a new git branch (call it anything—e.g. `staging` or `preview`) and set an environment variable specific to that branch in your deployment service (Vercel or Netlify):

```sh
# Environment variable for the staging branch (in Vercel, Netlify, etc.)
ENABLE_PREVIEW = true
```

Now you can use the preview deployment URL to share staged content (unpublished changes) with your team or clients.

## Other Helpful Resources

- Global TypeScripts types useable in the Next.js frontend
  - [Sanity types](/next/src/types/Sanity.d.ts)
- [`<Img>` and `<Source> components`](/next/src/ui/Img.tsx) to display Sanity images
- [Helper functions](/sanity/src/utils.ts) to:
  - structure the Sanity Studio
  - prepare the preview for PortableText content

## External References

- [The official Sanity toolkit for Next.js](https://www.sanity.io/plugins/next-sanity)
- [Visual Editing with Next.js App Router and Sanity Studio](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [`sanity-io/next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
