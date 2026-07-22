import { groq } from 'next-sanity'
import { BREADCRUMBS_QUERY } from '@/modules/breadcrumbs/query'
import { CARD_LIST_QUERY } from '@/modules/card-list/query'
import { FORM_MODULE_QUERY } from '@/modules/form-module/query'
import { LOGO_LIST_QUERY } from '@/modules/logo-list/query'
import { PERSON_LIST_QUERY } from '@/modules/person-list/query'
import { PROSE_QUERY } from '@/modules/prose/query'
import { QUOTE_LIST_QUERY } from '@/modules/quote-list/query'
import { TABBED_CONTENT_QUERY } from '@/modules/tabbed-content/query'
import type { SITE_QUERY_RESULT } from '@/sanity/types'
import { sanityFetchLive } from './live'

/* fragments */

// @sanity-typegen-ignore
export const LINK_QUERY = groq`
	...,
	type == 'internal' => {
		internal->{
			_type,
			title,
			'slug': select(
				metadata.slug.current == 'index' => '/',
				'/' + metadata.slug.current
			)
		}
	}
`

// @sanity-typegen-ignore
const NAVIGATION_QUERY = groq`
	...,
	items[]{
		${LINK_QUERY},
		defined(link) => { link{ ${LINK_QUERY} } },
		defined(links[]) => { links[]{ ${LINK_QUERY} } },
		_type == 'megamenu' => {
			defined(link) => { link{ ${LINK_QUERY} } },
			items[]{
				...,
				_type == 'link' => { ${LINK_QUERY} },
				_type == 'link.list' => {
					defined(link) => { link{ ${LINK_QUERY} } },
					links[]{ ${LINK_QUERY} }
				},
				_type == 'link.card' => {
					defined(link) => { link{ ${LINK_QUERY} } },
					image{
						...,
						asset->{
							...,
							metadata
						}
					}
				}
			}
		}
	}
`

// @sanity-typegen-ignore
const SIDEBAR_QUERY = groq`
	...,
	modules[]{
		...,
		_type == 'callout' => {
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		}
	}
`

const SITE_QUERY = groq`*[_type == 'site'][0]{
	...,
	header->{ ${NAVIGATION_QUERY} },
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	footer->{ ${NAVIGATION_QUERY} },
	social->{ ${NAVIGATION_QUERY} },
}`

export const GLOBAL_MODULE_EXCLUDE_QUERY = groq`
	select(
		defined(excludePaths) => count(excludePaths[string::startsWith($slug, @)]) == 0,
		true
	)
`

export const GLOBAL_MODULE_PATH_QUERY = groq`
	string::startsWith($slug, path)
	&& ${GLOBAL_MODULE_EXCLUDE_QUERY}
`

// @sanity-typegen-ignore
export const BLOG_POST_FRAGMENT_QUERY = groq`
	'readTime': length(string::split(pt::text(content), ' ')) / 200,
	categories[]->{
		title,
		slug
	},
	author->{
		name,
		image{
			...,
			asset->
		}
	}
`

// @sanity-typegen-ignore
export const MODULES_QUERY = groq`
	...,
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	sidebar{ ${SIDEBAR_QUERY} },
	${FORM_MODULE_QUERY},
	${BREADCRUMBS_QUERY(LINK_QUERY)},
	${CARD_LIST_QUERY(LINK_QUERY)},
	${LOGO_LIST_QUERY},
	${PERSON_LIST_QUERY},
	${PROSE_QUERY},
	${QUOTE_LIST_QUERY},
	${TABBED_CONTENT_QUERY(LINK_QUERY)},
`

/* queries */

export async function getSite() {
	return await sanityFetchLive<SITE_QUERY_RESULT>({
		query: SITE_QUERY,
	})
}
