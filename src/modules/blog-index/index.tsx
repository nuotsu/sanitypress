import type { Get } from '@sanity/codegen'
import { groq, PortableText } from 'next-sanity'
import { Suspense } from 'react'
import { ROUTES } from '@/lib/env'
import { cn } from '@/lib/utils'
import { Module, type ModuleProps } from '@/modules'
import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import { BLOG_POST_FRAGMENT_QUERY } from '@/sanity/lib/queries'
import type {
	BLOG_FEATURED_QUERY_RESULT,
	BLOG_INDEX_QUERY_RESULT,
	PAGE_QUERY_RESULT,
} from '@/sanity/types'
import FilterList from '@/ui/blog/filter-list'
import Loading from '@/ui/loading'
import PaginatedPosts from './paginated-posts'
import Skeleton from './skeleton'
import SortBy from './sort-by'

type BlogIndexModule = Extract<
	Get<PAGE_QUERY_RESULT, 'modules', 0>,
	{ _type: 'blog-index' }
>

export default async function ({
	intro,
	featured,
	postsPerPage = 6,
	perspective,
	stega,
	...props
}: BlogIndexModule & ModuleProps & DynamicFetchOptions) {
	const blogDir = `/${ROUTES.blog}/`
	const featuredIds = featured?.map((ref) => ref._ref).filter(Boolean) ?? []

	const [posts, featuredPosts] = await Promise.all([
		getPosts({ blogDir, featuredIds, perspective, stega }),
		featuredIds.length
			? getFeaturedPosts({ blogDir, featuredIds, perspective, stega })
			: Promise.resolve([] as BLOG_FEATURED_QUERY_RESULT),
	])

	const featuredById = new Map(featuredPosts.map((post) => [post._id, post]))
	const resolvedFeatured = featuredIds
		.map((id) => featuredById.get(id))
		.filter(Boolean) as BLOG_FEATURED_QUERY_RESULT

	return (
		<Module className={cn('section space-y-lh', intro && 'pt-4')} {...props}>
			{intro && (
				<header className="prose">
					<PortableText value={intro} />
				</header>
			)}

			<div className="gap-lh grid">
				<fieldset className="flex flex-wrap items-end justify-between gap-4">
					<Suspense
						fallback={
							<Loading className="p-[.25em_.5em]">
								Loading categories...
							</Loading>
						}
					>
						<FilterList perspective={perspective} stega={stega} />
						<SortBy />
					</Suspense>
				</fieldset>

				<Suspense fallback={<Skeleton postsPerPage={postsPerPage} />}>
					<PaginatedPosts
						posts={posts}
						featured={resolvedFeatured}
						postsPerPage={postsPerPage}
					/>
				</Suspense>
			</div>
		</Module>
	)
}

async function getPosts({
	blogDir,
	featuredIds,
	perspective,
	stega,
}: {
	blogDir: string
	featuredIds: string[]
} & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_INDEX_QUERY,
		params: { blogDir, featuredIds },
		perspective,
		stega,
	})
	return data as BLOG_INDEX_QUERY_RESULT
}

async function getFeaturedPosts({
	blogDir,
	featuredIds,
	perspective,
	stega,
}: {
	blogDir: string
	featuredIds: string[]
} & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_FEATURED_QUERY,
		params: { blogDir, featuredIds },
		perspective,
		stega,
	})
	return data as BLOG_FEATURED_QUERY_RESULT
}

const BLOG_INDEX_QUERY = groq`
	*[_type == 'blog.post' && !(_id in $featuredIds)]|order(publishDate desc){
		...,
		${BLOG_POST_FRAGMENT_QUERY},
		'slug': $blogDir + metadata.slug.current,
	}
`

const BLOG_FEATURED_QUERY = groq`
	*[_type == 'blog.post' && _id in $featuredIds]{
		...,
		${BLOG_POST_FRAGMENT_QUERY},
		'slug': $blogDir + metadata.slug.current,
	}
`
