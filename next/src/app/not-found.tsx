import Modules from '@/components/modules'
import { fetchSanity } from '@/lib/sanity'
import { groq } from 'next-sanity'

export default async function NotFound() {
	const page = await fetchSanity<Sanity.Page | undefined>(
		groq`*[_type == 'page' && metadata.slug.current == '404'][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				}
			}
		}`,
		{ tags: ['404'] },
	)

	if (!page) return <h1 className="text-center text-5xl">404</h1>

	return <Modules modules={page?.modules} />
}
