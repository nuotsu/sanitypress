import { PortableText, groq } from 'next-sanity'
import { fetchSanity } from '@/lib/sanity/fetch'
import { linkQuery } from '@/lib/sanity/queries'
import CTA from '@/ui/CTA'

export default async function Announcement() {
	const announcements = await fetchSanity<Sanity.Announcement[]>(
		groq`*[_type == 'site'][0].announcements[]->{
			...,
			cta{ ${linkQuery} },
		}`,
		{
			tags: ['announcements'],
			revalidate: 30,
		},
	)

	if (!announcements) return null

	const active = announcements.find(({ start, end }) => {
		return (
			(!start || new Date(start) < new Date()) &&
			(!end || new Date(end) > new Date())
		)
	})

	if (!active) return null

	return (
		<aside className="flex items-center justify-center gap-x-4 bg-ink p-2 text-center text-canvas max-md:text-sm md:gap-x-6">
			<div className="anim-fade-to-r text-balance">
				<PortableText value={active.content} />
			</div>

			<CTA className="link anim-fade-to-l shrink-0" link={active.cta} />
		</aside>
	)
}
