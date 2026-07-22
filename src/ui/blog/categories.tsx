import Link from 'next/link'
import { ROUTES } from '@/lib/env'
import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/sanity/types'

export default function ({
	categories,
	className,
	linked,
}: {
	categories: BlogCategory[]
	linked?: boolean
} & React.ComponentProps<'ul'>) {
	if (!categories) return null

	return (
		<ul className={cn('flex flex-wrap gap-x-[.5ch] p-0', className)}>
			{categories.map((category, key) => (
				<li className="shrink-0" key={key}>
					{linked ? (
						<Link
							href={{
								pathname: `/${ROUTES.blog}`,
								query: { category: category.slug?.current },
							}}
							className="link"
						>
							{category.title}
						</Link>
					) : (
						category.title
					)}

					{key < categories.length - 1 && <>, </>}
				</li>
			))}
		</ul>
	)
}
