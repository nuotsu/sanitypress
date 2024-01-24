import { groq } from 'next-sanity'
import { fetchSanity } from './sanity'

export default async function getSite() {
	return await fetchSanity<Sanity.Site>(
		groq`
			*[_type == 'site'][0]{
				...,
				menu[]{
					...,
					internal->{ _type, title, metadata },
					links[]{
						...,
						internal->{ _type, title, metadata }
					}
				}
			}
		`,
		{ tags: ['site'] },
	)
}
