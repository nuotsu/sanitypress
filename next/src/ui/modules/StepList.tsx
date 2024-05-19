import { PortableText } from 'next-sanity'

export default function StepList({
	content,
	steps,
}: Partial<{
	content: any
	steps: {
		content: any
	}[]
}>) {
	return (
		<section className="section space-y-8">
			<header className="richtext text-center">
				<PortableText value={content} />
			</header>

			<ol className="grid gap-8 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
				{steps?.map((step, index) => (
					<li className="grid grid-cols-[auto,1fr] gap-2" key={index}>
						<b className="text-gradient aspect-square h-[1em] -translate-y-4 text-center text-6xl tabular-nums">
							{index + 1}
						</b>

						<div className="richtext">
							<PortableText value={step.content} />
						</div>
					</li>
				))}
			</ol>
		</section>
	)
}
