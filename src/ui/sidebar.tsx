import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Sidebar } from '@/sanity/types'
import Callout from './modules/callout'
import CustomHTML from './modules/custom-html'
import TableOfContents, { type ToCHeadings } from './table-of-contents'

export default function ({
	modules,
	position: p,
	headings,
	className,
}: {
	headings: ToCHeadings
} & Partial<Sidebar> &
	React.ComponentProps<'aside'>) {
	const position = stegaClean(p)

	if (!position) return null

	return (
		<aside
			className={cn(
				'md:sticky-below-header space-y-lh shrink-0 [--offset:1rem] md:w-[24ch]',
				position === 'right' && 'md:order-last',
				className,
			)}
		>
			{modules?.map((module, i) => {
				switch (module._type) {
					case 'callout':
						return (
							<Callout
								{...module}
								className="p-0"
								key={`${module._key}-${i}`}
							/>
						)

					case 'custom-html':
						return <CustomHTML {...module} key={`${module._key}-${i}`} />

					case 'tableOfContents':
						return (
							<TableOfContents
								summary="On this page"
								headings={headings}
								open
								key={`${module._key}-${i}`}
							/>
						)

					default:
						return null
				}
			})}
		</aside>
	)
}
