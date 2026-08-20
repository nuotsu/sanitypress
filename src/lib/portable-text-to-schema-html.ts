import { escapeHTML, toHTML, uriLooksSafe } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') ?? ''

function toAbsoluteHref(href: string) {
	if (
		href.startsWith('http://') ||
		href.startsWith('https://') ||
		href.startsWith('mailto:') ||
		href.startsWith('tel:')
	) {
		return href
	}

	if (href.startsWith('/') && BASE_URL) {
		return `${BASE_URL}${href}`
	}

	return href
}

/** Serialize Portable Text to HTML for JSON-LD (links become absolute `<a>` tags). */
export function portableTextToSchemaHtml(
	blocks?: readonly unknown[] | null,
): string {
	if (!blocks?.length) return ''

	return toHTML(blocks as PortableTextBlock[], {
		components: {
			marks: {
				link: ({ children, value }) => {
					const href = toAbsoluteHref(value?.href || '')
					if (!href || !uriLooksSafe(href)) return children
					return `<a href="${escapeHTML(href)}">${children}</a>`
				},
			},
		},
	})
}
