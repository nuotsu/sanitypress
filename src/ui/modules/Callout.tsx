import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'

export default function Callout({
	content,
	ctas,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
}>) {
	return (
		<section className="section text-center">
			<div className="section max-w-screen-lg rounded bg-accent/5">
				<div className="richtext mx-auto max-w-screen-sm text-balance">
					<PortableText value={content} />
					<CTAList className="!mt-8 justify-center" ctas={ctas} />
				</div>
			</div>
		</section>
	)
}
