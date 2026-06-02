'use client'

import { useQueryState } from 'nuqs'
import { usePagination } from '@/hooks/usePagination'
import type { BLOG_INDEX_QUERY_RESULT, BlogPost } from '@/sanity/types'
import PostPreview from '@/ui/modules/blog/post-preview'
import PostPreviewLarge from '@/ui/modules/blog/post-preview-large'

export default function ({
	posts,
	postsPerPage,
}: {
	posts: BLOG_INDEX_QUERY_RESULT
	postsPerPage?: number
}) {
	const [category] = useQueryState('category')
	const [sortBy] = useQueryState('sortBy')

	const processedPosts = posts
		?.filter((post, i) =>
			!category
				? i !== 0
				: post.categories?.some((c) => c.slug?.current === category),
		)
		?.sort((a, b) => {
			if (sortBy === 'publishDate_desc')
				return b.publishDate!.localeCompare(a.publishDate!)
			if (sortBy === 'publishDate_asc')
				return a.publishDate!.localeCompare(b.publishDate!)
			if (sortBy === 'title_asc') return a.title!.localeCompare(b.title!)
			if (sortBy === 'title_desc') return b.title!.localeCompare(a.title!)
			return 0
		})

	const { paginatedItems, Pagination, currentPage } = usePagination({
		items: processedPosts,
		itemsPerPage: postsPerPage,
	})

	return (
		<>
			{currentPage === 1 && !category && (
				<>
					<PostPreviewLarge
						post={posts?.[0] as unknown as BlogPost}
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
