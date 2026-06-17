import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Sidebar } from '@/sanity/types'
import Callout from './modules/callout'
import CustomHtml from './modules/custom-html'
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
			{modules?.map((module) => {
				switch (module._type) {
					case 'callout':
						return <Callout {...module} className="p-0" />

					case 'custom-html':
						return <CustomHtml {...module} />

					case 'tableOfContents':
						return (
							<TableOfContents
								summary="On this page"
								headings={headings}
								open
							/>
						)

					default:
						return null
				}
			})}
		</aside>
	)
}
