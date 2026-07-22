'use client'

import { useQueryState } from 'nuqs'
import { usePagination } from '@/hooks/usePagination'
import type {
	BLOG_FEATURED_QUERY_RESULT,
	BLOG_INDEX_QUERY_RESULT,
	BlogPost,
} from '@/sanity/types'
import PostPreview from '@/ui/blog/post-preview'
import PostPreviewLarge from '@/ui/blog/post-preview-large'

export default function ({
	posts,
	featured,
	postsPerPage,
}: {
	posts: BLOG_INDEX_QUERY_RESULT
	featured?: BLOG_FEATURED_QUERY_RESULT
	postsPerPage?: number
}) {
	const [category] = useQueryState('category')
	const [sortBy] = useQueryState('sortBy')

	const showFeatured = !category && !!featured?.length
	const heroPost = showFeatured
		? featured[0]
		: !category
			? posts?.[0]
			: undefined
	const additionalFeatured = showFeatured ? featured.slice(1) : []
	const featuredIdSet = new Set(featured?.map((post) => post._id) ?? [])

	const processedPosts = posts
		?.filter((post, i) => {
			if (category)
				return post.categories?.some((c) => c.slug?.current === category)
			if (showFeatured) return !featuredIdSet.has(post._id)
			return i !== 0
		})
		?.sort((a, b) => {
			if (sortBy === 'publishDate_desc')
				return (b.publishDate ?? '').localeCompare(a.publishDate ?? '')
			if (sortBy === 'publishDate_asc')
				return (a.publishDate ?? '').localeCompare(b.publishDate ?? '')
			if (sortBy === 'title_asc')
				return (a.title ?? '').localeCompare(b.title ?? '')
			if (sortBy === 'title_desc')
				return (b.title ?? '').localeCompare(a.title ?? '')
			return 0
		})

	const gridItems = showFeatured
		? [
				...additionalFeatured.map((post) => ({ ...post, isFeatured: true })),
				...(processedPosts ?? []),
			]
		: (processedPosts ?? [])

	const { paginatedItems, Pagination, currentPage } = usePagination({
		items: gridItems,
		itemsPerPage: postsPerPage,
	})

	return (
		<>
			{currentPage === 1 && !category && heroPost && (
				<>
					<PostPreviewLarge
						post={heroPost as unknown as BlogPost}
						isFeatured={showFeatured}
						className="md:order-first"
					/>
					<hr className="max-md:full-bleed border-stroke md:order-first" />
				</>
			)}

			<ul className="gap-x-lh grid items-start gap-y-[2lh] sm:grid-cols-[repeat(auto-fill,minmax(var(--container-xs),1fr))]">
				{paginatedItems?.map((post) => (
					<PostPreview
						post={post as unknown as BlogPost}
						className="anim-fade"
						key={post._id}
					/>
				))}
			</ul>

			<Pagination
				className="gap-ch flex items-center justify-center tabular-nums"
				buttonClassName="cursor-pointer not-disabled:hover:underline disabled:opacity-50"
			/>
		</>
	)
}
