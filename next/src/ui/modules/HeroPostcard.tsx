import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroPostcard({
	content,
	ctas,
	image,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image &
		Partial<{
			onRight: boolean
			loading: 'lazy' | 'eager'
		}>
}>) {
	return (
		<section className="section grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
			<figure className={cn(image?.onRight && 'md:order-1')}>
				<Img image={image} imageWidth={800} loading={image?.loading} />
			</figure>

			<div className="richtext">
				<PortableText value={content} />
				<CTAList ctas={ctas} />
			</div>
		</section>
	)
}
