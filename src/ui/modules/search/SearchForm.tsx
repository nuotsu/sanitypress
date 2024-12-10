'use client'

import { useState } from 'react'
import { cn, debounce, count } from '@/lib/utils'
import { VscSearch } from 'react-icons/vsc'
import client from '@/sanity/client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import css from './SearchForm.module.css'

type SearchResults = Sanity.PageBase[]

export default function SearchForm({
	className,
	...props
}: React.ComponentProps<'search'>) {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<SearchResults>([])

	async function handleSearch({ target }: React.ChangeEvent<HTMLInputElement>) {
		setQuery(target.value)

		if (!target.value) setResults([])

		const results = await client.fetch<SearchResults>(
			groq`*[
				_type in ['page', 'blog.post'] &&
				!(metadata.slug.current in ['404', 'blog/*']) &&
				[body[].children[].text, metadata.title, title] match $query
			]{
				_id,
				_type,
				title,
				metadata
			}`,
			{ query: target.value as any },
		)

		setResults(results)
	}

	return (
		<search className={cn(css.root, 'relative', className)} {...props}>
			<label className="relative z-[2]">
				<VscSearch />

				<input
					className="input w-full"
					name="query"
					type="search"
					placeholder="Search"
					onChange={debounce(handleSearch)}
				/>
			</label>

			{query && (
				<div
					className={cn(
						css.results,
						'anim-fade-to-b absolute inset-x-0 top-full z-[1] max-h-[20em] overflow-y-auto border bg-canvas shadow-md',
					)}
				>
					<p className="p-2 text-center text-sm text-ink/50">
						{count(results, 'result')} found for <output>"{query}"</output>
					</p>

					{results.length > 0 && (
						<ul className="px-3 pb-2">
							{results.map((result) => (
								<li key={result._id}>
									<Link
										className="group flex gap-2 py-px"
										href={processUrl(result, { base: false })}
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
			)}
		</search>
	)
}
