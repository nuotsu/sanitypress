'use client'

import { useSearchStore } from './store'

export default function ({ query }: { query: string }) {
	const { results } = useSearchStore()

	if (!results.length) return null

	return (
		<ul aria-live="polite">
			{results.map(
				(result) =>
					!!result.slug && (
						<li key={result._id}>
							<a
								href={result.slug + `#:~:text=${query}`}
								className="group grid grid-cols-[1fr_auto] items-center gap-4"
							>
								<span className="link line-clamp-1 grow break-all group-hover:decoration-2">
									{result.title}
								</span>

								<span className="text-foreground/50">
									{result._type == 'blog.post' ? 'Blog' : 'Page'}
								</span>
							</a>
						</li>
					),
			)}
		</ul>
	)
}
