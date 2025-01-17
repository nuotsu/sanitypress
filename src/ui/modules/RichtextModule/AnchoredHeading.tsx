import { slug } from '@/lib/utils'
import type { PortableTextBlock, PortableTextComponentProps } from 'next-sanity'

export default function AnchoredHeading({
	as: Tag,
	children,
	value,
}: {
	as: React.ElementType
} & PortableTextComponentProps<PortableTextBlock>) {
	const id = slug(value.children.reduce((acc, { text }) => acc + text, ''))

	return (
		<Tag id={id} className="group">
			{children}

			<a
				className="anim-fade-to-r ml-2 !no-underline group-target:inline-block md:hidden md:group-hover:inline-block"
				href={`#${id}`}
			>
				<span className="inline-block text-ink/25">¶</span>
			</a>
		</Tag>
	)
}
