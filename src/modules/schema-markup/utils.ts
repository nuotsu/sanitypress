type JsonLd = Record<string, unknown>

/**
 * Parses JSON-LD source and returns the error message, or `true` if valid.
 * Each node (top-level object, array item) needs `@context` + `@type` or `@graph`.
 */
export function validateJsonLd(code?: string): string | true {
	if (!code?.trim()) return 'Add JSON-LD markup'

	let data: unknown
	try {
		data = JSON.parse(code)
	} catch (e) {
		return `Invalid JSON: ${(e as Error).message}`
	}

	const nodes = Array.isArray(data) ? data : [data]
	if (!nodes.length) return 'JSON-LD array is empty'

	for (const node of nodes) {
		if (!node || typeof node !== 'object' || Array.isArray(node))
			return 'Each JSON-LD entry must be an object'
		if (!('@context' in node))
			return 'Missing "@context" (e.g. "https://schema.org")'
		if (!('@type' in node) && !('@graph' in node))
			return 'Missing "@type" (or "@graph")'
	}

	return true
}

/** Schema.org types declared at the top level (or in `@graph`), for previews */
export function getJsonLdTypes(code?: string): string[] {
	try {
		const data = JSON.parse(code ?? '')
		return (Array.isArray(data) ? data : [data])
			.flatMap((node: JsonLd) =>
				Array.isArray(node['@graph']) ? (node['@graph'] as JsonLd[]) : [node],
			)
			.flatMap((node) => node['@type'] ?? [])
			.map(String)
	} catch {
		return []
	}
}

/**
 * Minified JSON safe to inline in `<script>`: escaping `<` prevents
 * `</script>` or `<!--` inside string values from breaking out of the tag.
 */
export function serializeJsonLd(code?: string): string | null {
	if (validateJsonLd(code) !== true) return null
	return JSON.stringify(JSON.parse(code!)).replace(/</g, '\\u003c')
}
