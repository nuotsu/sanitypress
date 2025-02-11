import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Code from './RichtextModule/Code'
import Reputation from '@/ui/Reputation'

export default function Callout({
	content,
	ctas,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
}>) {
	return (
		<section className="section text-center">
			<div className="section bg-accent/3 max-w-screen-lg rounded">
				<div className="richtext mx-auto max-w-screen-sm text-balance">
					<PortableText
						value={content}
						components={{
							types: {
								code: ({ value }) => (
									<Code
										value={value}
										className="mx-auto max-w-max"
										theme="snazzy-light"
									/>
								),
								'reputation-block': ({ value }) => (
									<Reputation
										className="!mt-4 justify-center"
										reputation={value.reputation}
									/>
								),
							},
						}}
					/>
					<CTAList className="!mt-8 justify-center" ctas={ctas} />
				</div>
			</div>
		</section>
	)
}
