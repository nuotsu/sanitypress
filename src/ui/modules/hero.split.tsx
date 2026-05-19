import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { HeroSplit } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Img from '@/ui/img'
import Overline from '@/ui/overline'
import { moduleAttributes } from '.'

export default function ({
	overline,
	content = [],
	ctas,
	image,
	...props
}: HeroSplit) {
	return (
		<section
			className="section grid items-center gap-8 md:grid-cols-2"
			{...moduleAttributes(props)}
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
				<Overline value={overline} />
				<PortableText value={content} />
				<CTAList ctas={ctas} className="max-sm:*:w-full" />
			</header>
		</section>
	)
}
