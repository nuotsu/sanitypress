import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function PersonList({
	pretitle,
	intro,
	people,
	layout,
}: Partial<{
	pretitle: string
	intro: any
	people: Sanity.Person[]
	layout: 'grid' | 'carousel'
}>) {
	const isCarousel = stegaClean(layout) === 'carousel'

	return (
		<section className="section space-y-12 text-center">
			{(pretitle || intro) && (
				<header className="richtext">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<ul
				className={cn(
					'items-start gap-8',
					isCarousel
						? 'carousel max-md:full-bleed md:overflow-fade-r pb-4 max-md:px-4'
						: 'grid *:h-full max-md:pb-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
				)}
			>
				{people?.map((person, key) => (
					<li className="richtext" key={key}>
						<figure className="aspect-square overflow-hidden">
							<Img
								className="aspect-square w-full object-cover"
								image={person.image}
								width={600}
							/>
						</figure>

						<h3>{person.name}</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
