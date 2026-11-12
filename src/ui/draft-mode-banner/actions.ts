'use server'

import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { ROUTES } from '@/lib/env'
import {
	getDynamicFetchOptions,
	sanityFetch,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {
	GLOBAL_MODULE_EXCLUDE_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
} from '@/sanity/lib/queries'
import type {
	BLOG_POST_GLOBAL_MODULES_QUERY_RESULT,
	PAGE_GLOBAL_MODULES_QUERY_RESULT,
} from '@/sanity/types'

export type GlobalModuleItem = PAGE_GLOBAL_MODULES_QUERY_RESULT[number]

/**
 * Lists the `global-module` documents injected into the page at `pathname`.
 * Mirrors the matching logic in the page and blog post `PAGE_QUERY`s.
 */
export async function getGlobalModulesAction(
	pathname: string,
): Promise<GlobalModuleItem[]> {
	const { isEnabled } = await draftMode()
	if (!isEnabled) return []

	const { perspective } = await getDynamicFetchOptions()
	return cachedGlobalModules({ pathname, perspective, stega: false })
}

async function cachedGlobalModules({
	pathname,
	perspective,
	stega,
}: { pathname: string } & DynamicFetchOptions): Promise<GlobalModuleItem[]> {
	'use cache'
	const segments = pathname.split('/').filter(Boolean)

	// blog post: /blog/<slug>
	if (segments.length === 2 && segments[0] === ROUTES.blog) {
		const { data } = await sanityFetch({
			query: BLOG_POST_GLOBAL_MODULES_QUERY,
			params: { slug: segments[1], blogDir: `${ROUTES.blog}/` },
			perspective,
			stega,
		})
		return data as BLOG_POST_GLOBAL_MODULES_QUERY_RESULT
	}

	const { data } = await sanityFetch({
		query: PAGE_GLOBAL_MODULES_QUERY,
		params: { slug: segments.join('/') || 'index' },
		perspective,
		stega,
	})
	return data as PAGE_GLOBAL_MODULES_QUERY_RESULT
}

const PAGE_GLOBAL_MODULES_QUERY = groq`
	*[
		_type == 'global-module'
		&& (
			(path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY})
			|| (path != '*' && ${GLOBAL_MODULE_PATH_QUERY})
		)
	]|order(path asc){
		_id,
		identifier,
		path
	}
`

const BLOG_POST_GLOBAL_MODULES_QUERY = groq`
	*[
		_type == 'global-module'
		&& (
			(path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY})
			|| path == $blogDir
		)
	]|order(path asc){
		_id,
		identifier,
		path
	}
`
