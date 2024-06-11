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

export async function getSite() {
	return await fetchSanity<Sanity.Site>(
		groq`
			*[_type == 'site'][0]{
				...,
				ctas[]{
					...,
					link{ ${linkQuery} }
				},
				headerMenu->{ ${navigationQuery} },
				footerMenu->{ ${navigationQuery} },
				social->{ ${navigationQuery} },
				'ogimage': ogimage.asset->url
			}
		`,
		{ tags: ['site'] },
	)
}

export const modulesQuery = groq`
	...,
	ctas[]{
		...,
		link{ ${linkQuery} }
	},
	_type == 'blog-rollup' => { predefinedFilters[]-> },
	_type == 'breadcrumbs' => { crumbs[]{ ${linkQuery} } },
	_type == 'creative-module' => {
		modules[]{
			...,
			subModules[]{
				...,
				ctas[]{
					...,
					link{ ${linkQuery} }
				}
			}
		}
	},
	_type == 'logo-list' => { logos[]-> },
	_type == 'pricing-list' => { tiers[]-> },
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
