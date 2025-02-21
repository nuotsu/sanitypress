import { stegaClean } from 'next-sanity'

export default function resolveUrl(
	page?: Sanity.PageBase,
	{
		base = true,
		params,
	}: {
		base?: boolean
		params?: string
	} = {},
) {
	const segment = page?._type === 'blog.post' ? '/blog/' : '/'
	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug

	return [
		base && process.env.NEXT_PUBLIC_BASE_URL,
		segment,
		page?.parent
			? [
					...(page.parent as Sanity.Page[]).map(
						(p) => p?.metadata?.slug?.current,
					),
					path,
				]
					.filter(Boolean)
					.join('/')
			: path,
		stegaClean(params),
	]
		.filter(Boolean)
		.join('')
}
