# SanityPress

An opinionated and minimally styled starter template with Tailwind CSS and pre-built schema and modules for rapid website development.

![](https://cdn.sanity.io/images/81pocpw8/production/02b92fc2bab8636ee7c8026292d0e8b685041538-5088x3554.jpg)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnuotsu%2Fsanitypress&env=NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_TOKEN)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nuotsu/sanitypress)

🖋️ Published on [Sanity.io](https://www.sanity.io/templates/next-sanity-template)

⚡ [Perfect Lighthouse scores](https://pagespeed.web.dev/analysis/https-sanitypress-vercel-app/fyc5qki4bd?form_factor=desktop) on desktop and 99/100 on mobile.

🚀 Checkout the [demo site](https://sanitypress.vercel.app), [documentation](https://sanitypress.vercel.app/docs) and [blog](https://sanitypress.vercel.app/blog).

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Visual Editing](#visual-editing)
- [Staging](#staging)
- [Helpful Resources (The SanityPress Blog)](https://sanitypress.vercel.app/blog)
- [External References](#external-references)

## Key Features

- Modern Frontend Development with Next.js (App Router, RSC, Typescript) and Tailwind CSS.
- [Pre-configured Sanity schema](/sanity/schemas/index.ts) for rapid content structuring.
- [Pre-built frontend components](/next/src/ui/) for rapid website development.
- [Visual editing](#visual-editing) in Presentation mode inside the Sanity Studio.
- Auto-generated [sitemap.xml](/next/src/app/sitemap.ts) and [blog rss.xml](/next/src/app/blog/rss.xml/route.ts).

## Getting Started

Directions are also found on the [docs](https://sanitypress.vercel.app/docs).

### 1. New repo

Clone, fork or use the template from [the GitHub template](https://github.com/nuots/sanitypress).

### 2. Get a new Sanity project ID

From the [Sanity.io Manage](https://sanity.io/manage) dashboard, create a new project _from scratch (blank schema) with CLI_.

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

## Visual Editing

> [!NOTE]
> Currently only works on the local development environment of the Sanity Studio.

Content can be edited and previewed live from the Sanity Presentation mode by navigating to the **Editor** tab in the Studio.

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

# Want to support future updates? [Buy me a coffee ☕!](https://buymeacoffee.com/nuotsu)
