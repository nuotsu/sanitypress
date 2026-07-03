<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Modules that fetch their own Sanity data

A module component that runs an independent Sanity query (beyond what the page's `MODULES_QUERY` already resolves) must:

- wrap the fetch in a sibling function with `'use cache'`
- accept `perspective`/`stega` (`DynamicFetchOptions` from `@/sanity/lib/live`) as props
- register that module's `_type` in the `moduleSpecificProps` switch in `src/ui/modules/index.tsx` so `ModulesResolver` actually passes those props down

See `src/ui/modules/blog/blog-index/index.tsx` for a worked example and `.agents/skills/sanity-live-cache-components/reference/three-layer-pattern.md` for the full pattern. Missing the registration step is silent — the module still renders, but its `'use cache'` fetch always resolves the published/non-stega view, so draft mode and Visual Editing never show up for it.
