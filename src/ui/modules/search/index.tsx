import { PortableText, stegaClean } from 'next-sanity'
import { Suspense } from 'react'
import type { SearchModule } from '@/sanity/types'
import Loading from '@/ui/loading'
import Eyebrow from '@/ui/eyebrow'
import SearchForm from './search-form'

export default function ({ eyebrow, intro = [], scope }: SearchModule) {
	return (
		<section className="section">
			<div className="mx-auto max-w-2xl space-y-8">
				{(eyebrow || intro) && (
					<header className="prose text-center">
						<Eyebrow value={eyebrow} />
						<PortableText value={intro ?? []} />
					</header>
				)}

				<Suspense fallback={<Loading>Loading search...</Loading>}>
					<SearchForm scope={stegaClean(scope)} />
				</Suspense>
			</div>
		</section>
	)
}
