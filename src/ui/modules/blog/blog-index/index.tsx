import { groq, PortableText } from 'next-sanity'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { ROUTES } from '@/lib/env'
import { cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import type { BLOG_INDEX_QUERY_RESULT, BlogIndex } from '@/sanity/types'
import Loading from '@/ui/loading'
import { moduleAttributes, type ModuleProps } from '@/ui/modules'
import FilterList from '@/ui/modules/blog/filter-list'
import PaginatedPosts from './paginated-posts'
import Skeleton from './skeleton'
import SortBy from './sort-by'

export default async function BlogIndexModule({
	intro,
	postsPerPage = 6,
	...props
}: BlogIndex & ModuleProps) {
	'use cache'
	const { isEnabled: isDraftMode } = await draftMode()
	const { data: posts } = (await sanityFetch({
		query: BLOG_INDEX_QUERY,
		params: { blogDir: `/${ROUTES.blog}/` },
		perspective: isDraftMode ? 'drafts' : 'published',
		stega: isDraftMode,
	})) as { data: BLOG_INDEX_QUERY_RESULT }

	return (
		<section
			className={cn('section space-y-8', intro && 'pt-4')}
			{...moduleAttributes(props)}
		>
			{intro && (
				<header className="prose">
					<PortableText value={intro} />
				</header>
			)}

			<div className="grid gap-4">
				<fieldset className="flex flex-wrap items-end justify-between gap-4">
					<Suspense
						fallback={
							<Loading className="p-[.25em_.5em]">
								Loading categories...
							</Loading>
						}
					>
						<FilterList />
						<SortBy />
					</Suspense>
				</fieldset>

				<Suspense fallback={<Skeleton postsPerPage={postsPerPage} />}>
					<PaginatedPosts posts={posts} postsPerPage={postsPerPage} />
				</Suspense>
			</div>
		</section>
	)
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
