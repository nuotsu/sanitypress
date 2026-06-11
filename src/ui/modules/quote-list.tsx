import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Quote, QuoteList } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import { Module } from '.'

export default function ({
	eyebrow,
	intro = [],
	quotes,
	layout: l = 'grid',
	columns,
	_key,
	...props
}: QuoteList & { _key: string }) {
	const layout = stegaClean(l)

	return (
		<Module _key={_key} className="section space-y-8" {...props}>
			{(eyebrow || intro) && (
				<header className="prose text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<div
				className={cn(
					'gap-lh',
					layout === 'carousel'
						? 'carousel carousel-scroll-buttons carousel-scroll-marker max-md:full-bleed auto-rows-fr pb-2 max-md:px-4 md:mask-r-from-[calc(100%-2rem)] md:pr-4'
						: [
								'grid md:auto-rows-fr',
								columns
									? `md:grid-cols-[repeat(var(--columns,1),minmax(0px,1fr))]`
									: 'md:grid-cols-[repeat(auto-fit,minmax(var(--container-2xs),1fr))]',
							],
				)}
				style={{ '--columns': columns }}
				data-anchor-name={`--quote-list-${_key}`}
			>
				{(quotes as unknown as Quote[])?.map((quote) => (
					<article
						className="border-stroke bg-background flex flex-col gap-4 border p-4 md:snap-start"
						key={quote._id}
					>
						<blockquote className="prose grow">
							<PortableText value={quote.quote} />
						</blockquote>

						{quote.author?.name && (
							<cite className="flex items-center gap-2">
								<Img
									className="aspect-square size-[2lh] shrink-0 rounded-full object-cover"
									image={quote.author?.image}
									width={48}
									alt={quote.author?.name}
								/>

								<dl>
									<dt>{quote.author.name}</dt>
									{quote.author?.title && (
										<dd className="text-sm">{quote.author?.title}</dd>
									)}
								</dl>
							</cite>
						)}
					</article>
				))}
			</div>
		</Module>
	)
}
