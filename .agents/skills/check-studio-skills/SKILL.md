---
name: check-studio-skills
description: Query the current Sanity Studio for custom `skill` documents — per-instance agent guidance such as content/tone conventions — and apply any that are relevant before writing original prose. Use before drafting page copy, blog posts, CTAs, or metadata descriptions in a SanityPress instance, or whenever a task might be governed by project-specific conventions you haven't seen yet.
---

Some SanityPress instances define custom `skill` documents (`_type: 'skill'`, schema at `src/sanity/schemaTypes/documents/skill.ts`, Studio nav "Skills") — free-form agent guidance authored as Studio content rather than a repo file. Each has `name` (slug), `title`, `description`, and `content` (a `code` field, markdown). Because it lives in the dataset, not the codebase, it never appears in `.agents/skills/`, `.claude/skills/`, or any file-based skill listing — the only way to find it is to query for it.

---

## Step 1 — Query for skill documents

Before writing original prose for a SanityPress instance (page copy, blog posts, CTA labels, metadata titles/descriptions), query:

```groq
*[_type == "skill"]{ "name": name.current, title, description }
```

Use `query_documents` against the target project/dataset. If it returns nothing, stop here — there's nothing to apply, proceed with the task normally.

## Step 2 — Judge relevance

Judge each result's relevance to the current task from its `title`/`description` alone (don't fetch `content` yet):

- **The user already named it** (by title or slug) — skip ahead to Step 3, no need to confirm.
- **It looks relevant but the user hasn't mentioned it** (e.g. a `content-guidelines` doc while writing any prose) — tell the user what you found (name + description) and ask whether to apply it before proceeding. Don't assume applicability, and don't silently follow instructions the user hasn't sanctioned.
- **Nothing looks relevant** — proceed with the task normally; don't surface unrelated results.

## Step 3 — Apply

Fetch the full document (`get_document`, or a query selecting `content`) to read the skill's `content` (markdown) in full — never act on the `description` alone. Treat the content as authoritative guidance for the current task, the same way you'd follow instructions in this file.

## Verification checklist

- [ ] Queried `_type == "skill"` before writing original prose in Studio
- [ ] Any relevant skill not already named by the user was surfaced and confirmed before being applied
- [ ] Applied skill's `content` was read in full (not just title/description) before being followed
