---
name: new-module
description: Create a new Sanity module named $ARGUMENTS following the established pattern for this project. Work through each step in order.
---

## Before you begin — confirm fields

If the user has not already specified the fields for this module, ask before proceeding:

> **What fields should this module have?**

When the user provides field names, infer the type from the name before asking. Only ask for clarification when the type is genuinely ambiguous.

Common inferences:

| Field name pattern                                                  | Inferred type                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------- |
| `intro`, `content`, `body`, `description`                           | `array of block` (PortableText)                       |
| `pretitle`, `title`, `subtitle`, `label`, `name`, `value`, `suffix` | `string`                                              |
| `ctas`                                                              | `array of type cta`                                   |
| `icon`                                                              | `image`                                               |
| `image`, `photo`, `thumbnail`, `cover`                              | `image`                                               |
| `theme`, `layout`, `variant`, `size`, `color`                       | `string` with `options.list` (ask for allowed values) |
| `items`, `cards`, `steps`, `features`, `accordions`, `stats`        | `array of objects` (ask for sub-fields)               |
| `logos`, `people`, `quotes`                                         | `array of references` (ask for reference type)        |

Once fields are confirmed (and any ambiguous types resolved), proceed with the steps below.

Modules are colocated under `src/modules/<module-name>/` (folder name = Sanity `_type`). Shared blog UI that is not a module lives in `src/ui/blog/`.

---

## Step 1 — Create the module folder + schema

**File:** `src/modules/<module-name>/schema.ts`

Use [`defineModule`](src/sanity/schemaTypes/fragments/define-module.ts) instead of `defineType`. It prepends the `attributes` (`module-attributes`) field, appends an **Options** group, wires `preview.select.hidden` for the Studio list badge, and sets the shared `modulePreview` component—do **not** add those by hand.

```ts
import { defineArrayMember, defineField } from 'sanity'
import { FooIcon } from '@sanity/icons/Foo'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'my-module',
	title: 'My module',
	type: 'object',
	icon: FooIcon,
	groups: [
		{ name: 'content', default: true },
		// { name: 'asset' },   // add if module has a dedicated image tab
		// Do NOT add { name: 'options' } — defineModule appends it
	],
	fields: [
		// Add your fields here — examples:
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		// Nested array of objects:
		defineField({
			name: 'items',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'item',
					type: 'object',
					fields: [
						defineField({ name: 'title', type: 'string' }),
						defineField({
							name: 'body',
							type: 'array',
							of: [{ type: 'block' }],
						}),
						defineField({ name: 'ctas', type: 'array', of: [{ type: 'cta' }] }),
					],
					preview: {
						select: { title: 'title', body: 'body' },
						prepare: ({ title, body }) => ({
							title: title || getBlockText(body),
							subtitle: 'Item',
						}),
					},
				}),
			],
			group: 'content',
		}),
	],
	preview: {
		select: { intro: 'intro', items: 'items' },
		prepare: ({ intro, items }) => ({
			title: getBlockText(intro) || count(items, 'item'),
			subtitle: 'My module',
		}),
	},
})
```

**Notes:**

- **Groups:** List only non-options groups (e.g. `content`, optional `asset`, `layout`, `html`/`css` as needed). `defineModule` always appends `{ name: 'options' }` and places `attributes` there. Omit `groups` entirely if everything is ungrouped (still get Options + attributes).
- **Do not** declare an `attributes` field or `components.preview`—`defineModule` injects them.
- **`preview.prepare`:** Return only `title` / `subtitle` / `media` as usual; `hidden` for the list badge is merged in automatically.
- Use `getBlockText` for PortableText preview, `count` for array lengths — both from `@/lib/utils`
- Use `fieldsets` with `options: { columns: 2 }` to visually group related inline fields in Studio

---

## Step 2 — Register the schema

**File:** `src/sanity/schemaTypes/index.ts`

1. Import at the top under `// modules` (alphabetical order):

   ```ts
   import myModule from '@/modules/my-module/schema'
   ```

2. Add to `schema.types` array under `// modules` (alphabetical order):
   ```ts
   myModule,
   ```

---

## Step 3 — Add to the module fragment

**File:** `src/sanity/schemaTypes/fragments/modules.ts`

Add to the `of` array (alphabetical order):

```ts
{ type: 'my-module' },
```

Optionally add to an `insertMenu.groups` entry if it belongs to a logical group (e.g. `hero`, `blog`).

Studio grid previews load `/module-thumbnails/${module}.webp`. When you add a thumbnail, place it at `public/module-thumbnails/<module-name>.webp` (match the module `_type` filename).

---

## Step 4 — Add a GROQ query fragment (only if needed)

**File:** `src/modules/<module-name>/query.ts`

Only create this file if the module has nested CTAs with links, reference fields, or other joins. Skip this step if the module has only simple scalar/block fields.

Export an **uppercase** named constant: `_type` → `SCREAMING_SNAKE` + `_QUERY` (e.g. `my-module` → `MY_MODULE_QUERY`).

If the fragment needs `LINK_QUERY`, import it from `@/sanity/lib/fragments` (not from `queries.ts` — that would create a circular import):

```ts
import { groq } from 'next-sanity'
import { LINK_QUERY } from '@/sanity/lib/fragments'

// @sanity-typegen-ignore
export const MY_MODULE_QUERY = groq`
	_type == 'my-module' => {
		items[]{
			...,
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		}
	}
`
```

Otherwise export a plain string fragment:

```ts
import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const MY_MODULE_QUERY = groq`
	_type == 'my-module' => {
		items[]->
	}
`
```

Then wire it into `MODULES_QUERY` in `src/sanity/lib/queries.ts`:

```ts
import { MY_MODULE_QUERY } from '@/modules/my-module/query'

export const MODULES_QUERY = groq`
	...,
	ctas[]{ ..., link{ ${LINK_QUERY} } },
	sidebar{ ${SIDEBAR_QUERY} },
	${MY_MODULE_QUERY},
	// …
`
```

Top-level CTAs on the module itself are already covered by the top-level `ctas[]` clause in `MODULES_QUERY` — no need to repeat them inside the conditional block.

---

## Step 5 — Run typegen

```bash
bun run typegen
```

This regenerates `src/sanity/types.ts`. The new module type will be exported as a named type in PascalCase matching the schema `name` (e.g. `my-module` → `MyModule`). Fix any errors before proceeding.

---

## Step 6 — Create the frontend component

First, ask:

> **Should the JSX be left empty (placeholder only) or scaffolded with basic Tailwind layout?**

- **Empty** → leave a `{/* content area */}` comment inside the section; just render confirmed fields with minimal wrappers
- **Scaffolded** → use the confirmed fields and their types to generate a reasonable Tailwind layout (e.g. grid for cards/items, `<dl>` for stats, `<details>` for accordions, prose header for intro, CTA row for ctas). Base the structure on similar existing modules in `src/modules/` where applicable.

Then ask:

> **Does this module need to fetch its own Sanity data** (e.g. a live list, search results — anything beyond what's already resolved by the page's `MODULES_QUERY`)? Most modules don't — they only render props already resolved by the page query.

#### No independent fetch (default)

Create the file at `src/modules/<module-name>/index.tsx`:

```tsx
import { PortableText, stegaClean } from 'next-sanity'
import { Module } from '@/modules'
import type { MyModule } from '@/sanity/types'

export default function ({ intro, items, ctas, ...props }: MyModule) {
	return (
		<Module className="section space-y-8" {...props}>
			{intro && (
				<header className="prose mx-auto max-w-4xl text-center">
					<PortableText value={intro} />
				</header>
			)}

			{/* content area */}
		</Module>
	)
}
```

#### Fetches its own data

Model this on `src/modules/blog-index/index.tsx`. The exported component receives `perspective`/`stega` (`DynamicFetchOptions`) as props and awaits a sibling `'use cache'` fetch helper — it does not fetch directly in its own body:

```tsx
import { groq } from 'next-sanity'
import { Suspense } from 'react'
import { Module, type ModuleProps } from '@/modules'
import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import type { MY_MODULE_QUERY_RESULT, MyModule } from '@/sanity/types'

export default async function ({
	intro,
	perspective,
	stega,
	...props
}: MyModule & ModuleProps & DynamicFetchOptions) {
	const items = await getItems({ perspective, stega })

	return (
		<Module className="section space-y-8" {...props}>
			{/* render `items`; wrap any independently-streamed part (pagination, filters) in its own <Suspense fallback={...}> */}
		</Module>
	)
}

async function getItems({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({ query: MY_MODULE_QUERY, perspective, stega })
	return data as MY_MODULE_QUERY_RESULT
}

const MY_MODULE_QUERY = groq`
	*[_type == 'my-doc-type']{ ... }
`
```

This module also needs a registration step in [Step 7](#step-7--register-the-component) that no-fetch modules skip. For the full explanation of `perspective`/`stega` and cache boundaries, see the `sanity-live-cache-components` skill's `reference/three-layer-pattern.md`.

After creating the file, ask:

> **Does this module have any client-side interactivity?** (e.g. state, effects, event handlers, browser APIs)

If **yes**: keep `index.tsx` as a server component and add sibling `'use client'` files in the same folder (e.g. `client.tsx`, `store.ts`).

**Notes:**

- Import the type from `@/sanity/types` using the PascalCase name from typegen
- Always spread `...props` — it carries `_key`, `_type`, and `attributes` for `<Module>`
- `<Module>` sets `id`, `data-module`, `hidden`, and injects scoped CSS on the root element (default `<section>`; use `as="nav"` etc. when needed)
- Wrap `stegaClean()` around any string field used in conditional logic (e.g. `theme`, `layout`)
- Use `PortableText` from `next-sanity` for `array of block` fields

---

## Step 7 — Register the component

**File:** `src/modules/index.tsx`

1. Import at the top (alphabetical with other imports):

```tsx
import MyModule from '@/modules/my-module'
```

2. Add to `MODULES_MAP` (alphabetical order):

```ts
'my-module': MyModule,
```

3. **If this module fetches its own data** (answered "yes" in Step 6), also add a case to `moduleSpecificProps` in this same file:

```ts
case 'my-module':
	return { perspective, stega }
```

Skipping this is silent — the module still renders, but its `'use cache'` fetch always resolves the published/non-stega view, so draft mode and Visual Editing never show up for it.

---

## Verification checklist

- [ ] `bun run typegen` exits with no errors
- [ ] TypeScript compiles cleanly (no IDE errors, or `bun run build` passes)
- [ ] Module appears as an option in Sanity Studio when adding modules to a page
- [ ] Component renders (even if empty) when module is added to a page in preview
- [ ] If a thumbnail was added: `public/module-thumbnails/<name>.webp` exists
- [ ] If the module fetches its own data: it's registered in `moduleSpecificProps`, its `<Suspense>` fallback shows then resolves to real content, and draft-mode edits are visible when previewing
