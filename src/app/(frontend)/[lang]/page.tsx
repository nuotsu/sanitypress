import Modules from '@/ui/modules'
import { languages, type Lang } from '@/sanity/languages'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import processMetadata from '@/lib/processMetadata'
import errors from '@/lib/errors'

export const dynamic = 'force-static'
export const dynamicParams = false

export default async function Page({ params }: Props) {
	const page = await getPage(await params)
	return <Modules modules={page?.modules} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(await params)
	return processMetadata(page)
}

export async function generateStaticParams() {
	return languages
}

async function getPage({ lang }: Params) {
	const page = await fetchSanityLive<Sanity.Page>({
		query: groq`*[_type == 'page' && metadata.slug.current == 'index' && language == $lang][0]{
			...,
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// page modules
				+ modules[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200',
			}
		}`,
		params: { lang },
	})

	if (!page) throw new Error(errors.missingHomepage)

	return page
}

type Params = { lang: Lang }

type Props = {
	params: Promise<Params>
}
