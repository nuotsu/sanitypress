import type { SearchScope } from './store'

export default function SearchGoogle({
	query,
	scope,
	path,
}: {
	query: string
	scope: SearchScope
	path?: string
}) {
	const href = [
		`https://www.google.com/search?q=${query} `,
		`site:${process.env.NEXT_PUBLIC_BASE_URL}`,
		scope === 'path' && path
			? `/${path.replace(/\/?\*$/, '')}`
			: scope === 'blog posts'
				? '/blog'
				: '',
	].join('')

	return (
		<p className="text-ink/50 text-center text-sm">
			<a className="line-clamp-1 hover:underline" href={href} target="_blank">
				Search "{query}" on Google
			</a>
		</p>
	)
}
