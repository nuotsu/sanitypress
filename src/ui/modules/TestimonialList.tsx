import { PortableText, stegaClean } from 'next-sanity'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function TestimonialList({
	intro,
	testimonials,
	layout,
}: Partial<{
	intro: any
	testimonials: Sanity.Testimonial[]
	layout: 'grid' | 'carousel'
}>) {
	const isCarousel = stegaClean(layout) === 'carousel'

	return (
		<section className="section space-y-8 text-center">
			{intro && (
				<header className="richtext">
					<PortableText value={intro} />
				</header>
			)}

			<div
				className={cn(
					'gap-4 max-md:px-4',
					isCarousel
						? 'carousel max-xl:full-bleed md:overflow-fade pb-4 md:gap-8 md:before:m-auto md:after:m-auto'
						: 'max-md:carousel max-md:full-bleed grid max-md:pb-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
				)}
			>
				{testimonials?.map(({ author, ...testimonial }, key) => (
					<article
						className="grid !basis-[min(450px,70vw)] place-content-center rounded border p-4"
						key={key}
					>
						<blockquote className="flex flex-col items-center gap-4">
							<div className="richtext text-balance">
								<PortableText value={testimonial.content} />
							</div>

							{author && (
								<div className="inline-flex max-w-[25ch] items-center gap-2">
									<Img
										className="size-[40px] shrink-0 rounded-full object-cover"
										image={author?.image}
										imageWidth={80}
										alt={
											[author?.name, author?.title]
												.filter(Boolean)
												.join(', ') || 'Author'
										}
									/>

									<dl className="text-left">
										<dt>{author?.name}</dt>

										{author?.title && (
											<dd className="text-balance text-sm">{author?.title}</dd>
										)}
									</dl>
								</div>
							)}
						</blockquote>
					</article>
				))}
			</div>
		</section>
	)
}
