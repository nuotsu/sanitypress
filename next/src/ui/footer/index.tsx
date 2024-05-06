import { getSite } from '@/lib/sanity'
import Navigation from './Navigation'
import Social from '@/ui/Social'

export default async function Footer() {
	const { title } = await getSite()

	return (
		<section className="bg-ink text-center text-canvas">
			<div className="section py-8">
				<div className="mx-auto max-w-screen-xl space-y-8">
					<Navigation />
					<Social className="justify-center" />
					<p className="text-sm">
						&copy; {new Date().getFullYear()} {title}
					</p>
				</div>
			</div>
		</section>
	)
}
