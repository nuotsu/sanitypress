import type { PortableTextComponentProps } from 'next-sanity'
import { slug } from '@/lib/utils'

type PortableTextProps = PortableTextComponentProps<{
	_key?: string
	_type: string
	children?: Array<{ _type: string; text?: unknown }>
}>

export default function ({
	as: Tag = 'h1',
	children,
	value,
}: { as: React.ElementType } & PortableTextProps) {
	const id = slug(
		value.children?.reduce(
			(acc, { text }) => acc + ((text as string | null) ?? ''),
			'',
		) ?? '',
		{ removeLeadingNumberAndHyphen: true },
	)

	return (
		<Tag className="group" id={id}>
			{children}

			{Tag !== 'h1' && (
				<a
					href={`#${id}`}
					className="text-primary ml-ch inline-block pointer-fine:not-group-hover:invisible"
				>
					#
				</a>
			)}
		</Tag>
	)
}
