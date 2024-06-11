import { fetchSanity, groq } from '@/lib/sanity/fetch'
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
	const page = await fetchSanity<Sanity.Page>(
		groq`*[_type == 'page' && metadata.slug.current == 'index'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
		{
			tags: ['homepage'],
		},
	)

	if (!page)
		throw new Error(
			"Missing 'page' document with metadata.slug 'index' in Sanity Studio",
		)

	return page
}
