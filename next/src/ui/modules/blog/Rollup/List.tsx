'use client'

import { categoryStore } from '../store'
import PostPreview from '../PostPreview'

export default function List({
	posts,
	...props
}: {
	posts: Sanity.BlogPost[]
} & React.HTMLAttributes<HTMLUListElement>) {
	const { selected } = categoryStore()

	const filtered = posts.filter(
		(post) =>
			selected === 'All' ||
			post.categories.some((category) => category._id === selected),
	)

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
