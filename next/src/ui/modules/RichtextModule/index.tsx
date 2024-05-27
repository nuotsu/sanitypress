import TableOfContents from './TableOfContents'
import Content from './Content'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

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
	return (
		<section className="section grid gap-8 lg:grid-cols-[1fr,auto]">
			{tableOfContents && (
				<aside
					className={cn(
						'lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:w-[250px]',
						stegaClean(tocPosition) === 'right' && 'lg:order-last',
					)}
				>
					<TableOfContents headings={headings} />
				</aside>
			)}

			<Content value={content} className="max-w-screen-lg" />
		</section>
	)
}
