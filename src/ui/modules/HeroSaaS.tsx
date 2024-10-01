import moduleProps from '@/lib/moduleProps'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroSaaS({
	pretitle,
	content,
	ctas,
	reputation,
	image,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	reputation: Sanity.Reputation
	image: Sanity.Image & {
		faded?: boolean
	}
}> &
	Sanity.Module) {
	return (
		<section className="section space-y-8 text-center" {...moduleProps(props)}>
			<div className="richtext mx-auto max-w-2xl text-balance">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText value={content} />
				<Reputation className="!mt-4 justify-center" reputation={reputation} />
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
