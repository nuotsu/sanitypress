import { groq, PortableText } from 'next-sanity'
import { draftMode } from 'next/headers'
import { ROUTES } from '@/lib/env'
import { sanityFetch } from '@/sanity/lib/live'
import type {
	BLOG_POST_LIST_QUERY_RESULT,
	BlogPost,
	BlogPostList,
} from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import PostPreview from './post-preview'

export default async function ({
	intro = [],
	ctas,
	limit = 6,
	_key,
}: BlogPostList & { _key: string }) {
	'use cache'
	const { isEnabled: isDraftMode } = await draftMode()
	const { data: posts } = (await sanityFetch({
		query: BLOG_POST_LIST_QUERY,
		params: { limit, blogDir: `/${ROUTES.blog}/` },
		perspective: isDraftMode ? 'drafts' : 'published',
		stega: isDraftMode,
	})) as { data: BLOG_POST_LIST_QUERY_RESULT }

	return (
		<section className="section space-y-8">
			{intro && (
				<header className="prose text-center">
					<PortableText value={intro} />
				</header>
			)}

			<ul
				className="carousel carousel-scroll-buttons carousel-scroll-marker max-md:full-bleed items-start gap-4 pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4"
				data-anchor-name={`--blog-post-list-${_key}`}
			>
				{posts?.map((post: any) => (
					<PostPreview
						className="md:snap-start"
						post={post as unknown as BlogPost}
						key={post._id}
					/>
				))}
			</ul>

			<CTAList ctas={ctas} className="justify-center max-sm:*:w-full" />
		</section>
	)
}

const BLOG_POST_LIST_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc)[0...$limit]{
		...,
		categories[]->{
			title,
			slug
		},
		author->{
			name,
			image{
				...,
				asset->
			}
		},
		metadata{
			...,
			image{
				...,
				asset->
			}
		},
		'slug': $blogDir + metadata.slug.current,
	}
`
