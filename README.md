# SanityPress

> _Ready, Set, Impress._

An opinionated, fully customizable Next.js (App Router) and Sanity starter template with Tailwind CSS and pre-built schema for rapid website development.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnuotsu%2Fsanitypress&env=NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_DATASET,NEXT_PUBLIC_SANITY_TOKEN&envDescription=Values%20needed%20to%20connect%20a%20Sanity%20CMS&envLink=https%3A%2F%2Fsanitypress.dev%2Fdocs%2Fgetting-started&demo-title=SanityPress&demo-description=Official%20website%20and%20blog%20for%20SanityPress%2C%20built%20with%20SanityPress&demo-url=https%3A%2F%2Fsanitypress.dev&demo-image=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Felyfelq1%2Fproduction%2F7fb61a2b110f509582f0f43cb1e397f8fa9e5c07-2814x1798.png%3Fw%3D1600)

![](https://cdn.sanity.io/images/elyfelq1/production/a095b5478b3173381915c5a0a973fdb3d8898094-5088x3458.jpg)

Visit [here](https://sanitypress.dev/studio-screenshots) for more Studio screenshots.

- [x] 🖋️ Published on [Sanity.io](https://www.sanity.io/templates/sanitypress)
- [x] ⚡ [Perfect Lighthouse scores](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsanitypress.dev%2F) on desktop and 99/100 on mobile.
- [x] 🚀 Checkout the [demo site](https://sanitypress.dev), [documentation](https://sanitypress.dev/docs) and [blog](https://sanitypress.dev/blog).

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Helpful Resources (The SanityPress Blog)](https://sanitypress.dev/blog)
- [External References](#external-references)

## Key Features

- [x] ✨ Modern Frontend Development with Next.js 15 (App Router, RSC, Typescript) and Tailwind CSS.
- [x] 📕 [Pre-configured Sanity schema](/sanity/schemas/index.ts) for rapid content structuring.
- [x] 📘 [Pre-built frontend components](/next/src/ui/) for rapid website development.
- [x] ✏️ [Visual editing](https://sanitypress.dev/blog/visual-editing) right inside the [Embedded Sanity Studio](https://sanitypress.dev/blog/why-you-should-embed-your-studio).
- [x] 📜 Auto-generated Table of Contents component based on headings.
- [x] ⌨️ Auto-generated [sitemap.xml](/next/src/app/sitemap.ts) and [blog rss.xml](/next/src/app/blog/rss.xml/route.ts).

## Getting Started

Directions are also found on the [docs](https://sanitypress.dev/docs).

### 1. New repo

Clone or fork the template from [the GitHub template](https://github.com/nuotsu/sanitypress).

### 2. Get a new Sanity project ID

From the [Sanity.io Manage](https://sanity.io/manage) dashboard, create a new project _from scratch (blank schema) with CLI_.

### 3. Update environment variables

```sh
# .env.local
NEXT_PUBLIC_BASE_URL = ... # https://sanitypress.dev
NEXT_PUBLIC_SANITY_PROJECT_ID = ... # abcdefgh
NEXT_PUBLIC_SANITY_DATASET = ... # production
NEXT_PUBLIC_SANITY_TOKEN = ... # "Viewer" token from https://sanity.io/manage
```

### 4. Populate the Studio with your content

Open your new Sanity Studio (`‌https://localhost:3000/admin`) and publish the following documents:

1. a **Site** document with a `title` field.
2. a **Page** document with slug: `index` to use as the _Home_ page.

For websites with a blog, additionally publish the following documents:

1. a **Page** document with slug: `blog` to use as the _Blog listing_ page.
2. a **Page** document with slug: `blog/*` to use as the _Blog post_ template page.

Optionally, you can publish the following documents:

- a **Page** document with slug: `404` to use as the _Page not found_ page.

#### Import a demo dataset

You can run a CLI command to import demo content to get SanityPress up and running in seconds.

```sh
sanity dataset import sanity/demo.tar.gz
```

This will import a Site document and a Page document with slug: index, the minimum requirements for SanityPress to deploy successfully.

### 5. Set up deployments

Install either of the following plugins to add a widget to your Studio Dashboard:

- Vercel: [`sanity-plugin-dashboard-widget-vercel`](https://www.sanity.io/plugins/vercel-dashboard-widget)
- Netlify: [`sanity-plugin-dashboard-widget-netlify`](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify)

### 6. Customize

Adjust frontend styles, edit/add Sanity schema and modules, and more.

## External References

- [The official Sanity toolkit for Next.js](https://www.sanity.io/plugins/next-sanity)
- [`sanity-io/next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
- [Visual Editing with Next.js App Router and Sanity Studio](https://www.sanity.io/guides/nextjs-app-router-live-preview)

## How to Support

- [🧡 Donations](https://sanitypress.dev/how-to-support)
- [🩷 Sponsor on GitHub](https://github.com/sponsors/nuotsu)
- [☕ Buy me a coffee](https://buymeacoffee.com/nuotsu)
