import { PortableText } from 'next-sanity'
import type { Megamenu, Page } from '@/sanity/types'
import Img from '@/ui/img'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	image,
	link,
	content,
}: Partial<NonNullable<Megamenu['items']>[number] & { _type: 'link.card' }>) {
	const label = link?.label || (link?.internal as unknown as Page)?.title

	return (
		<figure className="link-card relative break-inside-avoid md:max-w-md">
			<Img
				className="w-full max-md:hidden"
				image={image}
				width={500}
				alt={label ?? ''}
			/>

			<figcaption className="grid gap-1">
				<SanityLink
					className="py-1 text-current after:absolute after:inset-0 hover:underline md:font-bold"
					link={link as unknown as SanityLinkType}
				/>

				{content && (
					<div className="prose text-sm max-md:hidden">
						<PortableText value={content} />
					</div>
				)}
			</figcaption>
		</figure>
	)
}
