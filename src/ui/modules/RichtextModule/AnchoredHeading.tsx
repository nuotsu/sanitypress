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
				className="anim-fade-to-r ms-2 no-underline! group-target:inline-block md:hidden md:group-hover:inline-block"
				href={`#${id}`}
			>
				<span className="text-ink/25 inline-block">¶</span>
			</a>
		</Tag>
	)
}
