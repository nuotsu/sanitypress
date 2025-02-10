import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	return <Modules modules={post.modules} post={post} />
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	return processMetadata(post)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug }))
}

async function getPost(params: { slug?: string }) {
	const blogTemplateExists = await fetchSanityLive<boolean>({
		query: groq`count(*[_type == 'global-module' && path == 'blog/*']) > 0`,
	})

	if (!blogTemplateExists)
		throw Error(
			'Missing blog template: 👻 Oof, your blog posts are ghosting...\n\n' +
				'Solution: Add a new Global module document in your Sanity Studio with the path "blog/*".\n' +
				'Also add the Blog post content module to display blog post content.\n\n' +
				'💁‍♂️ https://sanitypress.dev/docs/errors#missing-blog-template',
		)

	return await fetchSanityLive<Sanity.BlogPost & { modules: Sanity.Module[] }>({
		query: groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
			...,
			body[]{
				...,
				_type == 'image' => { asset-> }
			},
			'readTime': length(string::split(pt::text(body), ' ')) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
			authors[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			},
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// path modules (before)
				+ *[_type == 'global-module' && path == 'blog/*'].before[]{ ${MODULES_QUERY} }
				// path modules (after)
				+ *[_type == 'global-module' && path == 'blog/*'].after[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			)
		}`,
		params,
	})
}

type Props = {
	params: Promise<{ slug?: string }>
}
