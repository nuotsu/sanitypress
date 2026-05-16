import { PortableText } from 'next-sanity'
import type { Form, FormModule } from '@/sanity/types'
import Overline from '@/ui/overline'
import { moduleAttributes } from '..'
import Resolver from './resolver'

export default function ({ overline, intro, form, ...props }: FormModule) {
	return (
		<section {...moduleAttributes(props)}>
			<div className="section grid items-start gap-8 md:grid-cols-2">
				{intro && (
					<header className="prose md:sticky-below-header [--offset:1rem]">
						<Overline value={overline} />
						<PortableText value={intro} />
					</header>
				)}

				<Resolver form={form as unknown as Form} />
			</div>
		</section>
	)
}
