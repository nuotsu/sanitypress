import { VscChevronDown } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import type { LinkList, Page } from '@/sanity/types'
import HoverDetails from '@/ui/details/hover-details'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	link: summary,
	links,
	_key,
	summaryClassName,
}: LinkList & {
	_key: string
	summaryClassName?: string
}) {
	return (
		<HoverDetails
			name="header"
			className="accordion md:dropdown group/dropdown"
			style={{ '--anchor-name': `--dropdown-${_key}` }}
			safeAreaOnHover
		>
			<summary
				className={cn(
					'h-full group-open/dropdown:max-md:font-bold',
					summaryClassName,
				)}
			>
				{summary?.label || (summary?.internal as unknown as Page)?.title}
				<VscChevronDown />
			</summary>

			<ul className="max-md:anim-fade-to-b border-stroke max-md:pl-ch mb-ch md:py-ch leading-tight max-md:border-l md:ml-[-1.5ch] md:border md:p-[1ch_1.5ch]">
				{links?.map((link, key) => (
					<li key={key}>
						<SanityLink
							link={link as SanityLinkType}
							className="inline-block py-1 text-current hover:underline"
						/>
					</li>
				))}
			</ul>
		</HoverDetails>
	)
}
