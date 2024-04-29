# Changelog

# 1.6.0

- Add [Richtext](/sanity/schemas/modules/richtext-module.ts) module
- Add [Docs](https://next-sanity-template-demo.vercel.app/docs) page
- Add Categories component for blog categories
- Move `BASE_URL` into [`/next/src/lib/processUrl.ts`](/next/src/lib/processUrl.ts)

## 1.5.1

- Add `ink` and `canvas` colors to the [Tailwind config](/next/tailwind.config.ts)
- Add [Pretitle](/next/src/ui/Pretitle.tsx) component
- Add styling/layout options and sub modules to the [Creative](/sanity/schemas/modules/creative-module.ts) module
- Add skip-to-content link

## 1.5.0

- Add `navigation` document
- Add [Social](/next/src/ui/Social.tsx) component
- Add `generateStaticParams` for dynamic routes
- Move global Sanity GROQ queries to [next/src/lib/sanity.ts](/next/src/lib/sanity.ts)
- Add options to [`processUrl`](/next/src/lib/processUrl.ts)

## 1.4.2

- Add `PostPreview` styling
- Add a mobile toggle option for the header
- Add `closeAfterNavigate` parameter for `<InteractiveDetails>`

## 1.4.1

- Update demo site styles
- Add [`.accordion`](/next/src/styles/app.css) class
- Add [Custom HTML](/sanity/schemas/modules/custom-html.ts) module
- Add [Creative](/sanity/schemas/modules/creative-module.ts) module

## 1.4.0

- Add `processUrl()` to handle website URLs
- Add canonical links
- Add RSS alternate link

## 1.3.5

- Add documentation for setting up [live previews](./README.md#live-previews)

## 1.3.4

- Add RSS for blog posts
- Start CHANGELOG.md
