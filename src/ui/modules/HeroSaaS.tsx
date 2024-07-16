import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroSaaS({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & {
		faded?: boolean
	}
}>) {
	return (
		<section className="section space-y-8 text-center">
			<div className="richtext mx-auto max-w-2xl text-balance">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText value={content} />
				<CTAList ctas={ctas} className="!mt-8 justify-center" />
			</div>

			<Img
				image={image}
				className={cn(
					'anim-fade-to-t [animation-duration:1s]',
					image?.faded &&
						'[mask-image:linear-gradient(to_bottom,#000_50%,transparent)]',
				)}
				draggable={false}
			/>
		</section>
	)
}
