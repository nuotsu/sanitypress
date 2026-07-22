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
4. Check for relevant per-instance `skill` documents before drafting any copy — see the `check-studio-skills` skill (query `_type == "skill"`, surface/confirm anything relevant, e.g. a `content-guidelines` doc, before Phase 1 copywriting).

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

> Here's the plan — **[Home, About, Services, Pricing, FAQ, Contact]**. For each, here's the structure and draft copy:
> - **Home:** hero "[headline]" → services → stats → testimonial → CTA …
> - **About:** …
>
> Do you also want a **blog**? Look good, or want changes to any page or wording?

- **Ask explicitly about a blog.** Only build the blog system (see "Blog setup") if the user says yes — it pulls in extra documents and a global template.
- Draft **genuine, on-brand copy** in the chosen tone — read like a real site, never lorem ipsum.
- **Facts vs. demo content:** never fabricate *verifiable* facts — real prices, specific claims, named real clients, hard stats. Where one is needed and unknown, use a clearly-marked `[ADD PRICING]`-style placeholder and list every marker at the end. *Illustrative* content that any demo site needs (sample testimonials, team members, partner logos) is created as realistic, authentic-sounding placeholders per the "Content documents" policy — plausible names/titles/quotes, not "Lorem ipsum" or "Person 1".
- Adjust the page set to what the business actually needs (e.g. drop Pricing for custom-quote lead-gen; add a Gallery for a visual brand).
- Only after pages **and** copy are confirmed, proceed to build (Build order → Phases 2–5).

---

## Build order & dependencies (follow this sequence)

Documents reference each other, and **only published documents render** — references resolve with GROQ `->`, so a draft target shows as nothing. Build in dependency order so nothing renders empty or broken:

1. **Content documents first** — generate the brand `logo` and create + publish it, plus the `person` / `quote` docs that list modules reference (and `blog.category` + author `person` if a blog was requested). See "Content documents".
2. **Pages** — create every `page` document so each has an `_id` to link to. You can attach modules now, or add them in step 5.
3. **Navigation** — create the header / footer / social `navigation` docs, referencing page `_id`s. See Phase 3.
4. **Site (singleton)** — create the **single** `site` document referencing the navigation docs, `logo`, header `ctas[]`, and `copyright`. There must be exactly **one** `site` doc (queries use `[0]`).
5. **Patch cross-references** — fill in any CTA/nav `link` that points to a page which didn't exist when its parent was created.
6. **Publish everything** (Phase 5). Drafts don't appear on the frontend.

Global CSS (Phase 2) can be created any time before publish.

---

## Content documents (create + publish FIRST)

Four list-style modules render **nothing** unless their referenced documents exist **and are published**. Create and publish these before adding the module:

| Module | References | Document type → required fields |
|---|---|---|
| `logo-list` | `logos[]` → | `logo`: `title`, `image.default` (also optional `image.light` / `image.dark`) |
| `person-list` | `people[]` → | `person`: `name`, `title` (role), `image` |
| `quote-list` | `quotes[]` → | `quote`: `quote` (Portable Text), `author.name`, optional `author.title` / `author.image` |
| `form-module` | `form` → | `form`: `identifier`, `endpoint` — **see forms note below** |

Reference shape inside the module array, e.g. `person-list`:
```
{ _type:'person-list', _key:'<k>',
  people:[ { _type:'reference', _key:'<k>', _ref:'<personDocId>' }, … ] }
```

**Authentic-placeholder policy.** Auto-create these backing docs with **realistic, brand-appropriate** content — never lorem ipsum, never "Person 1" / "Company A". Plausible full names + job titles, believable testimonial quotes written in the brand tone, sensible partner/company names. Generate matching placeholder images (headshots for people, wordmark-style images for logos) with the MCP image tools. If a *verifiable* real detail is required (a real client's name, a real quote), use a flagged `[ADD …]` marker instead and list it at the end.

**Logo (always generate one).** Every site needs a brand mark. Generate a fitting logo with the MCP image tools that matches the **brand from Phase 1** — use the chosen `--color-primary`/palette and the **heading font** (`--font-serif`) for a wordmark, or a simple geometric mark + wordmark, on a **transparent background**. Then create a `logo` document and wire it into `site.logo`:
- `image.default` — the primary logo (required).
- `image.light` — optional light/white version for dark backgrounds (header overlays, footer); generate it if the design uses dark sections.
- `image.dark` — optional dark version for light backgrounds.

Prefer a clean wordmark in the brand fonts/colors over a busy illustration. If the user provides a real logo asset, use it instead of generating one. The `logo` doc must be **published** for the header/footer to show it.

**Forms note (content-only limitation).** A `form` document only stores an `identifier` + `endpoint`; the actual fields live in code/backend, so a working form **cannot** be built through content alone. **Default Contact to a `callout` (or `hero.split`) with a `mailto:` / `tel:` CTA.** Only use `form-module` if the user supplies a real submission `endpoint` URL.

---

## Phase 2 — CSS architecture

SanityPress has **three** CSS layers. Use them in this order of preference. All CSS lives in `code`-typed fields — remember every code value is an object: `{ _type: 'code', language: 'css', code: '<the css>' }`.

### Styling: deviate from the defaults to match the brand
The template's stock styles are a **starting point, not a constraint**. Overriding or fully replacing them to better fit the brand direction from Phase 1 is **encouraged and expected** — a site that looks generically "SanityPress" is a worse result than one that looks like the business. Common things to restyle (with their real class hooks, so selectors match):
- **Eyebrows** — `.eyebrow` (also `.technical`): change case, color, letter-spacing, or drop the uppercase/mono look entirely.
- **CTAs / buttons** — `.action`, `.action-outline`, `.ghost`, `.link`, and the container `.cta-list`: restyle colors, radius, padding, borders, hover/active.
- **Cards & items** — `card-list` renders each card as `article.prose` inside a `div.grid` (restyle the cards *and* the grid for bento/custom layouts); `quote-list` cards are `article.border-stroke.bg-background`; `stat-list` uses `dl > div > dt` (value `.h0`, suffix `.h3`) + `dd.prose`.
- **Step items** — `step-list` (`section[data-module="step-list"]`) is an `ol.grid` of `li.gap-ch`, each led by a numbered badge `span.h3.bg-foreground.text-background.size-lh` (digit drawn via `content: counter(step)`) with the body in `div.prose`. Restyle the badge shape/color/size and the step rhythm to the brand.
- **Accordion items** — `accordion-list` renders native `details.accordion.border-stroke` rows (`not-last:border-b`) with a `summary.font-bold` trigger + chevron `svg` (the `.accordion` utility rotates it when open) and a `div.prose` body. Restyle the divider/border, summary type, and chevron rather than leaving the default rows.

Mechanics:
- **Site-wide** restyle → put the overrides in the **Layer 1** global stylesheet (e.g. redefine `.action`, `.eyebrow`).
- **One instance** → use the module's **Layer 3** `scopedCss` with `:scope` (e.g. `:scope .action { … }`).
- Injected CSS lands after the head styles, so a selector matching a utility class wins by source order at equal specificity; if an override doesn't take, bump specificity (`:scope .action`, `:where(.eyebrow)`, etc.).
- Every module root also carries a stable `[data-module="<type>"]` attribute (e.g. `section[data-module="card-list"]`) — prefer it as a type-targeted hook for Layer 1 global overrides, since it won't break if a Tailwind utility class changes.
- Still prefer **design tokens** over hardcoded hex, and keep it **light-mode only** (see Layer 3).

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
      :scope { background: var(--color-foreground); color: var(--color-background); }
      :scope .grid { display:grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }
    ` }
  },
  // ...fields
}
```

**Use design tokens, not hardcoded hex** — `var(--color-primary)`, `var(--color-foreground)`, `var(--color-background)`, `var(--color-stroke)` — so per-module CSS stays on-brand and consistent. The template is **light-mode only** (no dark mode); don't add `prefers-color-scheme` logic.

You can also set `attributes.uid` (string → becomes the element `id`, for deep links) and `attributes.hidden` (boolean).

### Full-bleed background-image hero (common for the homepage)
**Prefer the dedicated `hero.cover` module** for this — it's purpose-built for a full-bleed background image with overlaid copy, so it needs **no CSS hacks**. Set its `image` (with optional `image.mobile` portrait crop and `image.opacity` to dim), `eyebrow`/`content`/`ctas[]`, and use the `verticalAlign` (top/center/bottom) + `textAlign` (left/center/right) fields to place the copy. The component renders the image full-bleed behind the copy and **auto-switches text to the background color when `image.opacity > 0.5`** for legibility — so setting `opacity` (e.g. `0.5`) doubles as a built-in scrim; no manual overlay needed.

**Fallback — `hero.split` + `scopedCss`** (only if you need the split layout's other fields, or you're editing an existing `hero.split`): a `hero.split` with an image can be coerced into the same full-width background treatment. Its DOM is `<section class="section …"> > <figure>` (the image) `+ <header class="prose">` (eyebrow/copy/CTAs). Achieve the background treatment with `scopedCss` on that hero module:
```
:scope { max-width: initial; display: block; position: relative; padding-block: 8rem; }
:scope > figure { position: absolute; inset: 0; margin: 0; z-index: 0; }
:scope > figure img { width: 100%; height: 100%; object-fit: cover; }
:scope > header { position: relative; z-index: 1; color: var(--color-background); }
```
Why each line:
- `max-width: initial` removes the `.section` `max-w-7xl` cap so the section spans the **full container width** (edge-to-edge) — this is the key override.
- `display: block` collapses the default `md:grid-cols-2` so the copy overlays the image instead of sitting beside it.
- The absolute `figure` with `inset: 0` fills the section's padding box, so the image covers edge-to-edge while the `header` copy stays within `.section` padding.
- Give the `header` a contrasting color (token-based) and/or add a scrim — e.g. `:scope::before { content:''; position:absolute; inset:0; background: color-mix(in oklab, var(--color-foreground) 45%, transparent); z-index:0; }` — so text stays legible over the image.

### Module-choice rules
- **Never** create new module files or change schema. Compose from existing types only.
- **`card-list` is the Swiss-army knife** — use it with `scopedCss` grids for bento/feature/team/pricing layouts.
- **`custom-html`** is the last resort for genuinely custom UI. Never put `<style>` tags inside the `html` field — use the `css` field.

---

## Phase 3 — Site settings & navigation

Create `navigation` docs first (they reference pages), then the `site` singleton (it references the navigation docs).

### Navigation docs
A `navigation` doc has `title`, optional `blurb` (Portable Text, shown in footer), and `items[]`. Each item is one of:
- **`link`** — a single link (the `link` object: `label`, `type:'internal'|'external'`, `internal` ref or `external` URL, optional `params`).
- **`link.list`** — a dropdown / footer group: a parent `link` plus `links[]` (array of `link`s).
- **`megamenu`** — a multi-column header menu: a parent `link` plus `items[]` of `link.list` (and/or `link`).

Build **three** navigation docs and wire them from `site`:
- **Header** (`site.header`): top-level `link`s, with `link.list`/`megamenu` for dropdowns.
- **Footer** (`site.footer`): `link.list` groups (heading + links). Megamenus are ignored in the footer.
- **Social** (`site.social`): plain `link`s with `external` URLs. The UI **auto-maps known domains to brand icons** (facebook, x/twitter, linkedin, github, instagram, youtube, tiktok, yelp); non-`link` items are ignored, so keep social items as flat `link`s.

Header nav example:
```
{ _type:'navigation', title:'Header', items:[
  { _type:'link', _key:'a', label:'About', type:'internal', internal:{ _type:'reference', _ref:'<aboutId>' } },
  { _type:'link.list', _key:'b',
    link:{ _type:'link', label:'Services', type:'internal', internal:{ _type:'reference', _ref:'<servicesId>' } },
    links:[ { _type:'link', _key:'b1', label:'Pricing', type:'internal', internal:{ _type:'reference', _ref:'<pricingId>' } } ] }
] }
```
Footer group example: same `link.list` shape. Social example: `{ _type:'link', _key:'s1', label:'Instagram', type:'external', external:'https://instagram.com/<handle>' }`.

### Site singleton
Exactly **one** `site` document:
```
{ _type:'site', title:'[BUSINESS NAME]',
  logo:{ _type:'reference', _ref:'<logoDocId>' },         // a published, generated `logo` doc (see Content documents)
  ogimage:{ _type:'image', asset:{ _type:'reference', _ref:'image-…' } },  // global social fallback
  header:{ _type:'reference', _ref:'<headerNavId>' },
  footer:{ _type:'reference', _ref:'<footerNavId>' },
  social:{ _type:'reference', _ref:'<socialNavId>' },
  ctas:[ { _type:'cta', _key:'c1', link:{ … }, theme:'action' } ],   // header CTA(s) — make the primary CTA `action`
  copyright:[ /* Portable Text */ ] }
```

Create these as drafts, then publish (Phase 5).

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
| `hero.cover` | Full-bleed cover hero (homepage / landing page lead) | `eyebrow`, `content` (blocks), `ctas[]`, `image` (`opacity`/`mobile`/`loading`/`alt`), `verticalAlign`, `textAlign` |
| `hero.split` | Page hero w/ image | `eyebrow`, `content` (blocks), `ctas[]`, `image` |
| `prose` | Rich text / article body | `content` (blocks, images, code), `sidebar` |
| `callout` | Highlighted CTA banner | `eyebrow`, `intro` (blocks), `ctas[]` |
| `card-list` | Features, services, team, pricing, bento | `eyebrow`, `intro`, `cards[]` (`image`/`icon`/`eyebrow`/`content`/`ctas`), `ctas[]`, `layout` (`grid`\|`carousel`), `columns` |
| `stat-list` | Metrics / numbers | `eyebrow`, `intro`, `stats[]` (`value`, `suffix`, `content`) |
| `step-list` | How-it-works / process | `intro`, `ctas[]`, `steps[]` (`content`, `ctas`), `enableSchema` |
| `accordion-list` | FAQ | `intro`, `ctas[]`, `accordions[]` (`summary`, `content`, `open`), `exclusive`, `layout` |
| `logo-list` | Logo wall / "as seen in" | `eyebrow`, `intro`, `logos[]` → **needs published `logo` docs** |
| `person-list` | Team / people | `intro`, `people[]` → **needs published `person` docs**, `columns` |
| `quote-list` | Testimonials | `eyebrow`, `intro`, `quotes[]` → **needs published `quote` docs**, `layout` |
| `form-module` | Contact / signup form | `form` → **needs a `form` doc + real endpoint; otherwise use a mailto CTA** |
| `breadcrumbs` | Breadcrumb nav | `crumbs[]` |
| `custom-html` | Page CSS / bespoke HTML | `html` (code), `css` (code), `className` |
| `search-module` | On-page search | — |
| `blog-index`, `blog-post-list` | Blog listing pages | auto-query published posts, no refs (only if Blog requested) |

**Restyle the repeating items to the brand.** `eyebrow`s, `cta` actions, and the items in `card-list` / `stat-list` / `step-list` / `accordion-list` / `quote-list` are expected to be reskinned via Layer 1 / Layer 3 CSS (see Phase 2 → "deviate from the defaults"), not left at their default look.

Modules marked **needs published … docs** render empty without their backing documents — see "Content documents". `blog-post-content` is **not** a page module — it lives only in a `global-module` before/after as the blog post template.

### Suggested page → module recipes
- **Home:** `hero.cover` (full-bleed lead) → `card-list` (services) → `stat-list` → `quote-list`/`logo-list` → `callout`. `hero.cover` gives the homepage a full-bleed background-image hero natively (see Phase 2 → "Full-bleed background-image hero").
- **About:** `hero.split` → `prose` → `person-list` → `stat-list` → `callout`.
- **Destinations/Services:** `hero.split` → `card-list` (one card per item) → `callout`.
- **Packages/Pricing:** `card-list` (pricing tiers via `scopedCss`) → `accordion-list` (FAQ) → `callout`.
- **FAQ:** `hero.split` (short) → `accordion-list` → `callout`.
- **Contact:** `hero.split` (short) → `callout` with a `mailto:`/`tel:` CTA (default). Use `form-module` only if the user gave a real endpoint.

### One H1 per page
Each page should have **exactly one `h1`** — put it in the opening hero's `content` (style `h1`), whether that's a `hero.cover` (homepage/landing leads) or a `hero.split`. All later section modules lead with `h2`/`h3`. Use the `eyebrow` string fields (hero, card-list, callout, stat-list, step-list) for small uppercase section labels above the heading.

### SEO & metadata (per page)
- `metadata.title` ≤ 60 chars, `metadata.description` ≤ 160 chars.
- The site **auto-generates an OG image** from the title, splitting on `|`/`-`/`—` into a headline + subhead — so format titles as **`"Main | Subtitle"`** (e.g. `"Pricing | [Business]"`). Only set `metadata.image` to override with a real asset.
- `site.ogimage` is the global social fallback (set once on the `site` doc).
- **Add a `404` page:** `page` with slug `404`, a short `prose`/`hero.split` message + a CTA home, and `metadata.noIndex: true` (keeps it out of the sitemap). Optionally a `search` page if you use `search-module`.

---

## Blog setup (only if the user said yes in Phase 1)

Skip this entirely unless a blog was requested. A working blog needs these, in order:

1. **`blog.category`** doc(s): `title` (slug auto-derives). At least one.
2. **Author** — a published `person` doc (reuse the team docs or create one).
3. **`blog.post`** doc(s): `title`, `content` (Portable Text — blocks, images w/ `alt`, code), `publishDate`, `categories[]` (refs to `blog.category`), `author` (ref to `person`), and `metadata` (`slug`, `title`, `description`, optional `image`). Posts live at `/blog/<slug>`.
4. **Post template** — a `global-module` with `path: 'blog/'` whose `before[]` (or `after[]`) contains a **`blog-post-content`** module. This is what actually renders each post's title/byline/content; without it, blog post pages are blank. `blog-post-content` may carry a `sidebar` (position + `tableOfContents`/`callout`/`custom-html`).
5. **Blog index** (optional) — a `page` with slug `blog` containing a `blog-index` module (or `blog-post-list`). These auto-query all published posts, so no references are needed.

Publish categories + author **before** posts, and posts **before** the index renders them.

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

**Images:** by default, **generate placeholder imagery** with the MCP image tools (`generate_image`, then `transform_image` to fit) so every page looks complete out of the box — heroes, cards, team headshots, logos. Match the prompts to the brand direction from Phase 1. If the user supplies real assets, use those instead. Reference shape: `{ _type:'image', asset:{ _type:'reference', _ref:'image-…' }, alt:'…' }` — **`alt` lives on the image object**, not the asset.
- **Hero image** (`hero.split.image`): set `loading:'eager'` and a meaningful `alt`; sub-fields `onRight` (desktop side) / `afterContent` (mobile order) control placement. Only the first above-the-fold hero should be `eager`.
- **Cover hero image** (`hero.cover.image`): same `loading:'eager'` + meaningful `alt` for the lead hero; add an optional `image.mobile` (portrait crop for small screens) and set `image.opacity` (e.g. `0.5`) to dim the background for text contrast.
- **Prose / content images:** meaningful `alt` (+ optional `figcaption`); these stay lazy.
- **Decorative images** (card `image`/`icon`): set `alt:''`.

**`_key` on every array member.** Each item in any array (`modules`, `cards`, `ctas`, `stats`, `accordions`, `children`, `before`…) needs a unique `_key`.

**Internal links / refs across not-yet-created pages:** create all `page` docs first (so each has an id), then patch in CTAs/nav links that reference them, then publish.

---

## Phase 5 — Publish

1. `create_documents` produces **drafts** — they are not live until published.
2. After creating + linking everything, call `publish_documents` for every doc: the content docs (`logo`/`person`/`quote`, and blog docs if any), `navigation`(s), `site`, `global-module`(s), and each `page`. **Publish referenced docs before (or with) the docs that point to them** — an unpublished target renders as nothing.
3. **Exceptions:**
   - The pre-existing `index` page: `patch_documents` then `publish_documents` (don't recreate).
   - **Do not publish a page whose `modules` array is empty** — leave it as a draft and tell the user.
4. Report back: list each published page with its slug/URL path, and note anything left as a draft.

---

## Verification checklist
- [ ] `get_schema` was read before any write; all `_type`s and field names match the live schema.
- [ ] Discovery ran in order (business → intent/CTA → brand → pages+copy); brand and page list were confirmed, not invented.
- [ ] Build order followed: content docs → pages → navigation → `site` → patch refs → publish. Exactly **one** `site` doc.
- [ ] Every `logo-list`/`person-list`/`quote-list`/`form-module` has its backing docs **created and published** — no list module renders empty.
- [ ] Placeholder content is authentic (no lorem ipsum / "Person 1"); verifiable unknowns flagged with `[ADD …]` and listed at the end.
- [ ] Contact uses a `mailto:`/`tel:` CTA (or a `form-module` only with a real endpoint).
- [ ] Global CSS lives in a `custom-html` inside a `global-module` (`path:"*"`) `before[]` — not a non-existent `css` field.
- [ ] All `html`/`css`/`scopedCss` values are `code` objects (`{_type:'code',language,code}`), never raw strings; `scopedCss` is under `attributes`, uses `:scope` and design tokens.
- [ ] Each page has exactly one `h1` (in the hero); sections use `h2`/`h3`. Every page has `title` + `metadata.slug.current`; home uses `index` (patched, not recreated).
- [ ] Stock styles were **deviated from** to match the brand — eyebrows, CTAs, and `card`/`stat`/`step`/`accordion`/`quote` items are reskinned, not left generically "SanityPress"; any full-bleed hero renders edge-to-edge with legible copy.
- [ ] A brand `logo` was generated (matching palette + heading font) or supplied, published, and referenced from `site.logo`.
- [ ] Titles formatted `"Main | Subtitle"`; a `404` page exists with `noIndex: true`; `site.ogimage` set.
- [ ] Hero image is `eager` with `alt`; content images have `alt`; decorative images use `alt:''`.
- [ ] If a blog was requested: categories + author + posts + a `blog/` `global-module` with `blog-post-content` all exist and are published.
- [ ] No new module/schema/code files were created. Every array member has a unique `_key`.
- [ ] All non-empty docs published; empty-module pages left as drafts and reported.
- [ ] **Rendered site checked** — load the frontend (dev server or deployed URL): every page renders, nav links resolve, images load, and no module is visibly empty.
