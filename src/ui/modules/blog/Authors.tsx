import Img from '@/ui/Img'
import { GoPerson } from 'react-icons/go'

export default function Authors({
	authors,
	...props
}: { authors?: Sanity.Person[] } & React.ComponentProps<'dl'>) {
	if (!authors?.length) return null

	return (
		<dl {...props}>
			{authors?.map((author) => (
				<div className="flex items-center gap-[.5ch]" key={author._id}>
					<dd className="grid aspect-square w-[1.7em] place-content-center overflow-hidden rounded-full bg-ink/5">
						{author.image ? (
							<Img
								className="aspect-square"
								image={author.image}
								imageWidth={60}
								alt={author.name}
							/>
						) : (
							<GoPerson className="text-xl text-accent/20" />
						)}
					</dd>

					<dt>{author.name}</dt>
				</div>
			))}
		</dl>
	)
}
