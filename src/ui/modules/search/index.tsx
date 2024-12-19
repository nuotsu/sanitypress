import { PortableText } from 'next-sanity'
import { Suspense } from 'react'
import SearchForm from './SearchForm'
import type { SearchScope } from './store'

export default function SearchModule({
	content,
	scope,
}: Partial<{
	content: any
	scope: SearchScope
}>) {
	return (
		<section className="section space-y-8">
			{content && (
				<header className="richtext text-center">
					<PortableText value={content} />
				</header>
			)}

			<div className="mx-auto max-w-screen-sm">
				<Suspense fallback={<div className="skeleton-[calc(1lh+.5rem+2px)]" />}>
					<SearchForm scope={scope} />
				</Suspense>
			</div>
		</section>
	)
}
