import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type {
	BLOG_POST_QUERY_RESULT,
	BlogCategory,
	BlogPostContent,
	Person,
} from '@/sanity/types'
import Img from '@/ui/img'
import CustomHTML from '@/ui/modules/custom-html'
import AnchoredHeading from '@/ui/modules/prose/anchored-heading'
import Code from '@/ui/modules/prose/code'
import Image from '@/ui/modules/prose/image'
import Sidebar from '@/ui/sidebar'
import { Module } from '..'
import AccordionList from '../accordion-list'
import css from './blog-post-content.module.css'
import Byline from './byline'
import Categories from './categories'
import Date from './date'
import Schema from './schema'

export default function ({
	post,
	sidebar,
	...props
}: { post: BLOG_POST_QUERY_RESULT } & BlogPostContent) {
	if (!post) return null

	return (
		<>
			<Module as="article" {...props}>
				<header className="section relative text-center">
					<Img
						image={post.metadata?.image}
						imageOptions={{ blur: 30 }}
						width={1000}
						className="absolute inset-0 size-full object-cover opacity-10 delay-1000 duration-2000 starting:opacity-0"
						alt={post.metadata?.title ?? ''}
						draggable={false}
						loading="eager"
					/>

					<div className="relative mx-auto max-w-5xl space-y-4">
						<h1 className="h1 text-balance">
							{post.title || post.metadata?.title}
						</h1>

						<div className="gap-x-lh gap-y-ch flex flex-wrap items-center justify-center">
							<Byline author={post.author as unknown as Person} />
							<Categories
								categories={post.categories as BlogCategory[]}
								linked
							/>
							<Date date={post.publishDate} />
							<span>{Math.ceil(post.readTime)} min read</span>
						</div>
					</div>
				</header>

				<section className="post-content section gap-lh flex max-md:flex-col md:items-start">
					<Sidebar
						{...sidebar}
						headings={post.headings}
						className="max-md:p-ch max-md:bg-[#ededed] [&_summary]:max-md:bg-[#ededed]"
					/>

					<div className={cn(css.body, 'prose mx-auto grid w-full max-w-4xl')}>
						<PortableText
							value={post.content ?? []}
							components={{
								block: {
									h1: (node) => <AnchoredHeading as="h1" {...node} />,
									h2: (node) => <AnchoredHeading as="h2" {...node} />,
									h3: (node) => <AnchoredHeading as="h3" {...node} />,
									h4: (node) => <AnchoredHeading as="h4" {...node} />,
									h5: (node) => <AnchoredHeading as="h5" {...node} />,
									h6: (node) => <AnchoredHeading as="h6" {...node} />,
								},
								types: {
									image: Image,
									'accordion-list': ({ value }) => (
										<AccordionList
											{...value}
											className="p-0 [&_header]:text-left"
										/>
									),
									code: Code,
									'custom-html': ({ value }) => (
										<CustomHTML {...value} className="my-6" />
									),
								},
							}}
						/>
					</div>
				</section>
			</Module>

			<Schema post={post} />
		</>
	)
}
