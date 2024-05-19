import Img from '@/ui/Img'

export default function Image({
	value,
}: {
	value: Sanity.Image & {
		caption?: string
	}
}) {
	return (
		<figure className="max-lg:full-bleed !my-4 text-center md:![grid-column:bleed]">
			<Img className="mx-auto" image={value} imageWidth={1200} />

			{value.caption && (
				<figcaption className="italic">{value.caption}</figcaption>
			)}
		</figure>
	)
}
