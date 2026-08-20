import { PortableText } from 'next-sanity'
import { portableTextToSchemaHtml } from '@/lib/portable-text-to-schema-html'
import { cn } from '@/lib/utils'
import { Module } from '@/modules'
import { urlFor } from '@/sanity/lib/image'
import type { Person, PersonList } from '@/sanity/types'
import Img from '@/ui/img'

export default function ({
	intro = [],
	people: p,
	columns,
	...props
}: PersonList) {
	const people = (p as unknown as Person[]) ?? []

	const schemaPersons = people
		.filter((person) => person.enableSchema && person.name)
		.map((person) => ({
			'@type': 'Person',
			name: person.name,
			...(person.title && { jobTitle: person.title }),
			...(person.content && {
				description: portableTextToSchemaHtml(person.content),
			}),
			...(person.image && {
				image: urlFor(person.image).width(400).url(),
			}),
		}))

	return (
		<Module className="section space-y-8" {...props}>
			{schemaPersons.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@graph': schemaPersons,
						}),
					}}
				/>
			)}

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
				{people.map(({ name, title, content, image }, key) => (
					<article className="space-y-4" key={key}>
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

						{content && (
							<div className="prose">
								<PortableText value={content} />
							</div>
						)}
					</article>
				))}
			</div>
		</Module>
	)
}
