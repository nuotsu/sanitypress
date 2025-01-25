import moduleProps from '@/lib/moduleProps'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroSaaS({
	pretitle,
	content,
	ctas,
	image,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & {
		faded?: boolean
	}
}> &
	Sanity.Module) {
	return (
		<section className="section space-y-8 text-center" {...moduleProps(props)}>
			<div className="richtext mx-auto max-w-2xl text-balance">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText
					value={content}
					components={{
						types: {
							code: ({ value }) => (
								<Code
									value={value}
									className="mx-auto max-w-max"
									theme="snazzy-light"
								/>
							),
							'custom-html': ({ value }) => <CustomHTML {...value} />,
							'reputation-block': ({ value }) => (
								<Reputation
									className="!mt-4 justify-center"
									reputation={value.reputation}
								/>
							),
						},
					}}
				/>
				<CTAList ctas={ctas} className="!mt-8 justify-center" />
			</div>

			<Img
				image={image}
				width={2400}
				className={cn(
					'anim-fade-to-t w-full [animation-duration:1s]',
					image?.faded &&
						'[mask-image:linear-gradient(to_bottom,#000_50%,transparent)]',
				)}
				draggable={false}
			/>
		</section>
	)
}
