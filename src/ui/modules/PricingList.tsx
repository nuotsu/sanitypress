import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn, formatCurrency } from '@/lib/utils'

export default function PricingList({
	pretitle,
	intro,
	tiers,
	...props
}: Partial<{ pretitle: string; intro: any; tiers: Sanity.Pricing[] }> &
	Sanity.Module) {
	const count = tiers?.length ?? 0

	return (
		<section className="section space-y-8" {...moduleProps(props)}>
			{(pretitle || intro) && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div
				className={cn(
					'carousel max-lg:full-bleed items-stretch gap-6 max-lg:px-4',
					count <= 3
						? 'md:grid-cols-[repeat(var(--col,1),1fr)]'
						: 'md:overflow-fade-r',
				)}
				style={{ '--col': count } as React.CSSProperties}
			>
				{tiers?.map(
					(tier) =>
						!!tier && (
							<article
								className="border-ink/10 richtext space-y-4 rounded border p-4"
								key={tier._id}
							>
								<div className="h3 flex flex-wrap items-center gap-x-4">
									{tier.title}

									<Pretitle className="ms-auto text-xs">
										{tier.highlight}
									</Pretitle>
								</div>

								{tier.price?.base !== undefined && (
									<div className="flex flex-wrap items-end gap-x-1">
										{tier.price.base !== undefined &&
											!isNaN(tier.price.base) && (
												<b className="h1">{formatPrice(tier.price.base)}</b>
											)}
										{tier.price.suffix && (
											<span className={cn(isNaN(tier.price.base) && 'h1')}>
												{tier.price.suffix}
											</span>
										)}
										{tier.price.strikethrough && (
											<s className="font-bold decoration-red-500">
												{formatPrice(tier.price?.strikethrough)}
											</s>
										)}
									</div>
								)}

								<CTAList className="grid" ctas={tier.ctas} />
								<div className="richtext">
									<PortableText value={tier.content} />
								</div>
							</article>
						),
				)}
			</div>
		</section>
	)
}

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return formatCurrency(value).replace(/\.00$/, '')
}
