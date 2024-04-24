import Img from '@/ui/Img'

export default function Image({ value }: { value: Sanity.Image }) {
	return (
		<figure className="!my-8 text-center">
			<Img className="mx-auto" image={value} imageWidth={1200} />

			{value.caption && (
				<figcaption className="italic">{value.caption}</figcaption>
			)}
		</figure>
	)
}
