import { fetchSanity } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'

export default async function Page({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return <Modules modules={page?.modules} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return page.metadata
}

async function getPage(params: Props['params']) {
	return await fetchSanity<Sanity.Page>(
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
}

type Props = {
	params: { slug?: string[] }
}
