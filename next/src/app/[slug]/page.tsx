import { fetchSanity, groq } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return <Modules modules={page?.modules} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return processMetadata(page)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index', '404'])
		].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug }))
}

async function getPage(params: Props['params']) {
	return await fetchSanity<Sanity.Page>(
		groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug &&
			!(metadata.slug.current in ['index', '404'])
		][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				},
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
			},
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
		{
			params: { slug: params.slug },
			tags: ['pages'],
		},
	)
}

type Props = {
	params: { slug?: string }
}
