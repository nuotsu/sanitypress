import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function CardList({
	pretitle,
	intro,
	cards,
	ctas,
	layout,
	columns = 3,
	visualSeparation,
	...props
}: Partial<{
	pretitle: string
	intro: any
	ctas: Sanity.CTA[]
	cards: Partial<{
		image: Sanity.Image
		content: any
		ctas: Sanity.CTA[]
	}>[]
	layout: 'grid' | 'carousel'
	columns: number
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
					<CTAList className="justify-center" ctas={ctas} />
				</header>
			)}

			<div
				className={cn(
					'items-stretch gap-8',
					isCarousel
						? 'carousel max-md:full-bleed md:overflow-fade-r pb-4 max-md:px-4'
						: [
								'grid *:h-full max-md:pb-4',
								columns
									? 'md:grid-cols-[repeat(var(--col,3),minmax(0,1fr))]'
									: 'sm:grid-cols-[repeat(auto-fill,minmax(var(--size,300px),1fr))]',
							],
				)}
				style={
					columns
						? ({
								'--col': columns,
							} as React.CSSProperties)
						: undefined
				}
			>
				{cards?.map((card, key) => (
					<article
						className={cn(
							'flex flex-col gap-2',
							visualSeparation && 'border-ink/10 border p-4',
						)}
						key={key}
					>
						{card.image && (
							<figure>
								<Img
									className="aspect-video w-full object-cover"
									image={card.image}
									width={600}
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
