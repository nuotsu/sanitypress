import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import Modules from '@/components/modules'

export default async function Page({
	params,
}: {
	params: { slug?: string[] }
}) {
	const page = await client.fetch<Sanity.Page>(
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
		{ slug: !params.slug ? 'index' : params.slug?.join('/') },
	)

	return <Modules modules={page.modules} />
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(groq`
		*[_type == 'page' && metadata.slug.current != '404'].metadata.slug.current
	`)

	return slugs.map((slug) => ({
		slug: slug === 'index' ? [] : slug.split('/'),
	}))
}

export const dynamicParams = false
