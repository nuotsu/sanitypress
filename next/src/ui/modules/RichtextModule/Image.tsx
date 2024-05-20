import Img from '@/ui/Img'

export default function Image({
	value,
}: {
	value: Sanity.Image & {
		caption?: string
	}
}) {
	return (
		<figure className="max-lg:full-bleed !my-8 space-y-2 text-center md:![grid-column:bleed]">
			<Img className="mx-auto" image={value} imageWidth={1200} />

			{value.caption && (
				<figcaption className="text-balance text-sm italic text-neutral-500">
					{value.caption}
				</figcaption>
			)}
		</figure>
	)
}
