import client from '@/sanity/client'
import { fetchSanity, groq } from '@/sanity/lib/fetch'
import { modulesQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPage(await params)
	if (!page) notFound()
	return <Modules modules={page?.modules} page={page} />
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
	return await fetchSanity<Sanity.Page>({
		query: groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug &&
			!(metadata.slug.current in ['index', 'blog/*'])
		][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		params: { slug: params.slug?.join('/') },
	})
}

type Props = {
	params: Promise<{ slug?: string[] }>
}
