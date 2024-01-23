import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { twMerge } from 'tailwind-merge'

export default function HeroPostcard({ content, ctas, image }: Props) {
	return (
		<section className="section grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
			<figure className={twMerge(image?.onRight && 'md:order-1')}>
				<Img image={image} />
			</figure>

			<div className="richtext [&_a:not(.action)]:link">
				<PortableText value={content} />
				<CTAList ctas={ctas} />
			</div>
		</section>
	)
}

type Props = Partial<{
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & {
		onRight: boolean
	}
}>
