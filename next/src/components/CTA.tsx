import Link from 'next/link'

export default function CTA({ link, style }: Props) {
	if (!link?.type) return null

	if (link.type === 'internal') {
		const slug = link.internal?.metadata.slug.current
		const href = slug === 'index' ? '/' : `/${slug}`

		return (
			<Link href={href} className={style}>
				{link.label}
			</Link>
		)
	}

	if (link.type === 'external')
		return (
			<a href={link.external} className={style}>
				{link.label}
			</a>
		)
}

type Props = Sanity.CTA
