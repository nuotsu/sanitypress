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
		{ slug: !params.slug ? 'index' : params.slug?.join('/') },
	)

	return <Modules modules={page.modules} />
}

export async function generateMetadata({ params }: Props) {
	return await fetchSanity<Sanity.Metadata>(
		groq`*[_type == 'page' && metadata.slug.current == $slug][0].metadata`,
		{ slug: !params.slug ? 'index' : params.slug?.join('/') },
	)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(groq`
		*[_type == 'page' && metadata.slug.current != '404'].metadata.slug.current
	`)

	return slugs.map((slug) => ({
		slug: slug === 'index' ? [] : slug.split('/'),
	}))
}

export const dynamicParams = false

type Props = {
	params: { slug?: string[] }
}
