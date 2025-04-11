import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import { Img } from '@/ui/Img'
import { VscSurroundWith } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function TestimonialList({
	pretitle,
	intro,
	testimonials,
	layout: l,
	layoutMobile: lm,
}: Partial<{
	pretitle: string
	intro: any
	testimonials: Sanity.Testimonial[]
	layout: 'grid' | 'carousel'
	layoutMobile: 'grid' | 'carousel'
}>) {
	const layout = stegaClean(l)
	const layoutMobile = stegaClean(lm)

	return (
		<section className="section space-y-8 text-center">
			{(pretitle || intro) && (
				<header className="richtext">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div
				className={cn(
					'gap-8',
					layout === 'carousel'
						? 'carousel max-md:full-bleed md:overflow-fade-r pb-4 max-md:px-4'
						: 'grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
					layoutMobile === 'carousel' &&
						'max-md:carousel max-md:full-bleed max-md:px-4 max-md:pb-4',
				)}
			>
				{testimonials?.map(
					(testimonial, key) =>
						testimonial && (
							<article
								className="border-ink/10 grid basis-[min(450px,70vw)]! place-content-center rounded border p-4"
								key={key}
							>
								<blockquote className="flex flex-col items-center gap-4">
									<div className="richtext text-balance">
										<PortableText value={testimonial.content} />
									</div>

									{testimonial.author && (
										<div className="inline-flex max-w-[25ch] items-center gap-2">
											<Img
												className="size-[40px] shrink-0 rounded-full object-cover"
												image={testimonial.author.image}
												width={80}
												alt={
													[testimonial.author.name, testimonial.author.title]
														.filter(Boolean)
														.join(', ') || 'Author'
												}
											/>

											<dl className="text-start">
												<dt className="flex flex-wrap items-center gap-1">
													{testimonial.author.name}

													{testimonial.source && (
														<cite>
															<a
																className="text-ink/50"
																href={testimonial.source}
																target="_blank"
																title="Source"
															>
																<VscSurroundWith />
															</a>
														</cite>
													)}
												</dt>

												{testimonial.author.title && (
													<dd className="text-xs text-balance">
														{testimonial.author.title}
													</dd>
												)}
											</dl>
										</div>
									)}
								</blockquote>
							</article>
						),
				)}
			</div>
		</section>
	)
}
