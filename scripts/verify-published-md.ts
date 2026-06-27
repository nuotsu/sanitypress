/**
 * Verify (and optionally fix) image URLs/alt in blog-post markdown against the
 * actual content image assets. Reads by explicit IDs (reliable across perspectives).
 *
 *   npx sanity exec scripts/verify-published-md.ts --with-user-token            # verify/dry-run
 *   COMMIT=1 npx sanity exec scripts/verify-published-md.ts --with-user-token   # apply fixes
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ useCdn: false })
const COMMIT = process.env.COMMIT === '1' || process.argv.includes('--commit')

// All published blog posts that have markdown, + the toc draft the user asked for.
const IDS = [
	'4f2a45ef-050b-458c-8b53-d25843115716', // a-guide-to-scrolling-logos
	'5d563d82-8ae9-400d-8191-3c0fccd87bed', // architecting-websites-with-sanity
	'1b2ee43e-fe1f-42e6-9337-fb84d3e786f9', // building-carousels-with-css-only
	'd35adb17-5553-4113-bc43-aaa84aa8fe9a', // expanding-the-details-element
	'c40c7701-fe27-4519-b5bf-e3319ac72a71', // how-typegen-has-helped-improve-my-developer-workflow
	'f773b68e-dae6-47b4-bf81-48f3a2f65dff', // introducing-sanitypress-with-typegen
	'bdd76848-c04d-4891-9af9-6357d58cb2e1', // keeping-anchors-perfectly-on-target
	'drafts.0a7c583e-b548-4d4c-8d4d-562fbc1ce743', // how-to-generate-a-table-of-contents-with-groq
	'drafts.24897979-dda4-49a6-9d88-2e6f9e6a6e8b', // aeo-markdown-routes-ai-agents (draft)
]

const REAL_HOST = 'https://cdn.sanity.io/images/cyu7k2r0/production/'
// Permissive: also catches malformed urls containing spaces, e.g. (alt:…,asset:)
const IMG_RE = /!\[([^\]]*)\]\(([^)]*)\)/g
const norm = (s: string | null | undefined) =>
	(s ?? '').replace(/\s+/g, ' ').replace(/[“”]/g, '"').trim()

type CImg = { alt: string | null; caption: string | null; url: string | null }
type Doc = { _id: string; slug: string | null; md: string | null; images: CImg[] }

function fixDoc(doc: Doc) {
	const log: string[] = []
	const content = doc.images ?? []
	if (!doc.md) return { newMd: null, changed: false, urlFixes: 0, altFixes: 0, countMismatch: false, log: ['  ⚠️  markdown.code EMPTY — skipped'] }

	const matches = [...doc.md.matchAll(IMG_RE)]
	const countMismatch = matches.length !== content.length
	if (countMismatch)
		log.push(`  ⚠️  COUNT MISMATCH: markdown ${matches.length} vs content ${content.length} → SKIPPED auto-commit`)

	let urlFixes = 0
	let altFixes = 0
	let i = 0
	const newMd = doc.md.replace(IMG_RE, (full, alt: string, inner: string) => {
		const ci = content[i]
		i++
		if (!ci || !ci.url) return full
		const newUrl = ci.url
		const newAlt = ci.alt ?? ''

		// Split inner into url + optional "title" (preserve titles on well-formed images).
		const m = inner.match(/^(\S+)(?:\s+("[^"]*"|'[^']*'))?$/)
		let oldUrl: string
		let title = ''
		if (m && /^(https?:\/\/|\/)/.test(m[1])) {
			oldUrl = m[1]
			title = m[2] ? ' ' + m[2] : ''
		} else {
			oldUrl = inner // malformed (e.g. "alt:…,asset:")
		}

		if (oldUrl.split('?')[0] !== newUrl.split('?')[0]) {
			urlFixes++
			log.push(`  • img ${i}: url ${oldUrl} → ${newUrl}`)
		}
		if (norm(alt) !== norm(newAlt)) {
			altFixes++
			log.push(`  • img ${i}: alt "${alt}" → "${newAlt}"`)
		}
		return `![${newAlt}](${newUrl}${title})`
	})

	const changed = newMd !== doc.md
	if (!log.length) log.push(`  ✓ ${matches.length} image(s) OK`)
	return { newMd, changed, urlFixes, altFixes, countMismatch, log }
}

async function main() {
	console.log(`\n=== verify/fix (${COMMIT ? 'COMMIT' : 'DRY RUN'}) ===\n`)
	const docs: Doc[] = await client.fetch(
		`*[_id in $ids]{ _id, "slug": metadata.slug.current, "md": markdown.code,
			"images": content[_type=="image"]{ "alt": alt, "caption": pt::text(figcaption), "url": asset->url } }`,
		{ ids: IDS },
	)
	const byId = new Map(docs.map((d) => [d._id, d]))
	let url = 0, alt = 0
	const flagged: string[] = []
	for (const id of IDS) {
		const doc = byId.get(id)
		console.log(`▸ ${doc?.slug ?? id}`)
		if (!doc) { console.log('  ⚠️  not found\n'); continue }
		const r = fixDoc(doc)
		r.log.forEach((l) => console.log(l))
		url += r.urlFixes; alt += r.altFixes
		if (r.countMismatch) flagged.push(doc.slug ?? id)
		// User approved applying alt-only fixes too; still skip count mismatches.
		if (COMMIT && r.changed && r.newMd && !r.countMismatch) {
			await client.patch(id).set({ 'markdown.code': r.newMd }).commit()
			console.log('  ✅ committed')
		}
		console.log('')
	}
	console.log(`=== ${docs.length} checked; URL fixes: ${url}, alt fixes: ${alt} ===`)
	if (flagged.length) console.log(`Needs manual review: ${flagged.join(', ')}`)
	if (!COMMIT) console.log('(DRY RUN — re-run with COMMIT=1 to apply)')
}

main().catch((e) => { console.error(e); process.exit(1) })
