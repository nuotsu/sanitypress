import { cn } from '@/lib/utils'
import type { LinkList } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	link,
	links,
	className,
	_type,
	_key,
	...props
}: LinkList & React.ComponentProps<'li'> & Partial<{ _key: string }>) {
	return (
		<li className={cn('grid gap-1 text-left', className)} {...props}>
			{link && (
				<div>
					<SanityLink
						className="text-foreground/50 [[href]]:hover:underline"
						link={link as SanityLinkType}
					/>
				</div>
			)}

			<ul className="leading-tight">
				{links?.map((item) => (
					<li key={item._key}>
						<SanityLink
							className="inline-block py-[.3ch] text-current hover:underline"
							link={item as SanityLinkType}
						/>
					</li>
				))}
			</ul>
		</li>
	)
}
