import { PortableText } from 'next-sanity'
import type { Callout } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import { Module } from '.'

export default function ({ eyebrow, intro = [], ctas, ...props }: Callout) {
	return (
		<Module className="section text-center" {...props}>
			<header className="prose mx-auto max-w-3xl text-balance">
				<Eyebrow value={eyebrow} />
				<PortableText value={intro} />
				<CTAList ctas={ctas} className="justify-center max-sm:*:w-full" />
			</header>
		</Module>
	)
}
