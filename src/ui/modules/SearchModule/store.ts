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
	results: SearchResults
	setResults: (results: SearchResults) => void
}>((set) => ({
	results: [],
	setResults: (results) => set({ results }),
}))

export async function handleSearch({
	query,
	scope,
	path,
	setQuery,
	setResults,
}: {
	query: string
	scope: SearchScope
	path?: string
	setQuery: (query: string) => void
	setResults: (results: SearchResults) => void
}) {
	if (!query) setResults([])

	setQuery(query)

	const processScope = () => {
		switch (scope) {
			case 'pages':
				return groq`_type == 'page'`

			case 'path':
				return groq`
					_type == 'page' &&
					metadata.slug.current match $path &&
					!(metadata.slug.current in ['404'])
				`

			case 'blog posts':
				return groq`_type == 'blog.post'`

			default:
				return groq`
					_type in ['page', 'blog.post'] &&
					!(metadata.slug.current in ['404'])
				`
		}
	}

	const results = await fetchSanityLive<SearchResults>({
		query: groq`*[
				${processScope()} &&
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

	setResults(results)
}
