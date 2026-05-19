import { PortableText } from 'next-sanity'
import type { Callout } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Overline from '@/ui/overline'
import { moduleAttributes } from '.'

export default function ({ overline, intro = [], ctas, ...props }: Callout) {
	return (
		<section className="section text-center" {...moduleAttributes(props)}>
			<header className="prose mx-auto max-w-3xl text-balance">
				<Overline value={overline} />
				<PortableText value={intro} />
				<CTAList ctas={ctas} className="justify-center max-sm:*:w-full" />
			</header>
		</section>
	)
}
