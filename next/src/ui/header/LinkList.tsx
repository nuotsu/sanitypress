import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="relative" closeAfterNavigate>
			<summary>{label}</summary>

			<ul className="anim-fade-to-b left-0 top-full border p-2 md:absolute md:min-w-max md:bg-white/90 md:backdrop-blur">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA className="link" link={link} />
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
