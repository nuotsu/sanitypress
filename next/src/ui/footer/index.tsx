import getSite from '@/lib/getSite'

export default async function Footer() {
	const { title } = await getSite()

	return (
		<footer>
			<p>
				&copy; {new Date().getFullYear()} {title}
			</p>
		</footer>
	)
}
