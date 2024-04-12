# Next.js + Sanity.io Starter Template

## Key Features

- Modern Frontend Development with Next.js (App Router + RSC) and Tailwind CSS
- Pre-built Sanity schema for rapid [webpage](sanity/src/defaultDocumentNode.ts) and [blog](sanity/src/defaultDocumentNode.ts) development
- Auto-generated [sitemap.xml](sanity/src/defaultDocumentNode.ts)
- Live previews (somewhat) when set up with a git branch ([`sanity/src/defaultDocumentNode.ts`](sanity/src/defaultDocumentNode.ts))

## Getting Started

1. [Create a new repo using this template](https://github.com/new?template_name=next-sanity-template&template_owner=nuotsu)
2. Run `npm -y create sanity@latest` in order to grab a new Sanity project ID
3. Replace `projectId` with the new project ID

- [sanity/sanity.cli.ts](sanity/sanity.cli.ts)
- [sanity/sanity.config.ts](sanity/sanity.config.ts)
- [next/.env.local](next/.env.local) (duplicate [.env.example](next/.env.example))
  - [retrieve a token from Sanity](https://sanity.io/manage) to allow for live previews

4. Populate the Sanity project documents

- Site settings ([sanity/schemas/documents/site.ts](sanity/schemas/documents/site.ts))
- Pages ([sanity/schemas/documents/page.ts](sanity/schemas/documents/page.ts))

  - Added pages with the slugs: `index` and `404`

- Blog posts ([sanity/schemas/documents/post.ts](sanity/schemas/documents/post.ts))

5. Setup the Sanity Dashboard with your deploment service

- For Vercel, run `npm i sanity-plugin-dashboard-widget-vercel`
- For Netlify, run `npm i sanity-plugin-dashboard-widget-netlify`

## Helpful Resources

- Global Types in Next.js
  - [Sanity types](next/src/types/Sanity.d.ts)
- [`<Img>`](next/src/ui/Img.tsx) component for Sanity CDN images

## Resources

- [Official Next.js + Sanity setup documentation article](https://www.sanity.io/plugins/next-sanity)
- [`sanity-io/next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
