import { getSite } from '@/lib/sanity/queries'
import Navigation from './Navigation'
import Social from '@/ui/Social'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default async function Footer() {
	const { title, copyright } = await getSite()

	return (
		<section className="bg-ink text-center text-canvas">
			<div className="section py-8">
				<div className="mx-auto max-w-screen-xl space-y-8">
					<div className="flex flex-wrap justify-between gap-x-12 gap-y-8">
						<div className="flex flex-col gap-3 max-sm:mx-auto max-sm:items-center">
							<Link className="h3 md:h2" href="/">
								{title}
							</Link>

							<Social />
						</div>

						<Navigation />
					</div>

					<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
						&copy; {new Date().getFullYear()}{' '}
						{copyright ? <PortableText value={copyright} /> : title}
					</div>
				</div>
			</div>
		</section>
	)
}
