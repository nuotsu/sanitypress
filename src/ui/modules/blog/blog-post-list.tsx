import { groq, PortableText } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
import { BLOG_POST_FRAGMENT_QUERY } from '@/sanity/lib/queries'
import type {
	BLOG_POST_LIST_QUERY_RESULT,
	BlogPost,
	BlogPostList,
} from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import { Module } from '@/ui/modules'
import PostPreview from './post-preview'

export default async function ({
	intro = [],
	ctas,
	limit = 6,
	_key,
	...props
}: BlogPostList & { _key: string }) {
	const posts = await sanityFetchLive<BLOG_POST_LIST_QUERY_RESULT>({
		query: BLOG_POST_LIST_QUERY,
		params: { limit, blogDir: `/${ROUTES.blog}/` },
	})

	return (
		<Module _key={_key} className="section space-y-8" {...props}>
			{intro && (
				<header className="prose text-center">
					<PortableText value={intro} />
				</header>
			)}

			<ul
				className="carousel carousel-scroll-buttons carousel-scroll-marker max-md:full-bleed gap-lh items-start pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4"
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
		</Module>
	)
}

export const BLOG_POST_LIST_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc)[0...$limit]{
		...,
		${BLOG_POST_FRAGMENT_QUERY},
		'slug': $blogDir + metadata.slug.current,
	}
`
