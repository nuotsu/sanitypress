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
				{testimonials?.map(({ author, ...testimonial }, key) => (
					<article className="!basis-[min(450px,70vw)]" key={key}>
						<blockquote className="space-y-6">
							<div className="richtext text-balance">
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
