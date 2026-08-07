import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import { Module } from '@/modules'
import type { ImageGallery } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import Track from './track'

export default function ({
	eyebrow,
	intro,
	rows,
	autoScroll,
	duration = 20,
	alternateScrollDirection,
	...props
}: ImageGallery) {
	return (
		<Module className="section space-y-8" {...props}>
			{(eyebrow || intro) && (
				<header className="prose mx-auto max-w-3xl text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro ?? []} />
				</header>
			)}

			<div className="space-y-px">
				{rows?.map((row, rowIndex) => {
					const images = row.images?.filter((image) => image?.asset) ?? []
					if (!images.length) return null

					const reverse =
						!!autoScroll && !!alternateScrollDirection && rowIndex % 2 === 1

					const copies = autoScroll ? 2 : 1

					const imageSet = Array.from({ length: copies }, (_, copy) =>
						images.map((image) => (
							<figure
								className={cn(
									'relative shrink-0',
									!autoScroll && 'snap-center',
								)}
								aria-hidden={copy > 0 || undefined}
								key={`${image._key}-${copy}`}
							>
								<Img
									className="h-75 w-auto max-w-none object-cover"
									image={image}
									height={300}
									sizes="(max-width: 640px) 70vw, 400px"
									decoding={copy > 0 ? 'async' : undefined}
									alt={image.alt ?? ''}
								/>
								{image.caption && (
									<figcaption className="text-background bg-foreground/60 m-ch absolute bottom-0 left-0 p-[.25em_.5em] text-xs backdrop-blur">
										{image.caption}
									</figcaption>
								)}
							</figure>
						)),
					)

					return (
						<div
							className={cn(
								'max-md:full-bleed mx-auto items-end gap-px',
								autoScroll
									? 'overflow-hidden'
									: 'no-scrollbar flex snap-x snap-mandatory overflow-x-auto before:m-auto after:m-auto max-md:px-px',
							)}
							key={row._key}
						>
							{autoScroll ? (
								<Track
									reverse={reverse}
									duration={duration}
									className="items-end gap-px"
								>
									{imageSet}
								</Track>
							) : (
								imageSet
							)}
						</div>
					)
				})}
			</div>
		</Module>
	)
}
