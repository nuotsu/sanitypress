import { cn } from '@/lib/utils'
import type { Person } from '@/sanity/types'
import Img from '@/ui/img'

export default function ({
	author,
	className,
}: { author?: Person } & React.ComponentProps<'div'>) {
	if (!author?.name) return null

	return (
		<div className={cn('inline-flex items-center gap-2', className)}>
			<figure className="size-lh aspect-square shrink-0 overflow-hidden rounded-full">
				<Img
					className="aspect-square object-cover"
					image={author.image}
					width={48}
					alt={author.name ?? ''}
				/>
			</figure>

			<div>
				<span className="sr-only">By </span>
				{author.name}
			</div>
		</div>
	)
}
