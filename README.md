# Next.js + Sanity.io Starter Template

🖋️ [Published on Sanity.io](https://www.sanity.io/templates/next-sanity-template)

⏱️ For the latest updates, view the [changelog](/CHANGELOG.md).

## Key Features

- Modern Frontend Development with Next.js (App Router, RSC, Typescript) and Tailwind CSS.
- Pre-configured Sanity schema for rapid [webpage](sanity/schemas/documents/page.ts) and [blog](sanity/schemas/documents/blog.post.ts) development.
- Pre-built common website components ([next/src/ui](next/src/ui)).
- Auto-generated [sitemap.xml](next/src/app/sitemap.ts) and [blog rss.xml](next/src/app/blog/rss.xml/route.ts).
- [Live previews](#live-previews) when set up with a git branch.

## Getting Started

### 1. Create a new repo with the template

👉 Check out on GitHub [nuotsu/next-sanity-template](https://github.com/new?template_name=next-sanity-template&template_owner=nuotsu)

### 2. Grab a new Sanity project ID

```sh
npm -y create sanity@latest
```

> [!NOTE]
> The CLI will ask to create new directory with the Sanity files, but you can remove once the project ID is retrieved.

### 3. Replace `projectId` with the new project ID

- [sanity/sanity.cli.ts](sanity/sanity.cli.ts#L5)
- [sanity/sanity.config.ts](sanity/sanity.config.ts#L19)
- [next/.env.local](next/.env.local) (duplicate [.env.example](next/.env.example))
  - [retrieve a token from Sanity](https://sanity.io/manage) to allow for live previews

### 4. Populate the Sanity project

- Site settings ([sanity/schemas/documents/site.ts](sanity/schemas/documents/site.ts))
- Pages ([sanity/schemas/documents/page.ts](sanity/schemas/documents/page.ts))

> [!IMPORTANT]
> Required: Add a page with the slug `index` for the Homepage<br>
> Optional: Add a page with the slug `404` for the 404 page

- Blog posts ([sanity/schemas/documents/blog.post.ts](sanity/schemas/documents/blog.post.ts))

### 5. Set up the Sanity Dashboard with your deployment service

For [Vercel](https://www.sanity.io/plugins/vercel-dashboard-widget):

```sh
npm i sanity-plugin-dashboard-widget-vercel
```

For [Netlify](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify):

```sh
npm i sanity-plugin-dashboard-widget-netlify
```

## Live Previews

1. Create a new git branch (call it anything—e.g. `staging` or `preview`) and set an environment variable specific to that branch in your deployment service (Vercel or Netlify):

```sh
git checkout -b staging
```

```sh
ENABLE_PREVIEW = true

# also set in next/src/lib/env.ts
```

2. In [sanity/src/defaultDocumentNode.ts](sanity/src/defaultDocumentNode.ts#L5), set `previewUrl` to your branch deployment URL

```ts
// e.g. Vercel
const previewUrl = "https://your-site-git-staging.vercel.app";

// e.g. Netlify
const previewUrl = "https://staging--your-site.netlify.app";
```

## Helpful Resources

- Global Types in Next.js
  - [Sanity types](next/src/types/Sanity.d.ts#L4)
- [`<Img>`](next/src/ui/Img.tsx) component for Sanity CDN images

## External References

- [Official Next.js + Sanity setup documentation article](https://www.sanity.io/plugins/next-sanity)
- [`sanity-io/next-sanity` README](https://github.com/sanity-io/next-sanity#readme)
