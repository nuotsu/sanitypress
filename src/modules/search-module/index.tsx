import { PortableText, stegaClean } from 'next-sanity'
import { Suspense, ViewTransition } from 'react'
import { Module } from '@/modules'
import type { SearchModule } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import Loading from '@/ui/loading'
import SearchForm from './search-form'

export default function ({
	eyebrow,
	intro = [],
	scope,
	...props
}: SearchModule) {
	return (
		<Module className="section" {...props}>
			<div className="mx-auto max-w-2xl space-y-8">
				{(eyebrow || intro) && (
					<header className="prose text-center">
						<Eyebrow value={eyebrow} />
						<PortableText value={intro ?? []} />
					</header>
				)}

				<ViewTransition update="auto" default="none">
					<Suspense fallback={<Loading>Loading search...</Loading>}>
						<SearchForm scope={stegaClean(scope)} />
					</Suspense>
				</ViewTransition>
			</div>
		</Module>
	)
}
