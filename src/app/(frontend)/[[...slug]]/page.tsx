import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_QUERY,
	SLUG_QUERY,
} from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { languages, type Lang } from '@/sanity/languages'

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
	const slugs = await client.fetch<{ slug: string }[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index'])
		]{
			'slug': ${SLUG_QUERY}
		}`,
	)

	return slugs.map(({ slug }) => ({ slug: slug.split('/') }))
}

async function getPage(params: Params) {
	const lang =
		params.slug && languages.includes(params.slug[0] as Lang)
			? params.slug[0]
			: undefined

	const slug = processSlug(params.slug, lang)

	return await fetchSanityLive<Sanity.Page>({
		query: groq`*[
			_type == 'page' &&
			${SLUG_QUERY} == $slug
			${lang ? `&& language == '${lang}'` : ''}
		][0]{
			...,
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// path modules (before)
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_QUERY}].before[]{ ${MODULES_QUERY} }
				// page modules
				+ modules[]{ ${MODULES_QUERY} }
				// path modules (after)
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_QUERY}].after[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			parent[]->{ metadata { slug } },
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		params: {
			slug: slug,
			lang,
		},
	})
}

type Params = { slug?: string[] }

type Props = {
	params: Promise<Params>
}

function processSlug(slug: string[] | undefined, lang: string | undefined) {
	if (slug === undefined) return 'index'

	if (lang) {
		const processed = slug.join('/').replace(new RegExp(`^${lang}/?`), '')
		return processed === '' ? 'index' : processed
	}

	return slug.join('/')
}
