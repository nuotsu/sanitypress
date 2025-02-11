import Link from 'next/link'
import Img from '@/ui/Img'
import { GoPerson } from 'react-icons/go'
import { cn } from '@/lib/utils'

export default function Authors({
	authors,
	skeleton,
	linked,
	...props
}: {
	authors?: Sanity.Person[]
	skeleton?: boolean
	linked?: boolean
} & React.ComponentProps<'dl'>) {
	if (!authors?.length && !skeleton) return null

	return (
		<dl {...props}>
			{authors?.map((author) => (
				<Author author={author} key={author._id} linked={linked} />
			))}

			{skeleton && <Author />}
		</dl>
	)
}

function Author({
	author,
	linked,
}: {
	author?: Sanity.Person
	linked?: boolean
}) {
	return (
		<Link
			href={`/blog?author=${author?.slug?.current}`}
			className={cn(
				'flex items-center gap-[.5ch] hover:underline',
				!linked && 'pointer-events-none',
			)}
		>
			<dd className="bg-accent/3 grid aspect-square w-[1.7em] shrink-0 place-content-center overflow-hidden rounded-full">
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
		</Link>
	)
}
