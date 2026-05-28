import { PortableText } from 'next-sanity'
import type { Quote, QuoteList } from '@/sanity/types'
import Img from '@/ui/img'
import Eyebrow from '@/ui/eyebrow'
import { moduleAttributes } from '.'

export default function ({
	eyebrow,
	intro = [],
	testimonials,
	_key,
	...props
}: QuoteList & { _key: string }) {
	return (
		<section className="section space-y-8" {...moduleAttributes(props)}>
			{(eyebrow || intro) && (
				<header className="prose text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<div
				className="carousel carousel-scroll-buttons carousel-scroll-marker max-md:full-bleed items-stretch gap-8 pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4"
				data-anchor-name={`--quote-list-${_key}`}
			>
				{(testimonials as unknown as Quote[])?.map((testimonial) => (
					<article
						className="flex flex-col gap-4 md:snap-start"
						key={testimonial._id}
					>
						<blockquote className="prose grow">
							<PortableText value={testimonial.quote} />
						</blockquote>

						{testimonial.author?.name && (
							<cite className="flex items-center gap-2">
								<Img
									className="aspect-square size-[2lh] shrink-0 rounded-full object-cover"
									image={testimonial.author?.image}
									width={48}
									alt={testimonial.author?.name}
								/>

								<dl className="">
									<dt>{testimonial.author.name}</dt>
									{testimonial.author?.title && (
										<dd className="text-sm">{testimonial.author?.title}</dd>
									)}
								</dl>
							</cite>
						)}
					</article>
				))}
			</div>
		</section>
	)
}
