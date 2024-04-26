import Link from 'next/link'
import { cn } from '@/lib/utils'
import processUrl from '@/lib/processUrl'

export default function CTA({
	link,
	style,
	className,
	children,
}: Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement>) {
	if (!link?.type) return null

	const props = {
		className: cn(style, className),
		children: children || link.label || link.internal?.title,
	}

	switch (link.type) {
		case 'internal':
			if (!link.internal) return null

			return (
				<Link
					href={processUrl(link.internal, { base: false, params: link.params })}
					{...props}
				/>
			)

		case 'external':
			return <a href={link.external} {...props} />

		default:
			return null
	}
}
