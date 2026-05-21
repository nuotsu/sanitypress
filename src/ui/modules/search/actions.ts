'use server'

import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import {
	getDynamicFetchOptions,
	sanityFetch,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import type { SEARCH_QUERY_RESULT } from '@/sanity/types'

async function fetchSearchResults({
	queryMatch,
	scope,
	blogDir,
	perspective,
	stega,
}: {
	queryMatch: string
	scope: string[]
	blogDir: string
} & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: SEARCH_QUERY,
		params: { queryMatch, scope, blogDir },
		perspective,
		stega,
	})
	return data as SEARCH_QUERY_RESULT
}

export async function searchContent({
	query,
	scope,
}: {
	query: string
	scope: string[]
}) {
	const { perspective, stega } = await getDynamicFetchOptions()
	return fetchSearchResults({
		queryMatch: query,
		scope,
		blogDir: `/${ROUTES.blog}/`,
		perspective,
		stega,
	})
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
