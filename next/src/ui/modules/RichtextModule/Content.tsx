import { PortableText } from 'next-sanity'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'
import CodeBlock from './CodeBlock'
import { cn } from '@/lib/utils'

export default function Content({
	value,
	className,
}: { value: any } & React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'richtext mx-auto w-full [&>:first-child]:!mt-0',
				className,
			)}
		>
			<PortableText
				value={value}
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
						'code-block': CodeBlock,
					},
				}}
			/>
		</div>
	)
}
