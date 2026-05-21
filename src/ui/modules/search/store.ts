import { create } from 'zustand'
import type { SEARCH_QUERY_RESULT, SearchModule } from '@/sanity/types'
import { searchContent } from './actions'

export const useSearchStore = create<{
	loading: boolean
	setLoading: (loading: boolean) => void
	results: SEARCH_QUERY_RESULT
	setResults: (results: SEARCH_QUERY_RESULT) => void
}>((set) => ({
	loading: false,
	setLoading: (loading) => set({ loading }),
	results: [],
	setResults: (results) => set({ results }),
}))

const SCOPE_MAP = {
	'blog posts': 'blog.post',
	pages: 'page',
}

export async function handleSearch({
	scope = 'all',
	query,
	setLoading,
	setResults,
}: {
	scope: SearchModule['scope']
	query: string
	setLoading: (loading: boolean) => void
	setResults: (results: SEARCH_QUERY_RESULT) => void
}) {
	if (!query) {
		setResults([])
		setLoading(false)
		return
	}

	setLoading(true)

	const scopeValue = SCOPE_MAP[scope as keyof typeof SCOPE_MAP]
	const results = await searchContent({
		query,
		scope: scope === 'all' ? Object.values(SCOPE_MAP) : [scopeValue],
	})

	setResults(results ?? [])
	setLoading(false)
}
