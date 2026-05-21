import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Person, PersonList } from '@/sanity/types'
import Img from '@/ui/img'

export default function ({ intro = [], people, columns }: PersonList) {
	return (
		<section className="section space-y-8">
			<header className="prose">
				<PortableText value={intro} />
			</header>

			<ul
				className={cn(
					'grid items-start gap-8 md:grid-cols-2',
					columns
						? 'lg:grid-cols-[repeat(var(--columns,1),minmax(0px,1fr))]'
						: 'lg:grid-cols-[repeat(auto-fit,minmax(var(--container-3xs),1fr))]',
				)}
				style={{ '--columns': columns }}
			>
				{(people as Partial<Person>[])?.map(({ name, title, image }, key) => (
					<li key={key}>
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
					</li>
				))}
			</ul>
		</section>
	)
}
