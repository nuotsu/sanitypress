import { PortableText } from '@portabletext/react'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'
import Code from './Code'
import { cn } from '@/lib/utils'

export default function Content({
	value,
	className,
	children,
}: { value: any } & React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'richtext mx-auto w-full space-y-[1em] [&>:first-child]:!mt-0',
				className,
			)}
		>
			<PortableText
				value={value}
				components={{
					block: {
						h2: (node) => <AnchoredHeading as="h2" {...node} />,
						h3: (node) => <AnchoredHeading as="h3" {...node} />,
						h4: (node) => <AnchoredHeading as="h4" {...node} />,
						h5: (node) => <AnchoredHeading as="h5" {...node} />,
						h6: (node) => <AnchoredHeading as="h6" {...node} />,
						blockquote: ({ children }) => (
							<blockquote className="border-l-2 pl-4">
								<p>{children}</p>
							</blockquote>
						),
					},
					types: {
						image: Image,
						code: Code,
					},
				}}
			/>

			{children}
		</div>
	)
}
