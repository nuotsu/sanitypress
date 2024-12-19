import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import sortFeaturedPosts from './sortFeaturedPosts'
import PostPreviewLarge from '../PostPreviewLarge'
import FilterList from '../BlogList/FilterList'
import { Suspense } from 'react'
import Paginated from './Paginated'
import { stegaClean } from 'next-sanity'
import PostPreview from '../PostPreview'

export default async function BlogFrontpage({
	mainPost,
	showFeaturedPostsFirst,
	itemsPerPage,
}: Partial<{
	mainPost: 'recent' | 'featured'
	showFeaturedPostsFirst: boolean
	itemsPerPage: number
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>({
		query: groq`*[_type == 'blog.post']|order(publishDate desc){
			_type,
			_id,
			featured,
			metadata,
			categories[]->,
			authors[]->,
			publishDate,
		}`,
	})

	const [firstPost, ...otherPosts] =
		stegaClean(mainPost) === 'featured' ? sortFeaturedPosts(posts) : posts

	return (
		<section className="section space-y-12">
			<PostPreviewLarge post={firstPost} />

			<hr />

			<FilterList />

			<Suspense
				fallback={
					<ul className="grid gap-x-8 gap-y-12 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
						{Array.from({ length: itemsPerPage ?? 6 }).map((_, i) => (
							<li key={i}>
								<PostPreview skeleton />
							</li>
						))}
					</ul>
				}
			>
				<Paginated
					posts={sortFeaturedPosts(otherPosts, showFeaturedPostsFirst)}
					itemsPerPage={itemsPerPage}
				/>
			</Suspense>
		</section>
	)
}
