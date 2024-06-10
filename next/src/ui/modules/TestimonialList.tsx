import { PortableText } from '@portabletext/react'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function TestimonialList({
	intro,
	testimonials,
}: Partial<{
	intro: any
	testimonials: Sanity.Testimonial[]
}>) {
	return (
		<section className="section space-y-8 text-center">
			{intro && (
				<header className="richtext">
					<PortableText value={intro} />
				</header>
			)}

			<div className="carousel max-xl:full-bleed overflow-fade items-center gap-x-8 pb-4 before:m-auto after:m-auto">
				{testimonials?.map((testimonial, key) => (
					<article className="!basis-[min(450px,70vw)]" key={key}>
						<blockquote className="space-y-6">
							<div className="richtext text-balance">
								<PortableText value={testimonial.content} />
							</div>

							{testimonial.author && (
								<div className="inline-flex items-center gap-2">
									<Img
										className="size-[40px] rounded-full object-cover"
										image={testimonial.author?.image}
										imageWidth={80}
									/>

									<dl className="text-left">
										<dt>{testimonial.author?.name}</dt>

										{testimonial.author?.title && (
											<dd className="text-sm">{testimonial.author?.title}</dd>
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
