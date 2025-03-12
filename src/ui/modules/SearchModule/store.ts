import { useQueryState } from 'nuqs'
import { create } from 'zustand'
import { groq } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'

export type SearchScope = 'all' | 'pages' | 'path' | 'blog posts' | undefined

type SearchResults = Sanity.PageBase[]

export const useQuery = () => {
	const [query, setQuery] = useQueryState('query', {
		defaultValue: '',
	})

	return { query, setQuery }
}

export const searchStore = create<{
	loading: boolean
	setLoading: (loading: boolean) => void
	results: SearchResults
	setResults: (results: SearchResults) => void
}>((set) => ({
	loading: false,
	setLoading: (loading) => set({ loading }),
	results: [],
	setResults: (results) => set({ results }),
}))

const SCOPE_MAP = {
	pages: groq`_type == 'page'`,
	path: groq`
		_type == 'page' &&
		metadata.slug.current match $path &&
		!(metadata.slug.current in ['404'])
	`,
	'blog posts': groq`_type == 'blog.post'`,
	all: groq`
		_type in ['page', 'blog.post'] &&
		!(metadata.slug.current in ['404'])
	`,
} as const

export async function handleSearch({
	query,
	scope,
	path,
	setQuery,
	setLoading,
	setResults,
}: {
	query: string
	scope: SearchScope
	path?: string
	setQuery: (query: string) => void
	setLoading: (loading: boolean) => void
	setResults: (results: SearchResults) => void
}) {
	if (!query) setResults([])

	setQuery(query)
	setLoading(true)
	setResults([])

	const scopeQuery = SCOPE_MAP[scope as keyof typeof SCOPE_MAP] || SCOPE_MAP.all

	const results = await fetchSanityLive<SearchResults>({
		query: groq`*[
			${scopeQuery} &&
			[
				body[].children[].text,
				modules[].content[].children[].text,
				modules[].intro[].children[].text,
				title,
				metadata.title,
				metadata.description
			] match $query
		]{
			_id,
			_type,
			title,
			metadata
		}`,
		params: {
			query: `*${query}*` as any,
			path,
		},
	})

	setLoading(false)
	setResults(results)
}
