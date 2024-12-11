'use client'

import { usePagination } from '@/lib/usePagination'
import List, { filterPosts } from '../BlogList/List'

export default function Paginated({
	posts,
	itemsPerPage = 6,
}: {
	posts: Sanity.BlogPost[]
	itemsPerPage?: number
}) {
	const { paginatedItems, Pagination } = usePagination({
		items: filterPosts(posts),
		itemsPerPage,
	})

	function scrollToList() {
		if (typeof window !== 'undefined')
			document
				.querySelector('#blog-list')
				?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className="relative space-y-12">
			<List
				id="blog-list"
				posts={paginatedItems}
				className="grid scroll-mt-[calc(var(--header-height)+1rem)] gap-x-8 gap-y-12 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
			/>

			<Pagination
				className="frosted-glass sticky bottom-0 flex items-center justify-center gap-4 bg-canvas p-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] tabular-nums"
				buttonClassName="hover:underline disabled:opacity-20"
				onClick={scrollToList}
			/>
		</div>
	)
}
