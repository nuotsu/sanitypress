import { PortableText, stegaClean } from 'next-sanity'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'
import Pretitle from '../Pretitle'

export default function FlagList({
	pretitle,
	intro,
	items,
	iconSize = 40,
	iconPosition,
}: Partial<{
	pretitle: string
	intro: any
	items: {
		icon: Sanity.Image
		content: any
	}[]
	iconSize: number
	iconPosition: 'top' | 'left'
}>) {
	return (
		<section className="section space-y-8">
			{intro && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div className="grid items-start gap-x-8 gap-y-6 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
				{items?.map((item, key) => (
					<article
						className={cn(
							'grid gap-4',
							stegaClean(iconPosition) === 'left' && 'grid-cols-[auto,1fr]',
						)}
						key={key}
					>
						<figure>
							<Img
								image={item.icon}
								imageWidth={iconSize}
								style={{ maxHeight: iconSize }}
							/>
						</figure>

						<div className="richtext">
							<PortableText value={item.content} />
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
