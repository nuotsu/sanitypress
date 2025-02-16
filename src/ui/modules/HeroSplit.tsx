import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import { ResponsiveImg } from '@/ui/Img'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	assets,
	assetOnRight,
	assetBelowContent,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>
	assetOnRight: boolean
	assetBelowContent: boolean
}>) {
	const asset = assets?.[0]

	return (
		<section className="section grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
			<figure
				className={cn(
					asset?._type === 'img' && 'max-md:full-bleed',
					assetOnRight && 'md:order-1',
					assetBelowContent && 'max-md:order-last',
				)}
			>
				{(() => {
					switch (asset?._type) {
						case 'img':
							return (
								<ResponsiveImg img={asset} imgClassName="w-full" width={1200} />
							)

						case 'code':
							return (
								<Code
									className="richtext [&_.inner]:max-h-[20lh] [&_.inner]:overflow-auto"
									value={asset}
								/>
							)

						case 'custom-html':
							return <CustomHTML {...asset} />

						default:
							return null
					}
				})()}
			</figure>

			<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText
					value={content}
					components={{
						types: {
							'custom-html': ({ value }) => <CustomHTML {...value} />,
							'reputation-block': ({ value }) => (
								<Reputation className="!mt-4" reputation={value.reputation} />
							),
						},
					}}
				/>
				<CTAList ctas={ctas} className="!mt-6" />
			</div>
		</section>
	)
}
