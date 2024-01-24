import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function CTA({ link, style, className, children }: Props) {
	if (!link?.type) return null

	const props = {
		className: twMerge(style, className),
		children: children || link.label || link.internal?.title,
	}

	switch (link.type) {
		case 'internal':
			const slug = link.internal?.metadata?.slug?.current
			const parent = link.internal?._type === 'blog.post' ? 'blog' : null
			const path = slug === 'index' ? '' : slug
			const href = '/' + [parent, path].filter(Boolean).join('/')

			return <Link href={href} {...props} />

		case 'external':
			return <a href={link.external} {...props} />

		default:
			return null
	}
}

type Props = Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement>
