import { cn } from '@/lib/utils'
import type { DynamicFetchOptions } from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { LinkList, Megamenu as MegamenuType } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Dropdown from './dropdown'
import Megamenu from './megamenu'

const topLevelClassName = cn(
	'grid md:place-content-center md:text-center md:text-balance leading-tight py-[.5ch] md:py-ch',
)

export default async function ({ perspective, stega }: DynamicFetchOptions) {
	const site = await getSite({ perspective, stega })

	return (
		<nav className="gap-x-lh flex items-stretch [grid-area:navigation] max-md:my-4 max-md:flex-col">
			{site?.header?.items?.map((item, i) => {
				switch (item._type) {
					case 'link':
						return (
							<SanityLink
								link={item as SanityLinkType}
								className={cn(
									topLevelClassName,
									'text-current hover:underline',
								)}
								key={`${item._key}-${i}`}
							/>
						)

					case 'link.list':
						return (
							<Dropdown
								key={`${item._key}-${i}`}
								{...(item as LinkList & { _key: string })}
								summaryClassName={topLevelClassName}
							/>
						)

					case 'megamenu':
						return (
							<Megamenu
								key={`${item._key}-${i}`}
								{...(item as MegamenuType)}
								summaryClassName={topLevelClassName}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
