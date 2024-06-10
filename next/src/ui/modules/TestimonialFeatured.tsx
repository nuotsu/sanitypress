import { PortableText } from 'next-sanity'
import { ImQuotesLeft } from 'react-icons/im'
import Img from '../Img'

export default function TestimonialFeatured({
	testimonial,
}: Partial<{
	testimonial: Sanity.Testimonial
}>) {
	if (!testimonial) return null

	return (
		<section className="section">
			<div className="section flex max-w-screen-md items-center gap-x-12 gap-y-6 rounded bg-neutral-100 max-md:flex-col">
				<div className="space-y-2">
					<ImQuotesLeft className="inline-block shrink-0 text-4xl" />

					<div className="self-center text-balance text-xl">
						<PortableText value={testimonial.content} />
					</div>

					<dl className="text-left">
						<dt>{testimonial.author?.name}</dt>
						{testimonial.author?.title && (
							<dd className="text-sm">{testimonial.author?.title}</dd>
						)}
					</dl>
				</div>

				<Img
					className="shrink-0 rounded md:max-w-[200px]"
					image={testimonial.author?.image}
					imageWidth={500}
				/>
			</div>
		</section>
	)
}
