import { PortableText } from 'next-sanity'
import { portableTextToSchemaHtml } from '@/lib/portable-text-to-schema-html'
import { getBlockText } from '@/lib/utils'
import { Module } from '@/modules'
import type { StepList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'

export default function ({
	eyebrow,
	intro = [],
	ctas,
	steps,
	enableSchema = true,
	...props
}: StepList) {
	return (
		<Module
			className="section grid items-start gap-8 md:grid-cols-2"
			{...props}
		>
			{enableSchema && steps?.length && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'HowTo',
							...(!!intro.length && { name: getBlockText(intro, ' ') }),
							step: steps.map((step, index) => ({
								'@type': 'HowToStep',
								position: index + 1,
								text: portableTextToSchemaHtml(step.content) || '',
							})),
						}),
					}}
				/>
			)}

			<header className="prose md:sticky-below-header [--offset:1rem]">
				<Eyebrow value={eyebrow} />
				<PortableText value={intro} />
				<CTAList ctas={ctas} className="max-sm:*:w-full" />
			</header>

			<ol className="grid gap-8">
				{steps?.map((step, index) => (
					<li
						key={`${step._key}-${index}`}
						className="gap-ch flex items-start [counter-increment:step]"
					>
						<span className="h3 bg-foreground text-background size-lh grid shrink-0 place-content-center text-center before:content-[counter(step)]" />

						<div className="prose">
							<PortableText value={step.content ?? []} />
							<CTAList ctas={step.ctas} className="max-sm:*:w-full" />
						</div>
					</li>
				))}
			</ol>
		</Module>
	)
}
