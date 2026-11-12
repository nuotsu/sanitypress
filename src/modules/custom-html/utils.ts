/**
 * Placeholder `type` given to executable scripts in server-rendered HTML so the
 * browser parses but never runs them; `<WithScript>` swaps them for live ones.
 */
export const INERT_SCRIPT_TYPE = 'text/x-custom-html'
export const ORIGINAL_TYPE_ATTR = 'data-custom-html-type'

const SCRIPT_OPEN_TAG = /<script\b([^>]*)>/gi
const TYPE_ATTR = /(?:^|\s)type\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i
const EXECUTABLE_TYPE =
	/^(?:module|(?:text|application)\/(?:x-)?(?:java|ecma)script|text\/jscript)$/i

/**
 * A script without a JS `type` (e.g. `application/ld+json`) is a data block:
 * browsers never execute it, so it can be server-rendered as-is.
 */
function getScriptType(attrs: string) {
	const match = attrs.match(TYPE_ATTR)
	const type = (match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim()
	return { match: match?.[0], type }
}

export function isExecutableType(type: string) {
	return !type || EXECUTABLE_TYPE.test(type)
}

/**
 * Rewrites executable `<script>` tags to an inert type (preserving the original
 * in a data attribute). Data blocks like JSON-LD are left untouched.
 */
export function deferScripts(html: string) {
	let hasScripts = false

	const code = html.replace(SCRIPT_OPEN_TAG, (tag, attrs: string) => {
		const { match, type } = getScriptType(attrs)
		if (!isExecutableType(type)) return tag

		hasScripts = true
		const rest = match ? attrs.replace(match, '') : attrs
		const original = type
			? ` ${ORIGINAL_TYPE_ATTR}="${type.replace(/"/g, '&quot;')}"`
			: ''

		return `<script type="${INERT_SCRIPT_TYPE}"${original}${rest}>`
	})

	return { code, hasScripts }
}

/** Studio preview: which kinds of code does this block contain? */
export function getCodeKinds(html?: string, css?: string) {
	const types = [...(html?.matchAll(SCRIPT_OPEN_TAG) ?? [])].map(
		([, attrs]) => getScriptType(attrs).type,
	)

	return [
		html && 'HTML',
		types.some(isExecutableType) && 'JS',
		types.some((t) => /ld\+json/i.test(t)) && 'JSON-LD',
		css && 'CSS',
	].filter(Boolean)
}
