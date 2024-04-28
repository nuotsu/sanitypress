import { BASE_URL } from './env'

type Options = {
	base?: boolean
	params?: string
}

export default function (
	page: Sanity.PageBase,
	{ base = true, params }: Options = {},
) {
	// prettier-ignore
	const directory =
		page._type === 'blog.post' ? 'blog' :
		null

	const slug = page.metadata?.slug.current
	const path = slug === 'index' ? null : slug

	return (
		(base ? BASE_URL : '/') +
		[directory, path, params].filter(Boolean).join('/')
	)
}
