import { PortableText } from 'next-sanity'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'
import Code from './Code'
import CustomHTML from '@/ui/modules/CustomHTML'
import { cn } from '@/lib/utils'

export default function Content({
	value,
	className,
	children,
}: { value: any } & React.ComponentProps<'div'>) {
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
						'custom-html': ({ value }) => (
							<CustomHTML
								className="has-[table]:md:mx-auto has-[table]:md:[grid-column:bleed]"
								{...value}
							/>
						),
					},
				}}
			/>

			{children}
		</div>
	)
}
