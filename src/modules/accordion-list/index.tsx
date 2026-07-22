import { PortableText, stegaClean } from 'next-sanity'
import { VscChevronDown } from 'react-icons/vsc'
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
	layout: l,
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
			{...(enableSchema && {
				itemScope: true,
				itemType: 'https://schema.org/FAQPage',
			})}
			{...props}
		>
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
					<CTAList ctas={ctas} className="max-sm:*:w-full" />
				</header>
			)}

			<div className="mx-auto w-full max-w-3xl">
				{accordions?.map((accordion, i) => (
					<details
						key={`${accordion._key}-${i}`}
						className="accordion border-stroke not-last:border-b"
						name={exclusive ? _module_key : undefined}
						open={accordion.open}
						{...(enableSchema && {
							itemScope: true,
							itemProp: 'mainEntity',
							itemType: 'https://schema.org/Question',
						})}
					>
						<summary
							className="py-[.5lh] font-bold"
							{...(enableSchema && { itemProp: 'name' })}
						>
							{accordion.summary || 'Details'}
							<VscChevronDown />
						</summary>

						<div
							className="not-supports-[interpolate-size:allow-keywords]:anim-fade-to-b pb-lh"
							{...(enableSchema && {
								itemScope: true,
								itemProp: 'acceptedAnswer',
								itemType: 'https://schema.org/Answer',
							})}
						>
							<div
								className="prose"
								{...(enableSchema && { itemProp: 'text' })}
							>
								<PortableText value={accordion.content ?? []} />
							</div>
						</div>
					</details>
				))}
			</div>
		</Module>
	)
}
