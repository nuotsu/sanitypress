import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function Hero({
	pretitle,
	content,
	ctas,
	assets,
	textAlign: ta = 'center',
	alignItems: ai,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Sanity.Img[]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}> &
	Sanity.Module) {
	const hasImage = !!assets?.[0]
	const asset = assets?.[0]

	const textAlign = stegaClean(ta)
	const alignItems = stegaClean(ai)

	return (
		<section
			className={cn(
				hasImage &&
					'bg-ink text-canvas grid overflow-hidden *:col-span-full *:row-span-full',
			)}
			{...moduleProps(props)}
		>
			{hasImage && (
				<ResponsiveImg
					img={asset}
					className="max-h-fold size-full object-cover"
					width={2400}
					draggable={false}
				/>
			)}

			{content && (
				<div className="section flex w-full flex-col text-balance">
					<div
						className={cn(
							'richtext headings:text-balance relative isolate max-w-xl',
							hasImage && 'text-shadow',
							{
								'mb-8': alignItems === 'start',
								'my-auto': alignItems === 'center',
								'mt-auto': alignItems === 'end',
								'me-auto': ['left', 'start'].includes(textAlign),
								'mx-auto': textAlign === 'center',
								'ms-auto': ['right', 'end'].includes(textAlign),
							},
						)}
						style={{ textAlign }}
					>
						<Pretitle className={cn(hasImage && 'text-canvas/70')}>
							{pretitle}
						</Pretitle>

						<PortableText
							value={content}
							components={{
								types: {
									'custom-html': ({ value }) => <CustomHTML {...value} />,
									'reputation-block': ({ value }) => (
										<Reputation
											className={cn(
												'!mt-4',
												hasImage && '[&_strong]:text-amber-400',
												{
													'justify-start': ['left', 'start'].includes(
														textAlign,
													),
													'justify-center': textAlign === 'center',
													'justify-end': ['right', 'end'].includes(textAlign),
												},
											)}
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>

						<CTAList
							ctas={ctas}
							className={cn('!mt-4', {
								'justify-start': textAlign === 'left',
								'justify-center': textAlign === 'center',
								'justify-end': textAlign === 'right',
							})}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
