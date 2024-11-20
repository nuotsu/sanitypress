import { slug } from '@/lib/utils'
import { VscLink } from 'react-icons/vsc'
import type { PortableTextBlock, PortableTextComponentProps } from 'next-sanity'

export default function AnchoredHeading({
	as: Tag,
	children,
	value,
}: {
	as: keyof JSX.IntrinsicElements
} & PortableTextComponentProps<PortableTextBlock>) {
	const id = slug(value.children.reduce((acc, { text }) => acc + text, ''))

	return (
		<Tag id={id} className="group">
			{children}

			<a
				className="anim-fade-to-r ml-2 !no-underline group-target:inline-block md:hidden md:group-hover:inline-block"
				href={`#${id}`}
			>
				<VscLink className="inline-block align-baseline text-[smaller]" />
			</a>
		</Tag>
	)
}
