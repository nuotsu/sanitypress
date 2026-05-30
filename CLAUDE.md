# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start dev server (Next.js + Sanity Studio)
bun run build        # Production build
bun run typecheck    # TypeScript type check (no emit)
bun run typegen      # Regenerate src/sanity/types.ts from schema + queries
```

After any schema or GROQ query change, always run `bun run typegen` to keep `src/sanity/types.ts` in sync.

## Architecture

This is a **Next.js 16 (App Router) + Sanity CMS** site with full TypeGen type safety.

- **Frontend:** `src/app/(frontend)/` — catch-all route `[[...slug]]` renders any page by fetching a `page` document from Sanity and piping its `modules[]` array through `ModulesResolver`.
- **Studio:** `src/app/(studio)/admin/` — embedded Sanity Studio served at `/admin`.
- **Live Content API:** `sanityFetchLive` (from `src/sanity/lib/live.ts`) is used for all page data fetches; it supports Sanity's real-time Visual Editing.

### Page rendering flow

1. `[[...slug]]/page.tsx` fetches a `page` document with `PAGE_QUERY`.
2. `PAGE_QUERY` assembles `modules[]` by concatenating global-before + path-before + page + path-after + global-after modules (all resolved via `MODULES_QUERY`).
3. `<ModulesResolver>` (`src/ui/modules/index.tsx`) maps each `_type` to a React component via `MODULES_MAP`.

### Module system

Every page section is a **module**: a Sanity schema object + a React component. Adding a new module requires changes in 5 places — use `/new-module` to do this automatically:

| Step                      | File                                                                          |
| ------------------------- | ----------------------------------------------------------------------------- |
| 1. Schema                 | `src/sanity/schemaTypes/modules/<module-name>.ts`                             |
| 2. Schema index           | `src/sanity/schemaTypes/index.ts`                                             |
| 3. Modules fragment       | `src/sanity/schemaTypes/fragments/modules.ts`                                 |
| 4. GROQ query (if needed) | `src/sanity/lib/queries.ts` → `MODULES_QUERY`                                 |
| 5. Frontend component     | `src/ui/modules/<module-name>.tsx` (or `/<module-name>/index.tsx` for client) |
| 6. Component index        | `src/ui/modules/index.tsx` → `MODULES_MAP`                                    |

**Schema:** Use `defineModule` (not `defineType`) from `src/sanity/schemaTypes/fragments/define-module.ts`. It auto-injects the `attributes` field, `options` group, and Studio preview component — never add these manually.

**Component:** Always spread `...props` into `<Module>` (default `as="section"`). This wires up `id`, `data-module`, `hidden`, and scoped CSS for Visual Editing.

```tsx
import { Module } from '.'

export default function ({ intro, ...props }: MyModule) {
	return (
		<Module className="section" {...props}>
			<div>...</div>
		</Module>
	)
}
```

**GROQ query:** Only add a `_type == 'my-module' => { ... }` block to `MODULES_QUERY` if the module has nested CTAs with links, references, or other joins. Simple scalar/block-only modules need no entry.

**TypeGen types:** After `bun run typegen`, the module type is exported from `src/sanity/types.ts` as PascalCase (e.g. `my-module` → `MyModule`). Import it from `@/sanity/types`.

### Key utilities (`src/lib/utils.ts`)

- `getBlockText(block)` — extracts plain text from a PortableText block array (use in schema `preview.prepare`)
- `count(arr, singular)` — formats `"3 items"` (use in schema `preview.prepare`)
- `cn(...classes)` — `clsx` + `tailwind-merge`

### Global modules

`global-module` documents in Sanity can inject modules before/after any page matching a path pattern. The wildcard `path == '*'` applies globally; specific paths use prefix matching with optional `excludePaths`.

### Environment variables

Defined in `.env.local` (copy from `.env.example`):

```
NEXT_PUBLIC_BASE_URL           # Production domain
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN          # "Viewer" permissions
```

`ROUTES` in `src/lib/env.ts` controls URL path prefixes (e.g. `blog: 'blog'`).

### Sanity schema layout

```
src/sanity/schemaTypes/
  documents/    # Top-level content types: page, blog.post, site, navigation, etc.
  modules/      # Page-building blocks (one file per module type)
  objects/      # Reusable field groups: cta, link, metadata, module-attributes
  fragments/    # Shared helpers: define-module.ts, modules.ts (fragment field), GROQ fragments
```

### Styling

Tailwind 4 with PostCSS. Global styles in `src/app.css`. Use `cn()` for conditional class merging.
