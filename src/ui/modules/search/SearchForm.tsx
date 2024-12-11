'use client'

import { useQuery, searchStore, handleSearch, type SearchScope } from './store'
import { cn, debounce, count } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import { VscSearch } from 'react-icons/vsc'
import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import css from './SearchForm.module.css'

/**
 * @note Remember to wrap this component in a Suspense
 */
export default function SearchForm({
	className,
	scope,
	...props
}: { scope?: SearchScope } & React.ComponentProps<'search'>) {
	const { query, setQuery } = useQuery()
	const { results, setResults } = searchStore()

	return (
		<search className={cn(css.root, 'relative', className)} {...props}>
			<label className="input relative z-[2] flex items-center gap-2 rounded focus-within:border-accent/50">
				<VscSearch />

				<input
					className="grow outline-none"
					name="query"
					type="search"
					placeholder={
						stegaClean(scope) !== 'all' ? `Search ${scope}` : 'Search'
					}
					defaultValue={query}
					onChange={debounce((e) =>
						handleSearch({
							query: e.target.value,
							scope,
							setQuery,
							setResults,
						}),
					)}
				/>
			</label>

			{query && (
				<div
					className={cn(
						css.results,
						'anim-fade-to-b absolute inset-x-0 top-full z-[1]',
					)}
				>
					<div className="frosted-glass mt-1 max-h-[20em] overflow-y-auto rounded border bg-canvas shadow-md">
						<p className="line-clamp-1 p-2 text-center text-sm text-ink/50">
							{count(results, 'result')} found for <output>"{query}"</output>
						</p>

						{results.length > 0 && (
							<ul className="px-3 pb-2">
								{results.map((result) => (
									<li key={result._id}>
										<Link
											className="group flex gap-2 py-px"
											// href={
											// 	processUrl(result, { base: false }) +
											// 	`#:~:text=${encodeURIComponent(query)}`
											// }
											href={{
												pathname: processUrl(result, { base: false }),
												hash: `:~:text=${query}`,
											}}
										>
											<span className="line-clamp-1 grow group-hover:underline">
												{result.metadata.title}
											</span>

											<small className="technical shrink-0 text-xs text-accent/50">
												{result._type === 'blog.post' ? 'Blog' : 'Page'}
											</small>
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</search>
	)
}
