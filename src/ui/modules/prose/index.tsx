import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Prose } from '@/sanity/types'
import CustomHTML from '@/ui/modules/custom-html'
import Sidebar from '@/ui/sidebar'
import TableOfContents from '@/ui/table-of-contents'
import { Module } from '..'
import AnchoredHeading from './anchored-heading'
import Code from './code'
import Image from './image'

export default function ({
	content,
	sidebar,
	headings,
	...props
}: Prose & React.ComponentProps<typeof TableOfContents>) {
	return (
		<Module
			className={cn(
				'section',
				sidebar && 'gap-lh flex max-md:flex-col md:items-start',
			)}
			{...props}
		>
			<Sidebar {...sidebar} headings={headings} />

			<article className="prose mx-auto w-full max-w-3xl">
				<PortableText
					value={content ?? []}
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
							code: Code,
							'custom-html': ({ value }) => <CustomHTML {...value} />,
						},
					}}
				/>
			</article>
		</Module>
	)
}
