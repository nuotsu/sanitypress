import { groq } from 'next-sanity'
import { create } from 'zustand'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { SEARCH_QUERY_RESULT, SearchModule } from '@/sanity/types'

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

	const results = await sanityFetchLive<SEARCH_QUERY_RESULT>({
		query: SEARCH_QUERY,
		params: {
			queryMatch: query,
			scope: scope === 'all' ? Object.values(SCOPE_MAP) : [scopeValue],
			blogDir: `/${ROUTES.blog}/`,
		},
	})

	setResults(results)
	setLoading(false)
}

const SEARCH_QUERY = groq`*[
	_type in $scope
	&& defined(metadata.slug.current)
	&& metadata.noIndex != true
	&& !(metadata.slug.current in ['404'])
	&& @ match text::query($queryMatch)
]{
	_id,
	_type,
	title,
	'slug': select(
		_type == 'blog.post' => $blogDir + metadata.slug.current,
		metadata.slug.current == 'index' => '/',
		'/' + metadata.slug.current
	)
}`
