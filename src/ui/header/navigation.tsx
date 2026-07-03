import { cn } from '@/lib/utils'
import { getSite } from '@/sanity/lib/queries'
import type { LinkList, Megamenu as MegamenuType } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Dropdown from './dropdown'
import Megamenu from './megamenu'

const topLevelClassName = cn(
	'grid md:place-content-center md:text-center md:text-balance leading-tight py-[.5ch] md:py-ch',
)

export default async function () {
	const site = await getSite()

	return (
		<nav className="max-md:header-not-open:hidden max-md:anim-fade-to-b gap-x-lh flex items-stretch [grid-area:navigation] max-md:my-4 max-md:flex-col">
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
								{...(item as LinkList & { _key: string })}
								summaryClassName={topLevelClassName}
								key={`${item._key}-${i}`}
							/>
						)

					case 'megamenu':
						return (
							<Megamenu
								{...(item as MegamenuType)}
								summaryClassName={topLevelClassName}
								key={`${item._key}-${i}`}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
