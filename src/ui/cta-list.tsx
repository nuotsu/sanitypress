import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Cta } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from './sanity-link'

export default function ({
	ctas,
	className,
}: {
	ctas?: (Cta & { _key?: string })[]
} & React.ComponentProps<'div'>) {
	if (!ctas?.length) return null

	return (
		<div
			className={cn(
				'cta-list flex flex-wrap items-center gap-[.25em_.5em]',
				className,
			)}
		>
			{ctas.map((cta, i) => (
				<SanityLink
					link={cta.link as SanityLinkType}
					className={stegaClean(cta.theme)}
					key={`${cta._key}-${i}`}
				/>
			))}
		</div>
	)
}
