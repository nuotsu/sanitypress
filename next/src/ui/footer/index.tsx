import { getSite } from '@/lib/sanity/queries'
import Navigation from './Navigation'
import Social from '@/ui/Social'
import { PortableText } from '@portabletext/react'

export default async function Footer() {
	const { title, copyright } = await getSite()

	return (
		<section className="bg-ink text-center text-canvas">
			<div className="section py-8">
				<div className="mx-auto max-w-screen-xl space-y-8">
					<Navigation />
					<Social className="justify-center" />
					<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
						&copy; {new Date().getFullYear()}{' '}
						{copyright ? <PortableText value={copyright} /> : title}
					</div>
				</div>
			</div>
		</section>
	)
}
