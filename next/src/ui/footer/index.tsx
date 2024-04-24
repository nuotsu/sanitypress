import getSite from '@/lib/getSite'

export default async function Footer() {
	const { title } = await getSite()

	return (
		<footer className="bg-black p-4 text-center text-white">
			<div className="mx-auto max-w-screen-xl">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} {title}
				</p>
			</div>
		</footer>
	)
}
