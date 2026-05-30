import { PortableText } from 'next-sanity'
import type { Form, FormModule } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import { Module } from '..'
import Resolver from './resolver'

export default function ({ eyebrow, intro, form, ...props }: FormModule) {
	return (
		<Module {...props}>
			<div className="section grid items-start gap-8 md:grid-cols-2">
				{intro && (
					<header className="prose md:sticky-below-header [--offset:1rem]">
						<Eyebrow value={eyebrow} />
						<PortableText value={intro} />
					</header>
				)}

				<Resolver form={form as unknown as Form} />
			</div>
		</Module>
	)
}
