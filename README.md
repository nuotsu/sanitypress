# Next.js + Sanity + Template

> A Next.js (App router), Sanity.io and Tailwind CSS starter template.

## Initialize a Sanity project and grab the project ID

1. `next/.env.local`
   - Also retrieve a [token from Sanity](https://sanity.io/manage) to allow for live previewing in dev mode.
2. `sanity/sanity.cli.ts`
3. `sanity/sanity.config.ts`

## Your Sanity Schema Types

Sanity schema are stored in `next/src/types/Sanity.d.ts` and can be accessed anywhere in the `next/` directory (import unncecessary) with `Sanity.*`.
