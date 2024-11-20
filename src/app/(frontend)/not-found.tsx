import { fetchSanity, groq } from '@/sanity/lib/fetch'
import { modulesQuery } from '@/sanity/lib/queries'
import Modules from '@/ui/modules'

export default async function NotFound() {
	const page = await get404()
	if (!page) return <h1 className="section text-center text-5xl">404</h1>
	return <Modules modules={page?.modules} />
}

export async function generateMetadata() {
	return (await get404())?.metadata
}

async function get404() {
	return await fetchSanity<Sanity.Page>({
		query: groq`*[_type == 'page' && metadata.slug.current == '404'][0]{
			...,
			modules[]{ ${modulesQuery} }
		}`,
	})
}
