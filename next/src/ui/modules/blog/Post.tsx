import Date from '@/ui/Date'
import Categories from './Categories'
import ReadTime from './ReadTime'
import { PortableText } from '@portabletext/react'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import AnchoredHeading from '@/ui/modules/RichtextModule/AnchoredHeading'
import Image from '@/ui/modules/RichtextModule/Image'
import CodeBlock from '../RichtextModule/CodeBlock'
import css from './Post.module.css'
import { cn } from '@/lib/utils'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article>
			<header className="section space-y-6 text-center">
				<h1 className="h1 text-balance">{post.metadata.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-4">
					<Date value={post.publishDate} />
					<Categories categories={post.categories} />
					<ReadTime value={post.readTime} />
				</div>
			</header>

			<div className="section grid gap-8 lg:grid-cols-[1fr,auto]">
				<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-[250px]">
					<TableOfContents headings={post.headings} />
				</aside>

				<div
					className={cn(
						css.body,
						'richtext mx-auto grid w-full max-w-screen-md !space-y-[1em] [&>:first-of-type]:!mt-0',
					)}
				>
					<PortableText
						value={post.body}
						components={{
							block: {
								h2: (node) => <AnchoredHeading as="h2" {...node} />,
								h3: (node) => <AnchoredHeading as="h3" {...node} />,
							},
							types: {
								image: Image,
								'code-block': CodeBlock,
							},
						}}
					/>
				</div>
			</div>
		</article>
	)
}
