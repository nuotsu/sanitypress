import TableOfContents from './TableOfContents'
import Content from './Content'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function RichtextModule({
	content,
	tableOfContents,
	tocPosition = 'right',
	headings,
}: Partial<{
	content: any
	tableOfContents: boolean
	tocPosition: 'left' | 'right'
	headings: {
		style: string
		text: string
	}[]
}>) {
	const tocRight = tableOfContents && stegaClean(tocPosition) === 'right'

	return (
		<section
			className={cn(
				'section grid gap-8',
				tocRight ? 'lg:grid-cols-[1fr,auto]' : 'lg:grid-cols-[auto,1fr]',
			)}
		>
			{tableOfContents && (
				<aside
					className={cn(
						'lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:w-[250px]',
						tocRight && 'lg:order-last',
					)}
				>
					<TableOfContents headings={headings} />
				</aside>
			)}

			<Content value={content} className="max-w-screen-lg" />
		</section>
	)
}
