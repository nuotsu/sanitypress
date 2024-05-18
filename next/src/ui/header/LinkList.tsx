import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'
import { CgChevronRight } from 'react-icons/cg'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="group relative" closeAfterNavigate>
			<summary className="flex items-center gap-1">
				{label}
				<CgChevronRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b left-0 top-full space-y-1 border px-3 py-2 shadow-md md:absolute md:min-w-max md:bg-canvas/90 md:backdrop-blur">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA className="link" link={link} />
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
