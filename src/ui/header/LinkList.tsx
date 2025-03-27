import InteractiveDetails from './InteractiveDetails'
import { CgChevronRight } from 'react-icons/cg'
import CTA from '@/ui/CTA'
import { cn } from '@/lib/utils'

export default function LinkList({
	link,
	links,
	summaryClassName,
}: Sanity.LinkList & { summaryClassName?: string }) {
	return (
		<InteractiveDetails
			className="group relative"
			name="header"
			delay={10}
			closeAfterNavigate
		>
			<summary
				className={cn(summaryClassName, 'flex h-full items-center gap-1')}
			>
				{link?.label}
				<CgChevronRight className="shrink-0 transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b md:frosted-glass md:bg-canvas border-ink/10 top-full left-0 px-3 py-2 max-md:border-s md:absolute md:min-w-max md:rounded md:border md:shadow-md">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA className="hover:link inline-block py-px" link={link} />
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
