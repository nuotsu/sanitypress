import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { HeroCover } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img, { Source } from '@/ui/img'
import { Module } from '.'
import CustomHTML from './custom-html'

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
				'relative flex min-h-[60svh] flex-col',
				{
					'justify-start': verticalAlign === 'top',
					'justify-center': verticalAlign === 'center',
					'justify-end': verticalAlign === 'bottom',
				},
				{
					'items-start text-left': textAlign === 'left',
					'items-center text-center': textAlign === 'center',
					'items-end text-right': textAlign === 'right',
				},
			)}
			{...props}
		>
			{image && (
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
				className={cn('section relative', opacity > 0.5 && 'text-background')}
			>
				<header className="prose max-w-xl">
					<Eyebrow value={eyebrow} />
					<PortableText
						value={content}
						components={{
							types: {
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
