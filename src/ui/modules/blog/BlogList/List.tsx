'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { categoryStore } from '../store'
import PostPreview from '../PostPreview'

export default function List({
	posts,
	...props
}: {
	posts: Sanity.BlogPost[]
} & React.ComponentProps<'ul'>) {
	const { reset } = categoryStore()

	useEffect(reset, [usePathname()])

	const filtered = filterPosts(posts)

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

export function filterPosts(posts: Sanity.BlogPost[]) {
	const { selected } = categoryStore()

	return posts.filter(
		(post) =>
			selected === 'All' ||
			post.categories?.some((category) => category._id === selected),
	)
}
