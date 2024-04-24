import getSite from '@/lib/getSite'

export default async function Footer() {
	const { title } = await getSite()

	return (
		<footer className="border-t p-4 text-center">
			<div className="mx-auto max-w-screen-xl">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} {title}
				</p>
			</div>
		</footer>
	)
}
