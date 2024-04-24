import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="relative">
			<summary>{label}</summary>

			<ul className="anim-fade-to-b absolute left-0 top-full min-w-max border bg-white/90 p-2 backdrop-blur">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA className="link" link={link} />
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
