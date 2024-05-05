import { PortableText } from 'next-sanity'
import Img from '../Img'
import { cn } from '@/lib/utils'

export default function TestimonialList({
	content,
	testimonials,
}: Partial<{
	content: any
	testimonials: Sanity.Testimonial[]
}>) {
	return (
		<section className="section space-y-8 text-center">
			{content && (
				<header className="richtext">
					<PortableText value={content} />
				</header>
			)}

			<div className="carousel full-bleed items-center gap-4 before:m-auto after:m-auto sm:[--size:65vw]">
				{testimonials?.map(({ author, ...testimonial }, key) => (
					<article key={key}>
						<blockquote className="space-y-6">
							<div className="richtext">
								<PortableText value={testimonial.content} />
							</div>

							{author && (
								<footer>
									<cite>
										<div className="inline-flex items-center gap-2">
											<Img
												className="size-[40px] rounded-full object-cover"
												image={author?.image}
												imageWidth={80}
											/>
											<div className={cn(author?.image && 'text-left')}>
												<div>{author?.name}</div>
												{author?.title && (
													<div className="text-sm">{author?.title}</div>
												)}
											</div>
										</div>
									</cite>
								</footer>
							)}
						</blockquote>
					</article>
				))}
			</div>
		</section>
	)
}
