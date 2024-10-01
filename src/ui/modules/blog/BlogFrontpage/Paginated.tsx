'use client'

import { useEffect } from 'react'
import usePagination from '@/lib/usePagination'
import { categoryStore } from '../store'
import List, { filterPosts } from '../BlogList/List'

export default function Paginated({
	posts,
	itemsPerPage = 6,
}: {
	posts: Sanity.BlogPost[]
	itemsPerPage?: number
}) {
	const { paginatedItems, resetPage, Pagination } =
		usePagination<Sanity.BlogPost>({
			items: filterPosts(posts),
			itemsPerPage,
		})

	const { selected } = categoryStore()

	useEffect(resetPage, [selected])

	return (
		<div className="relative space-y-12">
			<List
				posts={paginatedItems}
				className="grid gap-x-8 gap-y-12 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
			/>

			<Pagination
				className="frosted-glass sticky bottom-0 flex items-center justify-center gap-4 bg-canvas p-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] [&_span]:tabular-nums"
				buttonClassName="hover:underline disabled:opacity-20"
			/>
		</div>
	)
}
