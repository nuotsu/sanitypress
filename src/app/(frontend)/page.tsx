import { sanityFetch } from '@/lib/sanity/fetch'
import { defineQuery } from 'next-sanity'
import { modulesQuery } from '@/lib/sanity/queries'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page() {
	const page = await getPage()
	return <Modules modules={page?.modules} />
}

export async function generateMetadata() {
	const page = await getPage()
	return processMetadata(page)
}

async function getPage() {
	const { data } = await sanityFetch({
		query:
			defineQuery(`*[_type == 'page' && metadata.slug.current == 'index'][0]{
				...,
				modules[]{ ${modulesQuery} },
				metadata {
					...,
					'ogimage': image.asset->url + '?w=1200',
				}
			}`),
	})

	if (!data)
		throw new Error(
			"Missing 'page' document with metadata.slug 'index' in Sanity Studio",
		)

	return data as Sanity.Page
}
