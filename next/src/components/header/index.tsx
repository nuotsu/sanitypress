import getSite from '@/lib/getSite'
import Link from 'next/link'

export default async function Header() {
	const { title } = await getSite()

	return (
		<header className="sticky top-0 z-10">
			<Link href="/">{title}</Link>
		</header>
	)
}
