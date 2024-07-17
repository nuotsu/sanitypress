# SanityPress

An opinionated and minimally styled starter template with Tailwind CSS and pre-built schema and modules for rapid website development.

> [⚛️ _Neutrino_, 🔭 _Umbra_ and 🍃 _Foliage_ themes](https://sanitypress.dev/themes) now available as [a bundle](https://payhip.com/b/QDUzE)!

![](https://cdn.sanity.io/images/81pocpw8/production/c2842358c289a3e6472dabe836815db2971125f9-5088x3352.jpg)

Visit [here](https://sanitypress.dev/studio-screenshots) for more Studio screenshots.

- [x] 🖋️ Published on [Sanity.io](https://www.sanity.io/templates/sanitypress)
- [x] ⚡ [Perfect Lighthouse scores](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsanitypress.dev%2F) on desktop and 99/100 on mobile.
- [x] 🚀 Checkout the [demo site](https://sanitypress.dev), [documentation](https://sanitypress.dev/docs) and [blog](https://sanitypress.dev/blog).

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Staging](#staging)
- [Helpful Resources (The SanityPress Blog)](https://sanitypress.dev/blog)
- [External References](#external-references)

## Key Features

- [x] ✨ Modern Frontend Development with Next.js (App Router, RSC, Typescript) and Tailwind CSS.
- [x] 📕 [Pre-configured Sanity schema](/sanity/schemas/index.ts) for rapid content structuring.
- [x] 📘 [Pre-built frontend components](/next/src/ui/) for rapid website development.
- [x] ✏️ [Visual editing](https://sanitypress.dev/blog/visual-editing) right inside the Embedded Sanity Studio.
- [x] 📜 Auto-generated Table of Contents component based on headings.
- [x] ⌨️ Auto-generated [sitemap.xml](/next/src/app/sitemap.ts) and [blog rss.xml](/next/src/app/blog/rss.xml/route.ts).

## Getting Started

Directions are also found on the [docs](https://sanitypress.dev/docs).

### 1. New repo

Clone, fork or use the template from [the GitHub template](https://github.com/nuotsu/sanitypress).

### 2. Get a new Sanity project ID

From the [Sanity.io Manage](https://sanity.io/manage) dashboard, create a new project _from scratch (blank schema) with CLI_.

### 3. Update environment variables

```sh
# .env.local
NEXT_PUBLIC_BASE_URL = ...
NEXT_PUBLIC_SANITY_PROJECT_ID = ...
NEXT_PUBLIC_SANITY_TOKEN = ... # retrieve from https://sanity.io/manage
```

### 4. Populate the Studio with content

Open your new Sanity Studio and add (and publish):

1. a **Site** document with a `title` field.
2. a **Page** document with the slug `index` to use as the Home page.
3. [Optional] a **Page** document with the slug `404` to use as the _Page not found_ page.

### 5. Set up deployments

Update the **Root Directory** (Vercel) / **Project Directory** (Netlify) with a value of `next`. This tells the deployment service to serve the next/ directory and not the root.

Optionally, install either of the following plugins to add a widget to your Studio Dashboard:

```sh
# Vercel — https://www.sanity.io/plugins/vercel-dashboard-widget
npm i sanity-plugin-dashboard-widget-vercel

# Netlify — https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify
npm i sanity-plugin-dashboard-widget-netlify
```

### 6. Customize the frontend

Feel free to adjust styles, add more schema and modules, and more.

## Staging

Create a new git branch (call it anything—e.g. `staging` or `preview`) and set an environment variable specific to that branch in your deployment service (Vercel or Netlify):

```sh
# Environment variable for the staging branch (in Vercel, Netlify, etc.)
ENABLE_PREVIEW = true
```

Now you can use the preview deployment URL to share staged content (unpublished changes) with your team or clients.

## External References

- [The official Sanity toolkit for Next.js](https://www.sanity.io/plugins/next-sanity)
- [`sanity-io/next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
- [Visual Editing with Next.js App Router and Sanity Studio](https://www.sanity.io/guides/nextjs-app-router-live-preview)

---

# Want to support future updates? [Purchase a theme](https://payhip.com/SanityPress) or [buy me a coffee ☕!](https://buymeacoffee.com/nuotsu)
