import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { CardList } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import { Module } from '.'

export default function ({
	eyebrow,
	intro,
	cards,
	ctas,
	columns,
	...props
}: CardList) {
	return (
		<Module className="section space-y-8" {...props}>
			{(eyebrow || intro) && (
				<header className="prose mx-auto max-w-3xl text-center">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro ?? []} />
				</header>
			)}

			{!!cards?.length && (
				<div
					className={cn(
						'grid gap-8 md:grid-cols-2',
						columns
							? 'lg:grid-cols-[repeat(var(--columns,1),minmax(0px,1fr))]'
							: 'lg:grid-cols-[repeat(auto-fit,minmax(var(--container-3xs),1fr))]',
					)}
					style={{ '--columns': columns }}
				>
					{cards.map((item) => (
						<article key={item._key} className="prose">
							<Img
								className="w-full object-cover"
								image={item.image}
								width={1000}
								alt=""
							/>

							<Img
								className="h-12 w-auto object-cover"
								image={item.icon}
								width={120}
								alt=""
							/>

							<PortableText value={item.content ?? []} />

							<CTAList ctas={item.ctas} className="max-sm:*:w-full" />
						</article>
					))}
				</div>
			)}

			<CTAList ctas={ctas} className="justify-center max-sm:*:w-full" />
		</Module>
	)
}
