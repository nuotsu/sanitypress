import TableOfContents from './TableOfContents'
import Content from './Content'

export default function RichtextModule({
	content,
	tableOfContents,
	headings,
}: Partial<{
	content: any
	tableOfContents: boolean
	headings: {
		style: string
		text: string
	}[]
}>) {
	return (
		<section className="section grid gap-8 lg:grid-cols-[1fr,auto]">
			{tableOfContents && (
				<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-[250px]">
					<TableOfContents headings={headings} />
				</aside>
			)}

			<Content value={content} className="max-w-screen-lg" />
		</section>
	)
}
