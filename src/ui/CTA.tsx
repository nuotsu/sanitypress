import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

export default function CTA({
	link,
	style,
	className,
	children,
	_type,
	_key,
	...rest
}: Sanity.CTA & ComponentProps<'a'>) {
	const props = {
		className: cn(stegaClean(style), className) || undefined,
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...rest,
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)

	if (link?.type === 'external' && link.external)
		return <a href={stegaClean(link.external)} {...props} />

	return <div {...(props as ComponentProps<'div'>)} />
}
