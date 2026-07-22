import { PortableText } from 'next-sanity'
import { Fragment } from 'react'
import { Module, type ModuleProps } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { TabbedContent } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import Label from './label'
import Radio from './radio'
import { Provider } from './store'

export default function ({
	eyebrow,
	intro,
	tabs,
	...props
}: TabbedContent & ModuleProps) {
	return (
		<Module
			className="section gap-x-lh grid items-start gap-y-8 md:grid-cols-[24ch_1fr]"
			{...props}
		>
			{(eyebrow || intro) && (
				<header className="prose col-span-full text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<Provider>
				<fieldset className="max-md:full-bleed no-scrollbar md:sticky-below-header flex snap-x snap-mandatory overflow-x-auto [--offset:1rem] max-md:px-4 max-md:text-sm md:flex-col">
					{tabs?.map((tab, i) => (
						<Label
							index={i}
							htmlFor={`tabbed-content-${props._key}-${tab._key}`}
							className="data-active:border-stroke inline-flex shrink-0 snap-center items-center gap-[.5em] border border-transparent p-[.5em] leading-tight not-hover:not-data-active:opacity-50 data-active:font-bold"
							key={`${tab._key}-${i}`}
						>
							<Img
								className="size-[1.5lh] shrink-0 object-contain"
								image={tab.icon}
								width={60}
								alt=""
							/>

							{tab.label}
						</Label>
					))}
				</fieldset>

				<div className="mx-auto w-full max-w-3xl">
					{tabs?.map((tab, i) => (
						<Fragment key={`${tab._key}-${i}`}>
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
											'custom-html': ({ value }) => <CustomHTML {...value} />,
										},
									}}
								/>
								<CTAList ctas={tab.ctas} className="max-sm:*:w-full" />
							</article>
						</Fragment>
					))}
				</div>
			</Provider>
		</Module>
	)
}
