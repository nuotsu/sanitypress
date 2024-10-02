import { fetchSanity, groq } from './fetch'

export const linkQuery = groq`
	...,
	internal->{ _type, title, metadata }
`

const navigationQuery = groq`
	title,
	items[]{
		${linkQuery},
		link{ ${linkQuery} },
		links[]{ ${linkQuery} }
	}
`

export const ctaQuery = groq`
	...,
	link{ ${linkQuery} }
`

export async function getSite() {
	const site = await fetchSanity<Sanity.Site>(
		groq`
			*[_type == 'site'][0]{
				...,
				ctas[]{ ${ctaQuery} },
				headerMenu->{ ${navigationQuery} },
				footerMenu->{ ${navigationQuery} },
				social->{ ${navigationQuery} },
				'ogimage': ogimage.asset->url
			}
		`,
		{ tags: ['site'] },
	)

	if (!site) throw new Error("Missing 'site' document in Sanity Studio")

	return site
}

export const reputationBlockQuery = groq`
	_type == 'reputation' => { reputation-> }
`

export const modulesQuery = groq`
	...,
	ctas[]{
		...,
		link{ ${linkQuery} }
	},
	_type == 'blog-list' => { filteredCategory-> },
	_type == 'breadcrumbs' => { crumbs[]{ ${linkQuery} } },
	_type == 'card-list' => {
		cards[]{
			...,
			ctas[]{ ${ctaQuery} }
		}
	},
	_type == 'creative-module' => {
		modules[]{
			...,
			subModules[]{
				...,
				ctas[]{ ${ctaQuery} }
			}
		}
	},
	_type == 'hero' => {
		content[]{
			...,
			${reputationBlockQuery}
		}
	},
	_type == 'hero.saas' => {
		content[]{
			...,
			${reputationBlockQuery}
		}
	},
	_type == 'hero.split' => {
		content[]{
			...,
			${reputationBlockQuery}
		}
	},
	_type == 'logo-list' => { logos[]-> },
	_type == 'pricing-list' => {
		tiers[]->{
			...,
			ctas[]{ ${ctaQuery} }
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
	_type == 'testimonial.featured' => { testimonial-> },
	_type == 'testimonial-list' => { testimonials[]-> },
`
