---
name: build-website
description: Build out a complete SanityPress website — all pages, content, navigation, and CSS — entirely through the Sanity MCP connector, using only existing modules. No code files are edited. Use when the user wants a full site created for a business/brand from a brief.
---

Build a complete, publishable SanityPress website for **[BUSINESS NAME]** using **only the Sanity MCP connector**. You write and publish all content; you do **not** edit, scaffold, or add any code files (no new modules, no schema changes). Compose everything from the existing module types.

This skill assumes the SanityPress schema (page, site, navigation, global-module, the module objects) is already deployed and the Sanity MCP connector is connected. If it is not connected, stop and ask the user to connect it.

---

## Phase 0 — Connect & load the schema

1. Confirm the Sanity MCP connector is available (`list_projects` / `whoami`). If multiple projects exist and the target is ambiguous, ask which **project id** and **dataset** to use. Default dataset: `production`.
2. **Always** call `get_schema` first. Do not write any document until you have read the live schema — field names, `code`-typed fields, and module `_type`s must match exactly.
3. If unsure about any field shape, call `search_docs` / `read_docs` before guessing.

---

## Phase 1 — Discovery (ask in this order, before building)

Discovery is sequential **on purpose**: understand the business first, because the answers shape every later question and all the page copy. Do not jump ahead to colors/fonts before you understand what the site is for. Skip any question the user has already answered, and infer sensible defaults rather than asking about things the earlier answers already make obvious.

**Run the steps one at a time and wait for confirmation at each.** Ask Step 1 and wait, then Step 2 and wait, and so on. Don't batch them or start building before each step is confirmed — each step's answers should visibly inform the next question/proposal. (Step 0 is the Phase 0 prerequisites check; confirm those before Step 1.)

**Thin brief?** If the user gives only a little (e.g. just a name, or "just build it"), don't stall and don't invent silently: infer a likely answer for the current step, present it as a concrete proposal, and move on once they confirm or adjust. Lead with the proposal, not a wall of questions.

### Step 0 — Confirm technical prerequisites
Before any discovery, confirm the Phase 0 prerequisites are met: Sanity MCP connected, target project id + dataset known, `get_schema` loaded. If not, resolve that first.

### Step 1 — Tell me about the business
Lead here so you can write real copy, not lorem ipsum, and so everything downstream follows from substance:

> First, tell me about the business:
> 1. **What is it?** Name + one line on what you do/sell.
> 2. **Who's it for?** Target customer/audience.
> 3. **What makes you different?** Selling points, offerings, or proof (stats, testimonials, clients) I can turn into real content.

### Step 2 — Intent & primary call-to-action
Now pin down what the site is *for* — this drives page priority, hero CTAs, and which `cta` themes/links to use:

> What's the site meant to achieve?
> 1. **Primary goal?** (e.g. get bookings, generate leads, sell products, build credibility, take signups)
> 2. **Main call-to-action?** The single action you most want a visitor to take (e.g. "Book a call", "Request a quote", "Buy now") — and where it should point.
> 3. Any secondary action? (optional)

Make the primary CTA the dominant `cta` (`theme: 'action'`) in the hero and callout modules; secondary actions use `action-outline`/`ghost`/`link`.

### Step 3 — Brand, design direction & tone
Propose a direction derived from Steps 1–2 (business + intent), and confirm it:

> Based on that, I'm thinking a **[proposed feel]** look with a **[tone]** voice — palette of **[BG/FG/PRIMARY]** and fonts **[heading] / [body]**. Run with this, or adjust?

- **Tone of voice** (e.g. premium & understated, friendly & casual, bold & energetic, technical & precise) governs how all copy is written.
- Map the visual answer to: `--color-background`, `--color-foreground`, `--color-primary`, a **body** Google Font (`--font-sans`) and a **heading** Google Font (`--font-serif`).
- Recommend a fitting direction rather than asking open-endedly — but don't finalize a brand the user hasn't confirmed.

### Step 4 — Confirm pages & copy
Propose the page list (tailored to the business + primary goal, with a slug for each) **and a copy outline for each page** — the modules it'll use and the headline/key messages — so the user approves the actual words before anything is published:

> Here's the plan — **[Home, About, Services, Pricing, FAQ, Contact]** (Blog optional). For each, here's the structure and draft copy:
> - **Home:** hero "[headline]" → services → stats → testimonial → CTA …
> - **About:** …
>
> Look good, or want changes to any page or wording?

- Draft **genuine copy** in the chosen tone — never invent facts (prices, claims, testimonials, client names). Where a real detail is unknown, use a clearly-marked placeholder like `[ADD PRICING]` and list every such marker at the end.
- Adjust the page set to what the business actually needs (e.g. drop Pricing for custom-quote lead-gen; add a Gallery for a visual brand).
- Only after pages **and** copy are confirmed, proceed to build (Phases 2–5).

---

## Phase 2 — CSS architecture

SanityPress has **three** CSS layers. Use them in this order of preference. All CSS lives in `code`-typed fields — remember every code value is an object: `{ _type: 'code', language: 'css', code: '<the css>' }`.

### Layer 1 — Global stylesheet (tokens, fonts, base type)
There is **no `css` field on `global-module`.** Instead, create/find a `global-module` document with `path: "*"` and put a **`custom-html` module in its `before[]` array** holding the global CSS in `css.code`. It renders on every page.

```
global-module {
  _type: 'global-module',
  path: '*',                      // the field is "path", value "*" = all pages
  before: [
    {
      _type: 'custom-html', _key: '<key>',
      css: { _type: 'code', language: 'css', code: `
        @import url('https://fonts.googleapis.com/css2?family=[BODY_FONT]&family=[HEADING_FONT]&display=swap');

        :root {
          --font-sans: '[BODY_FONT]', sans-serif;
          --font-serif: '[HEADING_FONT]', serif;
          --color-background: [BG];
          --color-foreground: [FG];
          --color-primary: [PRIMARY];
        }

        /* headings use the serif token (SanityPress h-base only sets font-weight) */
        :is(h1,h2,h3,h4,h5,h6) { font-family: var(--font-serif); }
      ` }
    }
  ]
}
```

The injected `<style>` is **global and not auto-scoped**, so `:root`/`@import`/`@font-face` work correctly here. Redefining `--font-sans` / `--color-*` in `:root` overrides the Tailwind `@theme` defaults (it appears later in source order).

### Layer 2 — Per-page styles
Add a `custom-html` module to a page's `modules[]` with CSS in `css.code`. It only loads on that page. Because the injected style is global while present, **scope page rules under a page-specific class or `#id`** (or a wrapper) to avoid bleed. Put the `custom-html` module first in the array if its CSS targets later modules.

### Layer 3 — Per-module scoped CSS (preferred for layout tweaks)
Every module object carries an `attributes` object. Set `attributes.scopedCss` (a **code object**) and SanityPress wraps it in `@scope{…}` on that module's root element. Select the module root with `:scope`:

```
{
  _type: 'card-list', _key: '<key>',
  attributes: {
    _type: 'module-attributes',
    scopedCss: { _type: 'code', language: 'css', code: `
      :scope { background: [BG]; }
      :scope .grid { display:grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }
    ` }
  },
  // ...fields
}
```

You can also set `attributes.uid` (string → becomes the element `id`, for deep links) and `attributes.hidden` (boolean).

### Module-choice rules
- **Never** create new module files or change schema. Compose from existing types only.
- **`card-list` is the Swiss-army knife** — use it with `scopedCss` grids for bento/feature/team/pricing layouts.
- **`custom-html`** is the last resort for genuinely custom UI. Never put `<style>` tags inside the `html` field — use the `css` field.

---

## Phase 3 — Site settings & navigation

1. **`site`** (singleton, required): `title`, optional `logo`, `header`/`footer`/`social` references to `navigation` docs, top-level `ctas[]`, `copyright`.
2. **`navigation`** docs for header and footer, then reference them from `site`. Nav `items[]` use `link` objects (see link shape below) or `link.list` / `megamenu`.
3. Create these as drafts, then publish (Phase 5).

---

## Phase 4 — Build the pages

For each page create a `page` document. **Required:** `title` and `metadata.slug.current`. Home page slug is `index`.

```
{
  _type: 'page',
  title: '[PAGE TITLE]',
  metadata: {
    _type: 'metadata',
    slug: { _type: 'slug', current: '[slug]' },   // 'index' for home
    title: '[SEO title ≤60 chars]',
    description: '[meta description ≤160 chars]',
    noIndex: false
  },
  modules: [ /* module objects, each with a unique _key and a _type */ ]
}
```

⚠️ **The `index` page already exists with zero modules.** Do **not** recreate it — `patch_documents` to set its `modules`/`metadata`, then publish.

### Available module `_type`s (page `modules[]`)
| `_type` | Use for | Key content fields |
|---|---|---|
| `hero.split` | Page hero w/ image | `eyebrow`, `content` (blocks), `ctas[]`, `image` |
| `prose` | Rich text / article body | `content` (blocks, images, code), `sidebar` |
| `callout` | Highlighted CTA banner | `eyebrow`, `intro` (blocks), `ctas[]` |
| `card-list` | Features, services, team, pricing, bento | `eyebrow`, `intro`, `cards[]` (`image`/`icon`/`eyebrow`/`content`/`ctas`), `ctas[]`, `layout` (`grid`\|`carousel`), `columns` |
| `stat-list` | Metrics / numbers | `eyebrow`, `intro`, `stats[]` (`value`, `suffix`, `content`) |
| `step-list` | How-it-works / process | `intro`, `ctas[]`, `steps[]` (`content`, `ctas`), `enableSchema` |
| `accordion-list` | FAQ | `intro`, `ctas[]`, `accordions[]` (`summary`, `content`, `open`), `exclusive`, `layout` |
| `logo-list` | Logo wall / "as seen in" | `logos[]` (references to `logo` docs) |
| `person-list` | Team / people | references to `person` docs |
| `quote-list` | Testimonials | references to `quote` docs |
| `form-module` | Contact / signup form | reference to a `form` doc |
| `breadcrumbs` | Breadcrumb nav | `crumbs[]` |
| `custom-html` | Page CSS / bespoke HTML | `html` (code), `css` (code), `className` |
| `search-module` | On-page search | — |
| `blog-index`, `blog-post-list` | Blog listing pages | (only if Blog is included) |

`blog-post-content` is **not** a page module — it lives only in a `global-module` before/after for the blog post template.

### Suggested page → module recipes
- **Home:** `hero.split` → `card-list` (services) → `stat-list` → `quote-list`/`logo-list` → `callout`.
- **About:** `hero.split` → `prose` → `person-list` → `stat-list` → `callout`.
- **Destinations/Services:** `hero.split` → `card-list` (one card per item) → `callout`.
- **Packages/Pricing:** `card-list` (pricing tiers via `scopedCss`) → `accordion-list` (FAQ) → `callout`.
- **FAQ:** `hero.split` (short) → `accordion-list` → `callout`.
- **Contact:** `hero.split` (short) → `form-module` (or `callout` with mailto CTA if no form doc).

---

## Content field shapes (write these correctly via MCP)

**Portable Text** (`content`/`intro`/`body` = `array of block`):
```
[
  { _type:'block', _key:'<k>', style:'h2',     markDefs:[], children:[{_type:'span',_key:'<k>',text:'Heading',marks:[]}] },
  { _type:'block', _key:'<k>', style:'normal', markDefs:[], children:[{_type:'span',_key:'<k>',text:'Body copy.',marks:[]}] }
]
```
Styles: `normal`, `h1`–`h6`, `blockquote`. Bold/italic via `marks: ['strong']` / `['em']`.

**CTA** (`ctas[]` items are `cta` objects):
```
{ _type:'cta', _key:'<k>',
  link:{ _type:'link', label:'Book now',
         type:'internal', internal:{ _type:'reference', _ref:'<pageId>' } },   // internal: ref a page
  // or:  type:'external', external:'https://…' (also mailto:/tel:)
  theme:'action' }   // 'action' | 'action-outline' | 'ghost' | 'link'
```
`link` `params` (e.g. `#section` or `?x=1`) applies to internal links only.

**Images:** by default, **generate placeholder imagery** with the MCP image tools (`generate_image`, then `transform_image` to fit) so every page looks complete out of the box — heroes, cards, team headshots, etc. Match the prompts to the brand direction from Phase 1. If the user supplies real assets, use those instead. Reference an asset as `{ _type:'image', asset:{ _type:'reference', _ref:'image-…' }, alt:'…' }`, and always set descriptive `alt`.

**`_key` on every array member.** Each item in any array (`modules`, `cards`, `ctas`, `stats`, `accordions`, `children`, `before`…) needs a unique `_key`.

**Internal links / refs across not-yet-created pages:** create all `page` docs first (so each has an id), then patch in CTAs/nav links that reference them, then publish.

---

## Phase 5 — Publish

1. `create_documents` produces **drafts** — they are not live until published.
2. After creating + linking everything, call `publish_documents` for every doc: `site`, `navigation`(s), `global-module`, and each `page`.
3. **Exceptions:**
   - The pre-existing `index` page: `patch_documents` then `publish_documents` (don't recreate).
   - **Do not publish a page whose `modules` array is empty** — leave it as a draft and tell the user.
4. Report back: list each published page with its slug/URL path, and note anything left as a draft.

---

## Verification checklist
- [ ] `get_schema` was read before any write; all `_type`s and field names match the live schema.
- [ ] Brand direction (palette + fonts) was confirmed with the user, not invented.
- [ ] Global CSS lives in a `custom-html` inside a `global-module` (`path:"*"`) `before[]` — not a non-existent `css` field.
- [ ] All `html`/`css`/`scopedCss` values are `code` objects (`{_type:'code',language,code}`), never raw strings.
- [ ] `scopedCss` is under each module's `attributes`, using `:scope`.
- [ ] Every page has `title` + `metadata.slug.current`; home uses `index` (patched, not recreated).
- [ ] No new module/schema/code files were created.
- [ ] Placeholder images were generated (brand-matched) for heroes/cards/people unless the user supplied real assets; all images have `alt`.
- [ ] Every array member has a unique `_key`.
- [ ] All non-empty docs published; empty-module pages left as drafts and reported.
