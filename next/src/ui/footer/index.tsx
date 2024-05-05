import { getSite } from '@/lib/sanity'
import Navigation from './Navigation'
import Social from '@/ui/Social'

export default async function Footer() {
	const { title } = await getSite()

	return (
		<footer className="section bg-ink py-8 text-center text-canvas">
			<div className="mx-auto max-w-screen-xl space-y-8">
				<Navigation />

				<Social className="justify-center" />

				<p className="text-sm">
					&copy; {new Date().getFullYear()} {title}
				</p>
			</div>
		</footer>
	)
}
