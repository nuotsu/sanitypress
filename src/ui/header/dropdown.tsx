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
			</summary>

			<ul
				className="md:bg-background anim-fade-to-b border-stroke max-md:pl-ch mb-ch md:py-ch top-0 z-1 leading-tight max-md:border-l md:absolute md:ml-[-1.5ch] md:min-w-max md:border md:p-[1ch_1.5ch] md:shadow-lg"
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
