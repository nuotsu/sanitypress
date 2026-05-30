import { PortableText, stegaClean } from 'next-sanity'
import { Suspense } from 'react'
import type { SearchModule } from '@/sanity/types'
import Loading from '@/ui/loading'
import Eyebrow from '@/ui/eyebrow'
import { Module } from '..'
import SearchForm from './search-form'

export default function ({ eyebrow, intro = [], scope, ...props }: SearchModule) {
	return (
		<Module className="section" {...props}>
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
		</Module>
	)
}
