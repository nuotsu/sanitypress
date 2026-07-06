import { VscChevronDown } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import type { Megamenu, Page } from '@/sanity/types'
import HoverDetails from '@/ui/details/hover-details'
import MobileOnlyDetails from '@/ui/details/mobile-only-details'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import LinkCard from './link.card'

export default function ({
	link,
	items,
	summaryClassName,
}: Megamenu & {
	summaryClassName?: string
}) {
	return (
		<HoverDetails
			name="header"
			className="accordion group/megamenu [--safearea-x:20vw]!"
			safeAreaOnHover
		>
			<summary
				className={cn(
					'h-full group-open/megamenu:max-md:font-bold',
					summaryClassName,
				)}
			>
				{link?.label || (link?.internal as unknown as Page)?.title}
				<VscChevronDown />
			</summary>

			<div className="anim-fade-to-b md:bg-background border-stroke inset-x-0 top-full md:absolute md:max-h-[calc(100vh-var(--header-height))] md:overflow-y-auto md:border-b md:shadow-lg">
				<div className="section md:py-lh gap-x-lh border-stroke max-md:pl-ch md:*:mb-lh py-0 max-md:grid max-md:border-l sm:columns-3xs">
					{items?.map((item, i) => {
						switch (item._type) {
							case 'link.list':
								return (
									<MobileOnlyDetails
										className="accordion group/megamenu-linklist break-inside-avoid md:details-content:h-[initial]"
										name="megamenu-linklist"
										key={`${item._key}-${i}`}
									>
										<summary className="text-foreground/50 relative py-1 md:cursor-default">
											<SanityLink
												className="after:absolute after:inset-0"
												link={item.link as unknown as SanityLinkType}
											/>
											<VscChevronDown className="md:hidden" />
										</summary>

										<ul className="border-stroke max-md:pl-ch max-md:anim-fade-to-b mb-ch leading-tight max-md:border-l">
											{item.links?.map((link, j) => {
												return (
													<li key={`${link._key}-${j}`}>
														<SanityLink
															link={link as unknown as SanityLinkType}
															className="inline-block py-1 text-current [[href]]:hover:underline"
														/>
													</li>
												)
											})}
										</ul>
									</MobileOnlyDetails>
								)

							case 'link.card':
								return <LinkCard {...item} key={`${item._key}-${i}`} />

							case 'link':
								return (
									<SanityLink
										link={item as unknown as SanityLinkType}
										className="py-1 text-current hover:underline"
										key={`${item._key}-${i}`}
									/>
								)

							default:
								return null
						}
					})}
				</div>
			</div>
		</HoverDetails>
	)
}
