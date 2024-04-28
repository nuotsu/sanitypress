import Date from '@/ui/Date'
import ReadTime from './ReadTime'
import TableOfContents from './TableOfContents'
import { PortableText } from '@portabletext/react'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article>
			<header className="section space-y-4 text-center">
				<h1 className="h1">{post.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-4">
					<Date value={post.publishDate} />
					<ReadTime value={post.readTime} />
				</div>
			</header>

			<div className="section max-w-screen-md space-y-8">
				<aside>
					<TableOfContents headings={post.headings} />
				</aside>

				<div className="richtext">
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
