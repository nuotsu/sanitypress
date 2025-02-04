import { fetchSanityLive } from './fetch'
import { groq } from 'next-sanity'

export const LINK_QUERY = groq`
	...,
	internal->{ _type, title, metadata }
`

const NAVIGATION_QUERY = groq`
	title,
	items[]{
		${LINK_QUERY},
		link{ ${LINK_QUERY} },
		links[]{ ${LINK_QUERY} }
	}
`

export const CTA_QUERY = groq`
	...,
	link{ ${LINK_QUERY} }
`

export async function getSite() {
	const data = await fetchSanityLive<Sanity.Site>({
		query: groq`
			*[_type == 'site'][0]{
				...,
				ctas[]{ ${CTA_QUERY} },
				headerMenu->{ ${NAVIGATION_QUERY} },
				footerMenu->{ ${NAVIGATION_QUERY} },
				social->{ ${NAVIGATION_QUERY} },
				'ogimage': ogimage.asset->url
			}
		`,
	})

	if (!data) throw Error('No `site` document found in the Studio')

	return data
}

export const REPUTATION_QUERY = groq`
	_type == 'reputation-block' => { reputation-> }
`

export const MODULES_QUERY = groq`
	...,
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	_type == 'blog-list' => { filteredCategory-> },
	_type == 'breadcrumbs' => { crumbs[]{ ${LINK_QUERY} } },
	_type == 'callout' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		}
	},
	_type == 'card-list' => {
		cards[]{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'creative-module' => {
		modules[]{
			...,
			subModules[]{
				...,
				ctas[]{ ${CTA_QUERY} }
			}
		}
	},
	_type == 'hero' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		}
	},
	_type == 'hero.saas' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		}
	},
	_type == 'hero.split' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		}
	},
	_type == 'logo-list' => { logos[]-> },
	_type == 'person-list' => { people[]-> },
	_type == 'pricing-list' => {
		tiers[]->{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'richtext-module' => {
		'headings': select(
			tableOfContents => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
				style,
				'text': pt::text(@)
			}
		),
	},
	_type == 'tabbed-content' => {
		tabs[]{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'testimonial.featured' => { testimonial-> },
	_type == 'testimonial-list' => { testimonials[]-> },
`
