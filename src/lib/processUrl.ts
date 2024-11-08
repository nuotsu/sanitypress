import { stegaClean } from 'next-sanity'

export default function (
	page?: Sanity.PageBase,
	{
		base = true,
		params,
	}: {
		base?: boolean
		params?: string
	} = {},
) {
	const segment = page?._type === 'blog.post' ? 'blog' : null

	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug

	return (
		(base ? process.env.NEXT_PUBLIC_BASE_URL + '/' : '/') +
		[segment, path, stegaClean(params)].filter(Boolean).join('/')
	)
}
