import { getSite } from '@/sanity/lib/queries'
import Navigation from './Navigation'
import Social from '@/ui/Social'
import LanguageSwitcher from '@/ui/LanguageSwitcher'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Img } from '@/ui/Img'

export default async function Footer() {
	const { title, blurb, logo, copyright } = await getSite()

	const logoImage = logo?.image?.light || logo?.image?.default

	return (
		<footer className="bg-ink text-canvas" role="contentinfo">
			<div className="section flex flex-wrap justify-between gap-x-12 gap-y-8 max-sm:flex-col">
				<div className="flex flex-col gap-3 self-stretch">
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

					{blurb && (
						<div className="max-w-sm text-sm text-balance">
							<PortableText value={blurb} />
						</div>
					)}

					<Social className="mb-auto -ml-2" />

					<LanguageSwitcher className="mt-4 max-w-max" />
				</div>

				<Navigation />
			</div>

			{copyright && (
				<div className="border-canvas/20 mx-auto flex max-w-screen-xl flex-wrap justify-center gap-x-6 gap-y-2 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-sm [&_a:hover]:underline">
					<PortableText value={copyright} />
				</div>
			)}
		</footer>
	)
}
