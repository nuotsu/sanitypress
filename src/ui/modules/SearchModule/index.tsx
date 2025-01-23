import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import { Suspense } from 'react'
import SearchForm from './SearchForm'
import type { SearchScope } from './store'

export default function SearchModule({
	pretitle,
	intro,
	scope,
}: Partial<{
	pretitle: string
	intro: any
	scope: SearchScope
}>) {
	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
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
