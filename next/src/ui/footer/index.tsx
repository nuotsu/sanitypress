import { getSite } from '@/lib/sanity'
import Social from '@/ui/Social'

export default async function Footer() {
	const { title, footerMenu } = await getSite()

	return (
		<footer className="bg-ink text-canvas p-4 text-center">
			<div className="mx-auto max-w-screen-xl space-y-4">
				<Social className="justify-center" />

				<p className="text-sm">
					&copy; {new Date().getFullYear()} {title}
				</p>
			</div>
		</footer>
	)
}
