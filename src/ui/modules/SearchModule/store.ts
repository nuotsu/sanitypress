import { useQueryState } from 'nuqs'
import { create } from 'zustand'
import { groq } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'

export type SearchScope = 'all' | 'pages' | 'blog posts' | undefined

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
	setQuery,
	setResults,
}: {
	query: string
	scope: SearchScope
	setQuery: (query: string) => void
	setResults: (results: SearchResults) => void
}) {
	if (!query) setResults([])

	setQuery(query)

	const processScope = () => {
		switch (scope) {
			case 'pages':
				return groq`
					_type == 'page' &&
					[
						modules[].content[].children[].text,
						modules[].intro[].children[].text,
						title,
						metadata.title,
						metadata.description
					] match $query
				`

			case 'blog posts':
				return groq`
					_type == 'blog.post' &&
					[
						body[].children[].text,
						metadata.title,
						metadata.description
					] match $query
				`

			default:
				return groq`
					_type in ['page', 'blog.post'] &&
					!(metadata.slug.current in ['404', 'blog/*']) &&
					[
						body[].children[].text,
						modules[].content[].children[].text,
						modules[].intro[].children[].text,
						title,
						metadata.title,
						metadata.description
					] match $query
				`
		}
	}

	const results = await fetchSanityLive<SearchResults>({
		query: groq`*[${processScope()}]{
			_id,
			_type,
			title,
			metadata
		}`,
		params: { query: `*${query}*` as any },
	})

	setResults(results)
}
