import Img, { Source } from '@/ui/Img'
import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import css from './Hero.module.css'

export default function Hero({
	pretitle,
	content,
	ctas,
	reputation,
	bgImage,
	bgImageMobile,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	reputation: Sanity.Reputation
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const hasImage = !!bgImage?.asset

	return (
		<section
			className={cn(
				hasImage &&
					'grid overflow-hidden bg-ink text-canvas *:col-span-full *:row-span-full',
			)}
		>
			{hasImage && (
				<picture>
					<Source image={bgImageMobile} imageWidth={1200} />
					<Img
						className="size-full max-h-fold object-cover"
						image={bgImage}
						imageWidth={1800}
						draggable={false}
					/>
				</picture>
			)}

			{content && (
				<div className="section flex w-full flex-col">
					<div
						className={cn(
							'richtext relative isolate max-w-xl [&_:is(h1,h2)]:text-balance',
							hasImage && 'text-shadow',
							hasImage && css.txt,
							{
								'mb-8': stegaClean(alignItems) === 'start',
								'my-auto': stegaClean(alignItems) === 'center',
								'mt-auto': stegaClean(alignItems) === 'end',
							},
							{
								'mr-auto': stegaClean(textAlign) === 'left',
								'mx-auto': stegaClean(textAlign) === 'center',
								'ml-auto': stegaClean(textAlign) === 'right',
							},
						)}
						style={{ textAlign: stegaClean(textAlign) }}
					>
						<Pretitle className={cn(hasImage && 'text-canvas/70')}>
							{pretitle}
						</Pretitle>

						<PortableText value={content} />

						<Reputation
							className={cn('!mt-4', hasImage && '[&_strong]:text-amber-400', {
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							})}
							reputation={reputation}
						/>

						<CTAList
							ctas={ctas}
							className={cn('!mt-4', {
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							})}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
