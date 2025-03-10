import { BLOG_DIR } from './env'
import { DEFAULT_LANG } from './i18n'
import { stegaClean } from 'next-sanity'

export default function resolveUrl(
	page?: Sanity.PageBase,
	{
		base = true,
		params,
		language,
	}: {
		base?: boolean
		params?: string
		language?: string
	} = {},
) {
	const segment = page?._type === 'blog.post' ? `/${BLOG_DIR}/` : '/'
	const lang = language && language !== DEFAULT_LANG ? `/${language}` : ''
	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug

	return [
		base && process.env.NEXT_PUBLIC_BASE_URL,
		lang,
		segment,
		path,
		stegaClean(params),
	]
		.filter(Boolean)
		.join('')
}
