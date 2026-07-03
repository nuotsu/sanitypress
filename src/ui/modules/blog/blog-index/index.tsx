import { groq, PortableText } from 'next-sanity'
import { Suspense } from 'react'
import { ROUTES } from '@/lib/env'
import { cn } from '@/lib/utils'
import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import type { BLOG_INDEX_QUERY_RESULT, BlogIndex } from '@/sanity/types'
import Loading from '@/ui/loading'
import { Module, type ModuleProps } from '@/ui/modules'
import FilterList from '@/ui/modules/blog/filter-list'
import PaginatedPosts from './paginated-posts'
import Skeleton from './skeleton'
import SortBy from './sort-by'

export default async function ({
	intro,
	postsPerPage = 6,
	perspective,
	stega,
	...props
}: BlogIndex & ModuleProps & DynamicFetchOptions) {
	const posts = await getPosts({ perspective, stega })

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
					<PaginatedPosts posts={posts} postsPerPage={postsPerPage} />
				</Suspense>
			</div>
		</Module>
	)
}

async function getPosts({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_INDEX_QUERY,
		params: { blogDir: `/${ROUTES.blog}/` },
		perspective,
		stega,
	})
	return data as BLOG_INDEX_QUERY_RESULT
}

const BLOG_INDEX_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc){
		...,
		categories[]->,
		author->{
			name,
			image{
				...,
				asset->
			}
		},
		metadata{
			...,
			image{
				...,
				asset->
			}
		},
		'slug': $blogDir + metadata.slug.current,
	}
`
