import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import Icon, { getPixels } from '@/ui/Icon'
import { cn } from '@/lib/utils'

export default function FlagList({
	pretitle,
	intro,
	items,
	iconPosition,
}: Partial<{
	pretitle: string
	intro: any
	items: {
		icon: Sanity.Icon
		content: any
	}[]
	iconPosition: 'top' | 'left'
}>) {
	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext mx-auto max-w-xl text-center text-balance">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div className="grid items-start gap-x-8 gap-y-6 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
				{items?.map(({ icon, content }, key) => (
					<article
						className={cn(
							'grid gap-4',
							stegaClean(iconPosition) === 'left' &&
								icon &&
								'grid-cols-[var(--size)_1fr]',
						)}
						style={
							{
								'--size': icon?.size ?? '40px',
							} as React.CSSProperties
						}
						key={key}
					>
						{icon && (
							<figure style={{ height: getPixels(icon?.size) }}>
								<Icon icon={icon} />
							</figure>
						)}

						<div className="richtext">
							<PortableText value={content} />
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
