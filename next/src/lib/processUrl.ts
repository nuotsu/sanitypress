import { BASE_URL } from './env'

export default function ({ _type, metadata }: Sanity.Page | Sanity.BlogPost) {
	const directory = _type === 'blog.post' ? 'blog' : null

	const slug = metadata.slug.current
	const path = slug === 'index' ? null : slug

	return [BASE_URL, directory, path].filter(Boolean).join('/')
}
