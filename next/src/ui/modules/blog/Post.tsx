import Date from '@/ui/Date'
import ReadTime from './ReadTime'
import TableOfContents from './TableOfContents'
import { PortableText } from '@portabletext/react'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article className="section richtext">
			<header>
				<h1 className="h1">{post.title}</h1>
				<Date value={post.publishDate} />
				<ReadTime value={post.readTime} />
			</header>

			<div className="space-y-4">
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
