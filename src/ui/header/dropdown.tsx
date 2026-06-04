import { VscChevronDown } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import type { LinkList, Page } from '@/sanity/types'
import HoverDetails from '@/ui/hover-details'
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
	const anchorName = `--dropdown-${_key}`

	return (
		<HoverDetails
			name="header"
			className="accordion group/dropdown"
			safeAreaOnHover
		>
			<summary
				className={cn(
					'h-full group-open/dropdown:max-md:font-bold',
					summaryClassName,
				)}
				style={{ anchorName }}
			>
				{summary?.label || (summary?.internal as unknown as Page)?.title}
				<VscChevronDown />
			</summary>

			<ul
				className="md:bg-background anim-fade border-stroke max-md:pl-ch mb-ch md:py-ch top-0 z-1 origin-top leading-tight max-md:border-l md:absolute md:ml-[-1.5ch] md:min-w-max md:border md:p-[1ch_1.5ch] md:shadow-lg starting:-translate-y-1 md:starting:scale-95"
				style={{
					positionAnchor: anchorName,
					positionArea: 'end span-end',
					positionTryFallbacks: 'end span-start',
				}}
			>
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
