---
name: new-module
description: Create a new Sanity module named $ARGUMENTS following the established pattern for this project. Work through each step in order.
---

## Before you begin — confirm fields

If the user has not already specified the fields for this module, ask before proceeding:

> **What fields should this module have?**

When the user provides field names, infer the type from the name before asking. Only ask for clarification when the type is genuinely ambiguous.

Common inferences:
| Field name pattern | Inferred type |
|---|---|
| `intro`, `content`, `body`, `description` | `array of block` (PortableText) |
| `pretitle`, `title`, `subtitle`, `label`, `name`, `value`, `suffix` | `string` |
| `ctas` | `array of type cta` |
| `icon` | `image` |
| `image`, `photo`, `thumbnail`, `cover` | `image` |
| `theme`, `layout`, `variant`, `size`, `color` | `string` with `options.list` (ask for allowed values) |
| `items`, `cards`, `steps`, `features`, `accordions`, `stats` | `array of objects` (ask for sub-fields) |
| `logos`, `people`, `quotes` | `array of references` (ask for reference type) |

Once fields are confirmed (and any ambiguous types resolved), proceed with the steps below.

---

## Step 1 — Create the schema file

**File:** `src/sanity/schemaTypes/modules/<module-name>.ts`

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
   import myModule from './modules/my-module'
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

---

## Step 4 — Update the GROQ query (only if needed)

**File:** `src/sanity/lib/queries.ts` → `MODULES_QUERY`

Only add an entry here if the module has nested CTAs with links, reference fields, or other joins. Skip this step if the module has only simple scalar/block fields.

```groq
_type == 'my-module' => {
	items[]{
		...,
		ctas[]{
			...,
			link{ ${LINK_QUERY} }
		}
	}
},
```

Reference field pattern (e.g. logo, person, quote):

```groq
_type == 'my-module' => {
	items[]{
		...,
		_type == 'reference' => @->
	}
},
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
- **Scaffolded** → use the confirmed fields and their types to generate a reasonable Tailwind layout (e.g. grid for cards/items, `<dl>` for stats, `<details>` for accordions, prose header for intro, CTA row for ctas). Base the structure on similar existing modules in `src/ui/modules/` where applicable.

Create the file at `src/ui/modules/<module-name>.tsx`:

```tsx
import { PortableText, stegaClean } from 'next-sanity'
import type { MyModule } from '@/sanity/types'
import { Module } from '.'

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

After creating the file, ask:

> **Does this module have any client-side interactivity?** (e.g. state, effects, event handlers, browser APIs)

If **yes**: convert to the subdirectory layout so a sibling `client.tsx` with `'use client'` can live alongside it:

1. Move `src/ui/modules/<module-name>.tsx` → `src/ui/modules/<module-name>/index.tsx`
2. Update the `Module` import from `'.'` to `'..'`

**Notes:**

- Import the type from `@/sanity/types` using the PascalCase name from typegen
- Always spread `...props` — it carries `_key`, `_type`, and `attributes` for `<Module>`
- `<Module>` sets `id`, `data-module`, `hidden`, and injects scoped CSS on the root element (default `<section>`; use `as="nav"` etc. when needed)
- Wrap `stegaClean()` around any string field used in conditional logic (e.g. `theme`, `layout`)
- Use `PortableText` from `next-sanity` for `array of block` fields

---

## Step 7 — Register the component

**File:** `src/ui/modules/index.tsx`

1. Import at the top (alphabetical with other imports):

```tsx
import MyModule from './my-module' // single-file layout

// import MyModule from './my-module/index' // subdirectory layout (equivalent, explicit)
```

2. Add to `MODULES_MAP` (alphabetical order):

```ts
'my-module': MyModule,
```

---

## Verification checklist

- [ ] `bun run typegen` exits with no errors
- [ ] TypeScript compiles cleanly (no IDE errors, or `bun run build` passes)
- [ ] Module appears as an option in Sanity Studio when adding modules to a page
- [ ] Component renders (even if empty) when module is added to a page in preview
