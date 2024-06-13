import { PortableText } from 'next-sanity'
import Pretitle from '../Pretitle'
import { cn } from '@/lib/utils'
import CTAList from '../CTAList'

export default function PricingList({
	intro,
	tiers,
}: Partial<{
	intro: any
	tiers: Sanity.Pricing[]
}>) {
	return (
		<section className="section space-y-8">
			{intro && (
				<header className="richtext text-center">
					<PortableText value={intro} />
				</header>
			)}

			<dl
				className="max-md:carousel max-md:full-bleed grid grid-cols-[repeat(var(--col,1),1fr)] items-stretch gap-6 max-md:px-4"
				style={{ '--col': tiers?.length } as React.CSSProperties}
			>
				{tiers?.map((tier) => (
					<div className="space-y-6 rounded border p-4" key={tier._id}>
						<div className="space-y-3">
							<dt className="h3 flex flex-wrap items-center gap-x-4">
								{tier.title}

								<Pretitle className="ml-auto text-xs">
									{tier.highlight}
								</Pretitle>
							</dt>

							<dt className="flex flex-wrap items-end gap-x-2">
								{!isNaN(tier.price.base) && (
									<b className="h1">{formatPrice(tier.price.base)}</b>
								)}
								{tier.price.suffix && (
									<span className={cn(isNaN(tier.price.base) && 'h1')}>
										{tier.price.suffix}
									</span>
								)}
								{tier.price.strikethrough && (
									<s className="font-bold decoration-red-500">
										{formatPrice(tier.price.strikethrough)}
									</s>
								)}
							</dt>
						</div>

						<dd>
							<CTAList className="grid" ctas={tier.ctas} />
						</dd>

						<dd className="richtext">
							<PortableText value={tier.content} />
						</dd>
					</div>
				))}
			</dl>
		</section>
	)
}

const { format } = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return format(value).replace(/\.00$/, '')
}
