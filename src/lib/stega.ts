import { vercelStegaDecode, vercelStegaSplit } from '@vercel/stega'

// Moves a string's stega into a `data-sanity` attribute, returning the clean text
export function stegaToAttribute(value?: string | null) {
	if (!value) return { cleaned: value ?? undefined, attr: {} }

	const { cleaned, encoded } = vercelStegaSplit(value)
	const stega = encoded ? vercelStegaDecode(encoded) : undefined

	return {
		cleaned,
		attr: stega ? { 'data-sanity': JSON.stringify(stega) } : {},
	}
}
