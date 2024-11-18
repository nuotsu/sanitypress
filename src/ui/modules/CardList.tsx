import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import Img from '@/ui/Img'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'

export default function CardList({
	pretitle,
	intro,
	cards,
	layout,
	visualSeparation,
	...props
}: Partial<{
	pretitle: string
	intro: any
	cards: Partial<{
		image: any
		content: any
		ctas: Sanity.CTA[]
	}>[]
	layout: 'grid' | 'carousel'
	visualSeparation: boolean
}> &
	Sanity.Module) {
	const isCarousel = stegaClean(layout) === 'carousel'

	return (
		<section className="section space-y-12" {...moduleProps(props)}>
			{(pretitle || intro) && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div
				className={cn(
					'items-stretch gap-4',
					isCarousel
						? 'carousel max-xl:full-bleed md:overflow-fade pb-4 max-md:px-4 md:gap-8 md:before:m-auto md:after:m-auto'
						: 'grid *:h-full max-md:pb-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
				)}
			>
				{cards?.map((card, key) => (
					<article
						className={cn(
							'flex flex-col gap-2',
							visualSeparation && 'border p-4',
						)}
						key={key}
					>
						{card.image && (
							<figure>
								<Img
									className="aspect-video w-full object-cover"
									image={card.image}
									imageWidth={600}
								/>
							</figure>
						)}

						<div className="richtext grow">
							<PortableText value={card.content} />
						</div>
						<CTAList className="mt-auto" ctas={card.ctas} />
					</article>
				))}
			</div>
		</section>
	)
}
