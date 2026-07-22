---
name: generate-markdown
description: Generate the verbatim Markdown for a `page` or `blog.post` document's `markdown` field (served at `<slug>.md` and listed in `/llms.txt`), converting Portable Text / modules into Markdown and resolving image references to Sanity CDN URLs. Use when the user asks to generate, refresh, or fill in the markdown field for a page or blog post.
---

Populate the `markdown` field (`type: 'code'`, `language: 'markdown'`) on a `page` or `blog.post` document, via the Sanity MCP connector only. This field is served verbatim at `<slug>.md` (`src/app/(frontend)/api/md/[...slug]/route.ts`) and gates whether the document appears in `/llms.txt` (`src/app/llms.txt/route.ts` requires `length(markdown.code) > 0`). Nothing generates it automatically — it's hand-curated, and this skill is that curation step.

---

## Step 1 — Load the schema and document

1. Confirm the Sanity MCP connector is available (`whoami` / `list_projects`); confirm project id + dataset (default dataset `production`).
2. Fetch the target document with `get_document` (or `query_documents` if you only have a slug, not an id).
3. Check `_type` — the source field differs:
   - `blog.post` → convert the `content` field (a Portable Text array).
   - `page` → convert the `modules` field (an array of heterogeneous module objects — see Step 4).
4. If a module or field shape is unfamiliar, read its schema at `src/modules/<module-name>/schema.ts` rather than guessing.

## Step 2 — Convert Portable Text to Markdown

Walk the block array **in order**. Transcribe verbatim — no paraphrasing, no reordering, no dropped sentences.

| Portable Text | Markdown |
|---|---|
| `style: 'normal'` | plain paragraph |
| `style: 'h1'` – `'h4'` | `#` – `####` heading |
| `style: 'blockquote'` | `> ` prefix on every line of the block |
| `listItem: 'bullet'` | `- item` |
| `listItem: 'number'` | `1. item` |
| span `marks: ['strong']` | `**text**` |
| span `marks: ['em']` | `*text*` |
| span `marks: ['code']` | `` `text` `` |
| span mark → `markDefs` link, `type: 'link'`, external (`href` present) | `[text](href)` |
| span mark → `markDefs` link, `type: 'link'`, internal (`internal._ref`) | resolve the reference to a real href first — see Step 4.2 — then `[text](href)` |
| `_type: 'code'` array member (`language`, `filename`, `code`) | fenced block, `` ```<language> ``. Put `filename` as a bold label on its own line above the fence — fences can't carry it, and the raw `.md` route has no renderer to display it otherwise. Never alter the `code` string itself. |
| `_type: 'image'` array member | see Step 3 |
| `_type: 'custom-html'` array member | drop it — raw script/widget embeds (comment widgets, analytics snippets) have no meaningful Markdown form, unless the user explicitly wants the raw HTML kept inline |

## Step 3 — Convert images to Sanity CDN links

Never call an API for this — the CDN URL is derivable directly from the asset `_ref`, which already encodes hash, dimensions, and format:

```
image-<hash>-<width>x<height>-<format>
        │
        ▼
https://cdn.sanity.io/images/<projectId>/<dataset>/<hash>-<width>x<height>.<format>
```

Example — `image-4d0bdf01ecf78080d6598084e654112af241eae6-1672x941-png` in project `cyu7k2r0` / dataset `production`:

```
https://cdn.sanity.io/images/cyu7k2r0/production/4d0bdf01ecf78080d6598084e654112af241eae6-1672x941.png
```

Render as `![alt](url)`, using the image's own `alt` field. If it also has a `figcaption` (a Portable Text array), render that as an italic line directly beneath the image: `*caption text*`. Always copy the hash/dimensions from the document's actual `asset._ref` — never invent or reuse a URL from a different image.

## Step 4 — For `page` documents: convert `modules[]`

Unlike `blog.post.content`, each entry in `modules[]` has its own schema (`src/modules/*/schema.ts`) — there's no single field to walk mechanically. For each module, in document order:

1. **Pull only reader-facing text.** Headings/intros (Portable Text, convert per Step 2), card/item titles and bodies, CTA labels + resolved hrefs, stat values/labels, accordion question/answer pairs, etc. Skip purely structural/visual fields — `attributes` (scoped CSS, `hidden`), layout options (`columns`, `theme`, `variant`, `size`) — and skip modules with no narrative content entirely (`breadcrumbs`, `search-module`'s non-heading chrome, decorative `logo-list`, `custom-html`).
2. **Resolve internal links before rendering.** A `cta.link` or an inline link mark with `type: 'internal'` only carries `internal._ref` — it is not a usable href on its own. Fetch that referenced document's `_type` and `metadata.slug.current` and build the href:
   - `metadata.slug.current == 'index'` → `/`
   - `_type == 'blog.post'` → `/${ROUTES.blog}/<slug>` (blog path segment from `src/lib/env.ts`, default `'blog'`)
   - otherwise → `/<slug>`

   This mirrors `LINK_QUERY` in `src/sanity/lib/queries.ts`. If a module has many links, write one GROQ query with that resolution (`internal->{_type, 'slug': select(...)}`) instead of resolving references one at a time.
3. There's no fixed per-module template — use judgment about what a module's fields mean as prose. As a reference point, a `card-list` module (each card holding a Portable Text `content` + `ctas`) tends to read naturally as one heading + link per card:
   ```md
   ## <card content h2 text>

   [<cta label>](<resolved href>)
   ```

## Step 5 — Frontmatter (optional, but conventional)

Existing curated markdown starts with YAML frontmatter:

```yaml
---
title: "..."
description: "..."
---
```

Reuse `metadata.title` / `metadata.description` when they read well standalone; otherwise write a short title/description by hand — they don't have to match `metadata` verbatim. This isn't enforced by any code path (the `.md` route serves `markdown.code` as-is), it's purely a convention for whoever reads `<slug>.md` — match it for consistency, but don't force it if the fields don't fit the piece.

## Step 6 — Write it back

Use `patch_documents`, setting `markdown.code` on the draft. Patch either `drafts.<id>` or the bare `<id>` — both edit the draft, which is auto-created if it doesn't exist yet; published content is never touched directly:

```json
{
  "documents": {
    "drafts.<id>": {
      "patches": [{ "set": { "markdown.code": "<full markdown string>" } }]
    }
  }
}
```

Keep `markdown.filename` / `markdown.language` if already set; otherwise set `language: 'markdown'` and a kebab-case `filename` ending in `.md`.

Changes land in the **draft only** — do not call `publish_documents` unless the user asks. Tell them the draft was updated and that publishing is what makes `<slug>.md` and the `/llms.txt` listing go live.

## Verification

- [ ] Every image in the source has a corresponding `![alt](cdn-url)` in the output, and every CDN URL's hash/dimensions trace back to a real `asset._ref` in the document.
- [ ] Every internal link resolves to a real, looked-up path — none guessed.
- [ ] Wording matches the source verbatim: no paraphrasing, no reordering, no dropped sentences.
- [ ] `markdown.language` is `'markdown'` and `markdown.filename` ends in `.md`.
- [ ] Refetch the document (or query `markdown.code`) to confirm the patch applied before reporting done.
