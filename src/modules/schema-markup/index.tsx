import { stegaClean } from 'next-sanity'
import type { SchemaMarkup } from '@/sanity/types'
import { serializeJsonLd } from './utils'

/**
 * Renders only a JSON-LD `<script>` (no `<Module>` wrapper, since there's nothing
 * visible to edit). Hiding the module via its attributes omits the markup.
 */
export default function ({ code, attributes }: Partial<SchemaMarkup>) {
	if (attributes?.hidden) return null

	const json = serializeJsonLd(stegaClean(code?.code))
	if (!json) return null

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: json }}
		/>
	)
}
