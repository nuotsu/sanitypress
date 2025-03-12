import { Img } from '@/ui/Img'
import { stegaClean } from 'next-sanity'

export default function Image({
	value,
}: {
	value: Sanity.Image &
		Partial<{
			caption: string
			source: string
			float: 'left' | 'right'
		}>
}) {
	return (
		<figure
			className="max-lg:full-bleed space-y-2 text-center md:[grid-column:bleed]!"
			style={{ float: stegaClean(value.float) }}
		>
			<Img
				className="bg-accent/3 mx-auto max-h-svh w-auto text-[0px]"
				image={value}
				width={1500}
			/>

			{value.caption && (
				<figcaption className="text-ink/50 px-4 text-sm text-balance italic">
					{value.caption}

					{value.source && (
						<>
							{' ('}
							<a href={value.source} className="image-source link">
								Source
							</a>
							{')'}
						</>
					)}
				</figcaption>
			)}
		</figure>
	)
}
