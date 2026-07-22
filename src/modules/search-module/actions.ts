'use server'

import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import {
	getDynamicFetchOptions,
	sanityFetch,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import type { SEARCH_QUERY_RESULT, SearchModule } from '@/sanity/types'

const SCOPE_MAP = {
	'blog posts': 'blog.post',
	pages: 'page',
}

export async function searchAction(
	scope: SearchModule['scope'],
	query: string,
): Promise<SEARCH_QUERY_RESULT> {
	if (!query) return []

	const { perspective, stega } = await getDynamicFetchOptions()
	return cachedSearch({ scope, query, perspective, stega })
}

async function cachedSearch({
	scope,
	query,
	perspective,
	stega,
}: {
	scope: SearchModule['scope']
	query: string
} & DynamicFetchOptions): Promise<SEARCH_QUERY_RESULT> {
	'use cache'
	const scopeValue = SCOPE_MAP[scope as keyof typeof SCOPE_MAP]

	const { data } = await sanityFetch({
		query: SEARCH_QUERY,
		params: {
			queryMatch: query,
			scope: scope === 'all' ? Object.values(SCOPE_MAP) : [scopeValue],
			blogDir: `/${ROUTES.blog}/`,
		},
		perspective,
		stega,
	})

	return data as SEARCH_QUERY_RESULT
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
