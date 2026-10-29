'use client'

import { create } from 'zustand'
import type { SEARCH_QUERY_RESULT, SearchModule } from '@/sanity/types'
import { searchAction } from './actions'

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

// Incremented per search, so a slow response can't overwrite newer results
let latestSearch = 0

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
	const search = ++latestSearch

	if (!query) {
		setResults([])
		setLoading(false)
		return
	}

	setLoading(true)
	const results = await searchAction(scope, query)
	if (search !== latestSearch) return

	setResults(results)
	setLoading(false)
}
