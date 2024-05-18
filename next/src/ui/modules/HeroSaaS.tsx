import { PortableText } from 'next-sanity'
import Pretitle from '../Pretitle'
import CTAList from '../CTAList'
import Img from '../Img'
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
			<div className="richtext [&_strong]:text-gradient mx-auto max-w-2xl text-balance">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText value={content} />
				<CTAList ctas={ctas} className="!mt-8 justify-center" />
			</div>

			<Img
				image={image}
				className={cn(
					image?.faded &&
						'[mask-image:linear-gradient(to_bottom,#000_50%,transparent)]',
				)}
			/>
		</section>
	)
}
