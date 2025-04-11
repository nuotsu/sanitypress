import { cookies } from 'next/headers'
import { DEFAULT_LANG, langCookieName } from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { IMAGE_QUERY } from '@/sanity/lib/queries'
import { stegaClean } from 'next-sanity'
import sortFeaturedPosts from './sortFeaturedPosts'
import { Suspense } from 'react'
import PostPreviewLarge from '../PostPreviewLarge'
import FilterList from '../BlogList/FilterList'
import PostPreview from '../PostPreview'
import Paginated from './Paginated'

export default async function BlogFrontpage({
	mainPost,
	showFeaturedPostsFirst,
	itemsPerPage,
}: Partial<{
	mainPost: 'recent' | 'featured'
	showFeaturedPostsFirst: boolean
	itemsPerPage: number
}>) {
	const lang = (await cookies()).get(langCookieName)?.value ?? DEFAULT_LANG

	const posts = await fetchSanityLive<Sanity.BlogPost[]>({
		query: groq`
			*[
				_type == 'blog.post'
				${!!lang ? `&& (!defined(language) || language == '${lang}')` : ''}
			]|order(publishDate desc){
				_type,
				_id,
				featured,
				categories[]->,
				authors[]->,
				publishDate,
				language,
				metadata {
					...,
					image { ${IMAGE_QUERY} }
				},
			}
		`,
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
