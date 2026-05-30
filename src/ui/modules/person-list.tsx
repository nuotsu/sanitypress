import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Person, PersonList } from '@/sanity/types'
import Img from '@/ui/img'
import { Module } from '.'

export default function ({ intro = [], people, columns, ...props }: PersonList) {
	return (
		<Module className="section space-y-8" {...props}>
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<div
				className={cn(
					'grid items-start gap-8 md:grid-cols-2',
					columns
						? 'lg:grid-cols-[repeat(var(--columns,1),minmax(0px,1fr))]'
						: 'lg:grid-cols-[repeat(auto-fit,minmax(var(--container-3xs),1fr))]',
				)}
				style={{ '--columns': columns }}
			>
				{(people as unknown as Person[])?.map(({ name, title, image }, key) => (
					<article key={key}>
						<article className="space-y-4">
							<Img
								className="aspect-square w-full object-cover"
								width={400}
								image={image}
								alt={name ?? ''}
							/>

							<dl>
								<dt className="h3">{name}</dt>
								{title && <dd>{title}</dd>}
							</dl>
						</article>
					</article>
				))}
			</div>
		</Module>
	)
}
