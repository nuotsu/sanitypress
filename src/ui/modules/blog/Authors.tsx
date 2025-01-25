import Img from '@/ui/Img'
import { GoPerson } from 'react-icons/go'

export default function Authors({
	authors,
	skeleton,
	...props
}: {
	authors?: Sanity.Person[]
	skeleton?: boolean
} & React.ComponentProps<'dl'>) {
	if (!authors?.length && !skeleton) return null

	return (
		<dl {...props}>
			{authors?.map((author) => <Author author={author} key={author._id} />)}

			{skeleton && <Author />}
		</dl>
	)
}

function Author({ author }: { author?: Sanity.Person }) {
	return (
		<div className="flex items-center gap-[.5ch]">
			<dd className="grid aspect-square w-[1.7em] shrink-0 place-content-center overflow-hidden rounded-full bg-neutral-50">
				{author?.image ? (
					<Img
						className="aspect-square"
						image={author.image}
						width={60}
						alt={author.name}
					/>
				) : (
					<GoPerson className="text-accent/20 text-xl" />
				)}
			</dd>

			<dt>{author?.name}</dt>
		</div>
	)
}
