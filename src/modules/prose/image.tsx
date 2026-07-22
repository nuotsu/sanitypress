import { PortableText, type PortableTextTypeComponentProps } from 'next-sanity'
import Img from '@/ui/img'

export default function ({
	value: { figcaption, ...image },
}: PortableTextTypeComponentProps<any>) {
	return (
		<figure className="max-md:full-bleed my-6 space-y-2 text-center first:mt-0 md:col-[bleed]!">
			<Img
				className="mx-auto"
				image={image}
				width={1000}
				alt={image.alt ?? ''}
			/>

			{figcaption && (
				<figcaption className="text-foreground/50 italic max-md:px-4">
					<PortableText value={figcaption} />
				</figcaption>
			)}
		</figure>
	)
}
