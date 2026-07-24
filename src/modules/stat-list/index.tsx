import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import { Module } from '@/modules'
import type { StatList } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'

export default function ({
	eyebrow,
	intro,
	stats,
	layout: l = 'grid',
	columns,
	...props
}: StatList) {
	const layout = stegaClean(l)

	return (
		<Module className="section space-y-8" {...props}>
			{(eyebrow || intro) && (
				<header className="prose text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<dl
				className={cn(
					'grid gap-8',
					layout === 'carousel'
						? 'carousel carousel-scroll-buttons carousel-scroll-marker max-md:full-bleed auto-rows-fr pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4'
						: [
								'md:auto-rows-fr',
								columns
									? 'lg:grid-cols-[repeat(var(--columns,1),minmax(0px,1fr))]'
									: 'sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(var(--container-3xs),1fr))]',
							],
				)}
				style={{ '--columns': columns }}
			>
				{stats?.map(({ value, suffix, content = [], _key }, i) => (
					<div key={`${_key}-${i}`}>
						<dt className="gap-x-ch flex items-baseline">
							<span className="h0">{value}</span>
							{suffix && <span className="h3">{suffix}</span>}
						</dt>
						{content && (
							<dd className="prose">
								<PortableText value={content} />
							</dd>
						)}
					</div>
				))}
			</dl>
		</Module>
	)
}
