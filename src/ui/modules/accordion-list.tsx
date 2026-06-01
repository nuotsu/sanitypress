import { PortableText, stegaClean } from 'next-sanity'
import { VscChevronDown } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import type { AccordionList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import { Module } from '.'

export default function ({
	_key: _module_key,
	intro,
	ctas,
	accordions,
	exclusive,
	enableSchema = true,
	layout: l,
	...props
}: AccordionList & { _key: string }) {
	const layout = stegaClean(l)

	return (
		<Module
			_key={_module_key}
			className={cn(
				'section grid gap-8',
				layout === 'horizontal' && 'items-start md:grid-cols-2',
			)}
			{...(enableSchema && {
				itemScope: true,
				itemType: 'https://schema.org/FAQPage',
			})}
			{...props}
		>
			{intro && (
				<header
					className={cn(
						'prose',
						layout === 'horizontal'
							? 'md:sticky-below-header [--offset:1rem]'
							: 'text-center',
					)}
				>
					<PortableText value={intro} />
					<CTAList ctas={ctas} className="max-sm:*:w-full" />
				</header>
			)}

			<div className="mx-auto w-full max-w-3xl">
				{accordions?.map(({ _key, summary, content, open }) => (
					<details
						className="accordion border-stroke not-last:border-b"
						name={exclusive ? _module_key : undefined}
						open={open}
						{...(enableSchema && {
							itemScope: true,
							itemProp: 'mainEntity',
							itemType: 'https://schema.org/Question',
						})}
						key={_key}
					>
						<summary
							className="py-[.5lh] font-bold"
							{...(enableSchema && { itemProp: 'name' })}
						>
							{summary}
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
								<PortableText value={content ?? []} />
							</div>
						</div>
					</details>
				))}
			</div>
		</Module>
	)
}
