'use client'

import PostPreview from '../PostPreview'
import { useCategory } from '../store'

export default function List({
	posts,
	...props
}: {
	posts: Sanity.BlogPost[]
} & React.ComponentProps<'ul'>) {
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
	const { category } = useCategory()

	return posts.filter(
		(post) =>
			category === 'All' ||
			post.categories?.some(({ slug }) => slug?.current === category),
	)
}
