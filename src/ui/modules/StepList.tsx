import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'

export default function StepList({
	pretitle,
	intro,
	steps,
}: Partial<{
	pretitle: string
	intro: any
	steps: {
		content: any
	}[]
}>) {
	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext mx-auto max-w-xl text-center text-balance">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<ol className="grid gap-8 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
				{steps?.map((step, index) => (
					<li className="grid grid-cols-[auto_1fr] gap-2" key={index}>
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
