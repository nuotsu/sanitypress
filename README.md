# Next.js + Sanity + Template

> A Next.js (App router), Sanity.io and Tailwind CSS starter template.

Referenced documentation: [`next-sanity` README](https://github.com/sanity-io/next-sanity#readme)

## Initialize a Sanity project and grab the project ID

1. `sanity/sanity.cli.ts`
2. `sanity/sanity.config.ts`
3. `next/.env.local`
   - Also retrieve a [token from Sanity](https://sanity.io/manage) to allow for live previewing in dev mode.

## Global Types

Types, including Sanity schema, are stored in `next/src/types/*.d.ts` and can be accessed globally in the `next/` directory (import unncecessary) with `<namespace>.<type>`.

```ts
await fetch<Sanity.Page>("...");
            ^
```

## Images (`<Img>`)

In Next.js, serve images from Sanity using the custom `<Img>` component. This component is a wrapper around the [next/image](https://nextjs.org/docs/api-reference/next/image) component. It will automatically generate a `srcset` and `sizes` attribute for the image, and will also lazy load the image.

Utilize the `options.imageBuilder` prop to serve the appropriate size of the image based on the width. Typically, you want to set the width (or height) to 2x the actual size displayed in the viewport.

```tsx
"use client"; // required if using `options.imageBuilder`

import Img from "@/ui/Img";

<Img
  image={image}
  alt="..."
  options={{
    imageBuilder: (b) => b.width(200), // for a 100px wide image
  }}
/>;
```

## Resources

- [Official Next.js + Sanity setup documentation article](https://www.sanity.io/plugins/next-sanity)
