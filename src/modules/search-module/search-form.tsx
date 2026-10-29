'use client'

import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { VscSearch } from 'react-icons/vsc'
import { count, debounce } from '@/lib/utils'
import type { SearchModule } from '@/sanity/types'
import Loading from '@/ui/loading'
import GoogleResults from './google-results'
import SearchResults from './search-results'
import { handleSearch, useSearchStore } from './store'

export default function ({ scope }: Partial<SearchModule>) {
	const [query, setQuery] = useQueryState('query', { defaultValue: '' })
	const { loading, setLoading, results, setResults } = useSearchStore()

	// one debounced handler for the component's lifetime (a new one per render would never cancel pending calls)
	const onSearch = useMemo(
		() =>
			debounce((value: string) => {
				setQuery(value)
				handleSearch({ scope, query: value, setLoading, setResults })
			}),
		[scope, setQuery, setLoading, setResults],
	)

	return (
		<search className="group/search relative">
			<label className="input focus-within:ring-primary/20 focus-within:border-primary flex items-center gap-2 py-0 focus-within:ring-3">
				<VscSearch className="shrink-0" />

				<input
					id="query"
					className="grow py-[0.25em] outline-none"
					type="search"
					placeholder={scope === 'all' ? 'Search' : `Search ${scope}`}
					defaultValue={query}
					onChange={(e) => onSearch(e.target.value)}
				/>
			</label>

			{query && (
				<output
					htmlFor="query"
					className="anim-fade group-not-hover/search:group-not-has-[:is(:focus,.results:hover)]/search:hidden border-stroke absolute inset-x-0 top-full z-1 origin-top border-x border-b starting:-translate-y-1 starting:scale-95"
				>
					<div className="bg-background grid max-h-[16lh] gap-4 overflow-y-auto p-4 shadow-lg">
						{loading ? (
							<Loading>Searching...</Loading>
						) : (
							<>
								<p className="b flex justify-center text-center whitespace-nowrap">
									{count(results, 'result')} found for "
									<span className="overflow-hidden break-all text-ellipsis">
										{query}
									</span>
									"
								</p>

								<SearchResults query={query} />
								<GoogleResults scope={scope} />
							</>
						)}
					</div>
				</output>
			)}
		</search>
	)
}
