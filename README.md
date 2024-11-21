# 🖤 SanityPress

> _Ready, Set, Impress._

An opinionated, fully customizable Next.js (App Router) and Sanity starter template with Tailwind CSS and pre-built schema for rapid website development.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnuotsu%2Fsanitypress&env=NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_DATASET,SANITY_API_READ_TOKEN&envDescription=Values%20needed%20to%20connect%20a%20Sanity%20CMS&envLink=https%3A%2F%2Fsanitypress.dev%2Fdocs%2Fgetting-started&demo-title=SanityPress&demo-description=Official%20website%20and%20blog%20for%20SanityPress%2C%20built%20with%20SanityPress&demo-url=https%3A%2F%2Fsanitypress.dev&demo-image=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Felyfelq1%2Fproduction%2F7fb61a2b110f509582f0f43cb1e397f8fa9e5c07-2814x1798.png%3Fw%3D1600)

![](https://cdn.sanity.io/images/elyfelq1/production/316adef6992418e80dea6e7294a380edcf1957b0-2308x1442.png)

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

- [x] ✨ Next.js 15 (App Router, RSC, Typescript) with Tailwind CSS
- [x] 📕 [Pre-configured Sanity schema](/src/sanity/schemas/index.ts)
- [x] 📘 [Pre-built frontend components](/src/ui/)
- [x] ✏️ [Visual editing](https://sanitypress.dev/blog/visual-editing) in [embedded Sanity Studio](https://sanitypress.dev/blog/why-you-should-embed-your-studio)
- [x] ⌨️ Auto-generated [sitemap](https://sanitypress.dev/sitemap.xml) and [RSS feed](https://sanitypress.dev/blog/rss.xml)

## Getting Started

Full instructions on the [docs](https://sanitypress.dev/docs).

1. **New repo**: Clone or fork the [GitHub template](https://github.com/nuotsu/sanitypress).
2. **Get Sanity project ID**: Create a new project on [Sanity.io](https://sanity.io/manage) _from scratch (blank schema) with CLI_ and retrieve the `projectId`.
3. **Update environment variables**:

```sh
# .env.local
PUBLIC_BASE_URL = ... # https://sanitypress.dev

NEXT_PUBLIC_SANITY_PROJECT_ID = ... # abcdefgh
NEXT_PUBLIC_SANITY_DATASET = ... # production

SANITY_API_READ_TOKEN = ... # "Viewer" token from https://sanity.io/manage

NEXT_PUBLIC_GITHUB_TOKEN = # used for Reputation blocks
```

4. **Add content**: Publish the **required** `site` and `page` documents.

| Document | Slug     | Use             | Required? | Notes                                                                                          |
| -------- | -------- | --------------- | :-------: | ---------------------------------------------------------------------------------------------- |
| `site`   |          | Global settings |    ✅     |                                                                                                |
| `page`   | `index`  | Homepage        |    ✅     |                                                                                                |
| `page`   | `404`    | Page not found  |           |                                                                                                |
| `page`   | `blog`   | Blog listing    |           | Add the [**Blog frontpage**](https://sanitypress.dev/docs/modules/blog-frontpage) module       |
| `page`   | `blog/*` | Blog post       |           | Add the [**Blog post content**](https://sanitypress.dev/docs/modules/blog-post-content) module |

Alternatively, you can import the [demo site](https://demo.sanitypress.dev) dataset:

```sh
sanity dataset import src/sanity/demo.tar.gz
```

5. **Set up deployments**: Add a [Vercel](https://www.sanity.io/plugins/vercel-dashboard-widget) or [Netlify](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify) widget to enable deployments from the Studio.

6. **Customize**: Adjust frontend styles, edit/add Sanity schema and modules, and more.

## External References

- [Sanity toolkit for Next.js](https://www.sanity.io/plugins/next-sanity)
- [`next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
- [Visual Editing with Next.js and Sanity](https://www.sanity.io/guides/nextjs-app-router-live-preview)

## How to Support

- [🧡 Donations](https://sanitypress.dev/how-to-support)
- [🩷 Sponsor on GitHub](https://github.com/sponsors/nuotsu)
- [☕ Buy me a coffee](https://buymeacoffee.com/nuotsu)
