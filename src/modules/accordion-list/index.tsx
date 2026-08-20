import { PortableText, stegaClean } from 'next-sanity'
import { VscChevronDown } from 'react-icons/vsc'
import { portableTextToSchemaHtml } from '@/lib/portable-text-to-schema-html'
import { cn } from '@/lib/utils'
import { Module } from '@/modules'
import type { AccordionList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'

export default function ({
	_key: _module_key,
	eyebrow,
	intro,
	ctas,
	accordions,
	exclusive,
	enableSchema = true,
	layout: l = 'vertical',
	...props
}: AccordionList & { _key: string } & React.ComponentProps<'section'>) {
	const layout = stegaClean(l)

	return (
		<Module
			_key={_module_key}
			className={cn(
				'section grid gap-8',
				layout === 'horizontal' && 'items-start md:grid-cols-2',
				props.className,
			)}
			{...props}
		>
			{enableSchema && accordions?.length && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: accordions.map((accordion) => ({
								'@type': 'Question',
								name: accordion.summary || 'Details',
								acceptedAnswer: {
									'@type': 'Answer',
									text: portableTextToSchemaHtml(accordion.content) || '',
								},
							})),
						}),
					}}
				/>
			)}

			{(eyebrow || intro || ctas) && (
				<header
					className={cn(
						'prose',
						layout === 'horizontal'
							? 'md:sticky-below-header [--offset:1rem]'
							: 'mx-auto max-w-3xl text-center',
					)}
				>
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
					<CTAList
						ctas={ctas}
						className={cn(
							'max-sm:*:w-full',
							layout === 'vertical' && 'justify-center',
						)}
					/>
				</header>
			)}

			<div className="mx-auto w-full max-w-3xl">
				{accordions?.map((accordion, i) => (
					<details
						key={`${accordion._key}-${i}`}
						className="accordion border-stroke not-last:border-b"
						name={exclusive ? _module_key : undefined}
						open={accordion.open}
					>
						<summary className="py-[.5lh] font-bold">
							{accordion.summary || 'Details'}
							<VscChevronDown />
						</summary>

						<div className="anim-toggle pb-lh">
							<div className="prose">
								<PortableText value={accordion.content ?? []} />
							</div>
						</div>
					</details>
				))}
			</div>
		</Module>
	)
}
