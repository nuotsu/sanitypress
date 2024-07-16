import { getSite } from '@/lib/sanity/queries'
import Navigation from './Navigation'
import Social from '@/ui/Social'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Img from '../Img'

export default async function Footer() {
	const { title, logo, copyright } = await getSite()

	const logoImage = logo?.image?.light || logo?.image?.default

	return (
		<footer className="bg-ink text-center text-canvas">
			<div className="section border-b border-canvas/20">
				<div className="mx-auto max-w-screen-xl space-y-8">
					<div className="flex flex-wrap justify-between gap-x-12 gap-y-8">
						<div className="flex flex-col gap-3 self-start max-sm:mx-auto max-sm:items-center">
							<Link className="h3 md:h2 max-w-max" href="/">
								{logoImage ? (
									<Img
										className="max-h-[1.5em] w-auto"
										image={logoImage}
										alt={logo?.name || title}
									/>
								) : (
									title
								)}
							</Link>

							<Social />
						</div>

						<Navigation />
					</div>
				</div>
			</div>

			<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 p-4 text-sm">
				&copy; {new Date().getFullYear()}{' '}
				{copyright ? <PortableText value={copyright} /> : title}
			</div>
		</footer>
	)
}
