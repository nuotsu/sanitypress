import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import { Module } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { HeroCover } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img, { Source } from '@/ui/img'

export default function ({
	eyebrow,
	content = [],
	ctas,
	image,
	textAlign: ta = 'center',
	verticalAlign: va = 'center',
	...props
}: HeroCover) {
	const textAlign = stegaClean(ta)
	const verticalAlign = stegaClean(va)
	const opacity = Number(stegaClean(image?.opacity)) ?? 1

	return (
		<Module
			className={cn(
				'relative grid min-h-[60svh]',
				{
					'items-start': verticalAlign === 'top',
					'items-center': verticalAlign === 'center',
					'items-end': verticalAlign === 'bottom',
				},
				{
					'justify-start text-left': textAlign === 'left',
					'justify-center text-center': textAlign === 'center',
					'justify-end text-right': textAlign === 'right',
				},
			)}
			{...props}
		>
			{image?.asset && (
				<picture className="contents">
					<Source image={image.mobile} width={1000} />
					<Img
						image={image}
						width={1920}
						className="pointer-events-none absolute inset-0 size-full object-cover"
						style={{ opacity }}
						alt={image?.alt ?? ''}
						draggable={false}
					/>
				</picture>
			)}

			<div
				className={cn(
					'section relative',
					image?.asset && opacity > 0.5 && 'text-background',
				)}
			>
				<header className="prose max-w-xl">
					<Eyebrow value={eyebrow} />
					<PortableText
						value={content}
						components={{
							types: {
								image: ({ value }) => (
									<figure>
										<Img
											className={cn('w-full', {
												'mr-auto': textAlign === 'left',
												'mx-auto': textAlign === 'center',
												'ml-auto': textAlign === 'right',
											})}
											image={value}
											width={1000}
											alt={value.alt ?? ''}
										/>
									</figure>
								),
								'custom-html': ({ value }) => <CustomHTML {...value} />,
							},
						}}
					/>
					<CTAList
						ctas={ctas}
						className={cn('max-sm:*:w-full', {
							'justify-start': textAlign === 'left',
							'justify-center': textAlign === 'center',
							'justify-end': textAlign === 'right',
						})}
					/>
				</header>
			</div>
		</Module>
	)
}
