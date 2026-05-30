import { PortableText } from 'next-sanity'
import type { StepList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import { Module } from '.'

export default function ({
	intro = [],
	ctas,
	steps,
	enableSchema = true,
	...props
}: StepList) {
	return (
		<Module
			className="section grid items-start gap-8 md:grid-cols-2"
			{...(enableSchema && {
				itemScope: true,
				itemType: 'https://schema.org/HowTo',
			})}
			{...props}
		>
			<header
				className="prose md:sticky-below-header [--offset:1rem]"
				{...(enableSchema && intro && { itemProp: 'name' })}
			>
				<PortableText value={intro} />
				<CTAList ctas={ctas} className="max-sm:*:w-full" />
			</header>

			<ol className="grid gap-8">
				{steps?.map((step, index) => (
					<li
						className="gap-ch flex items-start [counter-increment:step]"
						{...(enableSchema && {
							itemScope: true,
							itemProp: 'step',
							itemType: 'https://schema.org/HowToStep',
						})}
						key={step._key}
					>
						<span className="h3 bg-foreground text-background size-lh grid shrink-0 place-content-center text-center before:content-[counter(step)]" />

						<div className="prose" {...(enableSchema && { itemProp: 'text' })}>
							<PortableText value={step.content ?? []} />
						</div>

						{enableSchema && (
							<meta itemProp="position" content={String(index + 1)} />
						)}
					</li>
				))}
			</ol>
		</Module>
	)
}
