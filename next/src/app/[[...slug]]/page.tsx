import { client, fetchSanity } from '@/lib/sanity'
import { groq } from 'next-sanity'
import Modules from '@/components/modules'

export default async function Page({ params }: Props) {
	const page = await fetchSanity<Sanity.Page>(
		groq`*[_type == 'page' && metadata.slug.current == $slug][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				}
			}
		}`,
		{
			params: { slug: !params.slug ? 'index' : params.slug?.join('/') },
			tags: ['page'],
		},
	)

	return <Modules modules={page.modules} />
}

export async function generateMetadata({ params }: Props) {
	return await fetchSanity<Sanity.Metadata>(
		groq`*[_type == 'page' && metadata.slug.current == $slug][0].metadata`,
		{
			params: { slug: !params.slug ? 'index' : params.slug?.join('/') },
			tags: ['page.metadata'],
		},
	)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[_type == 'page' && metadata.slug.current != '404'].metadata.slug.current`,
		{ tags: ['page.slug'] },
	)

	return slugs.map((slug) => ({
		slug: slug === 'index' ? [] : slug.split('/'),
	}))
}

export const dynamicParams = false

type Props = {
	params: { slug?: string[] }
}
