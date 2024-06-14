'use client'

import { categoryStore } from '../store'
import PostPreview from '../PostPreview'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function List({
	posts,
	predefinedFilters,
	...props
}: {
	posts: Sanity.BlogPost[]
	predefinedFilters?: Sanity.BlogCategory[]
} & React.HTMLAttributes<HTMLUListElement>) {
	const { selected, reset } = categoryStore()

	useEffect(reset, [usePathname()])

	const filtered = posts
		// filter by predefined filters
		.filter(
			(post) =>
				!predefinedFilters?.length ||
				post.categories?.some((category) =>
					predefinedFilters.some((filter) => filter._id === category._id),
				),
		)
		// filter by selected category
		.filter(
			(post) =>
				selected === 'All' ||
				post.categories?.some((category) => category._id === selected),
		)

	if (!filtered.length) {
		return <div>No posts found...</div>
	}

	return (
		<ul {...props}>
			{filtered?.map((post) => (
				<li className="anim-fade" key={post._id}>
					<PostPreview post={post} />
				</li>
			))}
		</ul>
	)
}
