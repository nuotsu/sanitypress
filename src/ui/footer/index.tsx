import { PortableText } from 'next-sanity'
import CustomHTML from '@/modules/custom-html'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import Logo from '@/ui/logo'
import SocialNavigation from '@/ui/social-navigation'
import SanityLink, { type SanityLinkType } from '../sanity-link'
import Navigation from './navigation'

export async function DynamicFooter() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedFooter perspective={perspective} stega={stega} />
}

export default async function Footer(props: DynamicFetchOptions) {
	return <CachedFooter {...props} />
}

async function CachedFooter({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const site = await getSite({ perspective, stega })
	const blurb = site?.footer?.blurb

	return (
		<footer>
			<div className="section space-y-4">
				<div className="flex justify-between gap-4 max-md:flex-col md:items-start">
					<div className="flex flex-col items-center gap-4 max-md:text-center md:items-start">
						<Logo
							className="[&_img]:h-[2lh]"
							perspective={perspective}
							stega={stega}
						/>

						{blurb && (
							<div className="prose">
								<PortableText
									value={blurb}
									components={{
										types: {
											'custom-html': ({ value }) => <CustomHTML {...value} />,
										},
									}}
								/>
							</div>
						)}

						<SocialNavigation
							className="social [&_svg]:size-lh link flex items-center gap-4 max-md:justify-center"
							perspective={perspective}
							stega={stega}
						/>
					</div>

					<Navigation perspective={perspective} stega={stega} />
				</div>

				{(site?.copyright || site?.bottom?.items) && (
					<div className="flex items-center justify-between gap-4 text-center not-has-[.bottom-navigation]:justify-center max-md:flex-col">
						{site?.bottom?.items && (
							<ul className="bottom-navigation flex flex-wrap gap-x-4">
								{site?.bottom?.items?.map((item, i) => (
									<li key={`${item._key}-${i}`}>
										<SanityLink
											link={item as SanityLinkType}
											className="text-current hover:underline"
										/>
									</li>
								))}
							</ul>
						)}

						{site?.copyright && (
							<div className="[&_a]:link copyright md:order-first">
								<PortableText value={site.copyright} />
							</div>
						)}
					</div>
				)}
			</div>
		</footer>
	)
}
