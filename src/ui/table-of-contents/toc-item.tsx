import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'
import { cn, slug } from '@/lib/utils'

export default function ({
	heading,
	...props
}: {
	heading: {
		style: string | null
		text: string | null
	}
} & ComponentProps<'li'>) {
	if (!heading.text) return null

	const style = stegaClean(heading.style)

	return (
		<li {...props}>
			<a
				href={`#${slug(heading.text, { removeLeadingNumberAndHyphen: true })}`}
				className={cn('text-foreground block py-1 hover:underline', {
					'pl-ch': style === 'h2',
					'pl-[2ch]': style === 'h3',
					'pl-[3ch]': style === 'h4',
					'pl-[4ch]': style === 'h5',
					'pl-[5ch]': style === 'h6',
				})}
			>
				{heading.text}
			</a>
		</li>
	)
}
