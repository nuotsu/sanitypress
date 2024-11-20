import { groq, fetchSanity } from '@/sanity/lib/fetch'
import { modulesQuery } from '@/sanity/lib/queries'
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
	const data = await fetchSanity<Sanity.Page>({
		query: groq`*[_type == 'page' && metadata.slug.current == 'index'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200',
			}
		}`,
	})

	if (!data)
		throw Error('No `page` document with slug "index" found in the Studio')

	return data
}
