import Img from '@/ui/Img'

export default function Image({
	value,
}: {
	value: Sanity.Image & {
		caption?: string
		source?: string
	}
}) {
	return (
		<figure className="max-lg:full-bleed !mb-4 !mt-8 space-y-2 text-center md:![grid-column:bleed]">
			<Img
				className="mx-auto max-h-svh w-auto bg-neutral-50"
				image={value}
				imageWidth={1500}
			/>

			{value.caption && (
				<figcaption className="text-balance px-4 text-sm italic text-neutral-500">
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
