import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPage(await params)
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(await params)
	if (!page) notFound()
	return processMetadata(page)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index', 'blog/*'])
		].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug: slug.split('/') }))
}

async function getPage(params: { slug?: string[] }) {
	const slug = params.slug?.join('/')

	return await fetchSanityLive<Sanity.Page>({
		query: groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug &&
			!(metadata.slug.current in ['index', 'blog/*'])
		][0]{
			...,
			'modules': (
				// page modules
				modules[]{ ${MODULES_QUERY} }
				// path modules
				+ *[_type == 'global-module' && path.current != '*' && ($slug + '/*' != path.current && $slug match path.current)].modules[]{
					${MODULES_QUERY}
				}
				// global modules
				+ *[_type == 'global-module' && path.current == '*'].modules[]{
					${MODULES_QUERY}
				}
			),
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		params: { slug },
	})
}

type Props = {
	params: Promise<{ slug?: string[] }>
}
