import { PortableText } from 'next-sanity'
import { Fragment } from 'react'
import type { TabbedContent } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import CustomHtml from '@/ui/modules/custom-html'
import { Module, type ModuleProps } from '..'
import { Label, Provider, Radio } from './store'

export default function ({
	eyebrow,
	intro,
	tabs,
	...props
}: TabbedContent & ModuleProps) {
	return (
		<Module
			className="section gap-lh grid items-start md:grid-cols-[24ch_1fr]"
			{...props}
		>
			{(eyebrow || intro) && (
				<header className="prose col-span-full text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<Provider>
				<fieldset className="max-md:full-bleed no-scrollbar flex snap-x snap-mandatory overflow-x-auto max-md:px-4 md:flex-col">
					{tabs?.map((tab, i) => (
						<Label
							index={i}
							htmlFor={`tabbed-content-${props._key}-${tab._key}`}
							className="action-base shrink-0 snap-start justify-start data-active:bg-current/5"
							key={tab._key}
						>
							{tab.label}
						</Label>
					))}
				</fieldset>

				<div>
					{tabs?.map((tab, i) => (
						<Fragment key={tab._key}>
							<Radio
								name={`tabbed-content-${props._key}`}
								id={`tabbed-content-${props._key}-${tab._key}`}
								value={i}
								defaultChecked={i === 0}
								index={i}
							/>

							<article className="anim-fade-to-r prose [:not(:checked)+&]:hidden">
								<PortableText
									value={tab.content}
									components={{
										types: {
											image: ({ value }) => (
												<figure>
													<Img
														image={value}
														width={1000}
														alt={value.alt ?? ''}
													/>
												</figure>
											),
											'custom-html': ({ value }) => <CustomHtml {...value} />,
										},
									}}
								/>
							</article>
						</Fragment>
					))}
				</div>
			</Provider>
		</Module>
	)
}
