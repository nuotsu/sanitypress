import { PortableText } from 'next-sanity'
import TableOfContents from './TableOfContents'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'

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
		<section className="section grid gap-8 md:grid-cols-[1fr,auto]">
			{tableOfContents && (
				<aside className="md:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] md:order-1 md:w-[250px]">
					<TableOfContents headings={headings} />
				</aside>
			)}

			<div className="richtext mx-auto w-full max-w-screen-lg [&>:not(:first-of-type)]:!mt-[1em]">
				<PortableText
					value={content}
					components={{
						block: {
							h2: (node) => <AnchoredHeading as="h2" {...node} />,
							h3: (node) => <AnchoredHeading as="h3" {...node} />,
							blockquote: ({ children }) => (
								<blockquote className="border-l-2 pl-4">
									<p>{children}</p>
								</blockquote>
							),
						},
						types: {
							image: Image,
						},
					}}
				/>
			</div>
		</section>
	)
}
