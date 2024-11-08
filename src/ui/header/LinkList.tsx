import InteractiveDetails from './InteractiveDetails'
import { CgChevronRight } from 'react-icons/cg'
import CTA from '@/ui/CTA'
import { cn } from '@/lib/utils'

export default function LinkList({ link, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails
			className="group relative"
			name="header"
			delay={10}
			closeAfterNavigate
		>
			<summary className="flex items-center gap-1 md:px-3">
				{link?.label}
				<CgChevronRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b md:frosted-glass left-0 top-full px-3 py-2 max-md:border-l md:absolute md:min-w-max md:rounded md:border md:bg-canvas md:shadow-md">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA
							className={cn(
								'hover:link inline-block py-px',
								link.external?.startsWith('http') && 'is-external',
							)}
							link={link}
						/>
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
