import Date from '@/ui/Date'
import Categories from './Categories'
import ReadTime from './ReadTime'
import { PortableText } from '@portabletext/react'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import AnchoredHeading from '@/ui/modules/RichtextModule/AnchoredHeading'
import Image from '@/ui/modules/RichtextModule/Image'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article>
			<header className="section space-y-4 text-center">
				<h1 className="h1 text-balance">{post.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-4">
					<Date value={post.publishDate} />
					<Categories categories={post.categories} />
					<ReadTime value={post.readTime} />
				</div>
			</header>

			<div className="section grid gap-8 md:grid-cols-[1fr,auto]">
				<aside className="md:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] md:order-1 md:w-[250px]">
					<TableOfContents headings={post.headings} />
				</aside>

				<div className="richtext mx-auto max-w-screen-sm [&>:not(:first-of-type)]:!mt-[1em]">
					<PortableText
						value={post.body}
						components={{
							block: {
								h2: (node) => <AnchoredHeading as="h2" {...node} />,
								h3: (node) => <AnchoredHeading as="h3" {...node} />,
							},
							types: {
								image: Image,
							},
						}}
					/>
				</div>
			</div>
		</article>
	)
}
