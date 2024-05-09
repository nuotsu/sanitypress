# Next.js + Sanity.io Starter Template

> An opinionated and minimally styled starter template with Tailwind CSS and pre-built schema for rapid website development.

🖋️ Published on [Sanity.io](https://www.sanity.io/templates/next-sanity-template)

🚀 Checkout the [demo site](https://next-sanity-template-demo.vercel.app) and the [docs](https://next-sanity-template-demo.vercel.app) page.

⏱️ For the latest updates, view the [changelog](/CHANGELOG.md).

## Table of Contents

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Staging](#staging)
- [Visual Editing](#visual-editing)
- [Helpful Resources](#helpful-resources)
- [External References](#external-references)

## Key Features

- Modern Frontend Development with Next.js (App Router, RSC, Typescript) and Tailwind CSS.
- [Pre-configured Sanity schema](/sanity/schemas/index.ts) for rapid content structuring.
- [Pre-built frontend components](/next/src/ui/) for rapid website development.
- [Visual editing](#visual-editing) in Presentation mode inside the Sanity Studio.
- Auto-generated [sitemap.xml](next/src/app/sitemap.ts) and [blog rss.xml](next/src/app/blog/rss.xml/route.ts).

## Getting Started

### 1. Create a new repo with the [GitHub template](https://github.com/new?template_name=next-sanity-template&template_owner=nuotsu)

### 2. Grab a new Sanity project ID

```sh
npm -y create sanity@latest
```

> [!NOTE]
> The CLI will ask to create new directory with the Sanity files, but you can remove once the project ID is retrieved.

### 3. Update environment variables

#### `.env.local`

- For the Next.js frontend:

```sh
NEXT_PUBLIC_SANITY_PROJECT_ID = ...
NEXT_PUBLIC_SANITY_TOKEN = ... # Retrieve from https://sanity.io/manage
```

- For the Sanity Studio:

```sh
SANITY_STUDIO_PROJECT_ID = ...
SANITY_STUDIO_PREVIEW_URL = ...
```

#### Sanity Project ID (`projectId`)

- [sanity/sanity.cli.ts](sanity/sanity.cli.ts)
- [sanity/sanity.config.ts](sanity/sanity.config.ts)
- [next/.env.local](next/.env.local) (duplicate [.env.example](next/.env.example))
  - [retrieve a token from Sanity](https://sanity.io/manage) to allow for live previews

#### Production URL / Domain (`BASE_URL`)

- [next/src/lib/processUrl.ts](next/src/lib/processUrl.ts)

### 4. Populate the Sanity project

- Site settings ([sanity/schemas/documents/site.ts](sanity/schemas/documents/site.ts))
- Pages ([sanity/schemas/documents/page.ts](sanity/schemas/documents/page.ts))

> [!IMPORTANT]
> Required: Add a page with the slug `index` for the Homepage<br>
> Optional: Add a page with the slug `404` for the 404 page

- Blog posts ([sanity/schemas/documents/blog.post.ts](sanity/schemas/documents/blog.post.ts))

### 5. Set up the Sanity Dashboard with your deployment service

#### For [Vercel](https://www.sanity.io/plugins/vercel-dashboard-widget):

```sh
npm i sanity-plugin-dashboard-widget-vercel
```

#### For [Netlify](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify):

```sh
npm i sanity-plugin-dashboard-widget-netlify
```

### 6. Customize the frontend

Feel free to adjust styles and add more modules.

## Staging

Create a new git branch (call it anything—e.g. `staging` or `preview`) and set an environment variable specific to that branch in your deployment service (Vercel or Netlify):

```sh
git checkout -b staging   # can be any name
```

Set in `next/src/lib/env.ts`:

```sh
ENABLE_PREVIEW = true
```

## Visual Editing

## Helpful Resources

- Global Types in Next.js
  - [Sanity types](next/src/types/Sanity.d.ts)
- [`<Img>`](next/src/ui/Img.tsx) component for Sanity CDN images

## External References

- [Official Next.js + Sanity setup documentation article](https://www.sanity.io/plugins/next-sanity)
- [`sanity-io/next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
