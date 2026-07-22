import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import { Module } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { HeroSplit } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'

export default function ({
	eyebrow,
	content = [],
	ctas,
	image,
	...props
}: HeroSplit) {
	return (
		<Module
			className="section grid items-center gap-8 md:grid-cols-2"
			{...props}
		>
			<figure
				className={cn(
					image?.onRight && 'md:order-last',
					image?.afterContent && 'max-md:order-last',
				)}
			>
				<Img
					className="w-full"
					image={image}
					width={600}
					alt={image?.alt ?? ''}
				/>
			</figure>

			<header className="prose">
				<Eyebrow value={eyebrow} />
				<PortableText
					value={content}
					components={{
						types: {
							'custom-html': ({ value }) => <CustomHTML {...value} />,
						},
					}}
				/>
				<CTAList ctas={ctas} className="max-sm:*:w-full" />
			</header>
		</Module>
	)
}
