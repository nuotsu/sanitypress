import { PortableText, groq } from 'next-sanity'
import { fetchSanity } from '@/sanity/lib/fetch'
import { linkQuery } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'

export default async function Announcement() {
	const announcements = await fetchSanity<Sanity.Announcement[]>({
		query: groq`*[_type == 'site'][0].announcements[]->{
			...,
			cta{ ${linkQuery} },
		}`,
		tag: 'announcements',
	})

	if (!announcements) return null

	const active = announcements.find(({ start, end }) => {
		return (
			(!start || new Date(start) < new Date()) &&
			(!end || new Date(end) > new Date())
		)
	})

	if (!active) return null

	return (
		<aside className="flex items-center justify-center gap-x-4 text-balance bg-accent p-2 text-center text-canvas max-md:text-sm md:gap-x-6">
			<div className="anim-fade-to-r [&_a]:link">
				<PortableText value={active.content} />
			</div>

			<CTA className="link anim-fade-to-l shrink" link={active.cta} />
		</aside>
	)
}
