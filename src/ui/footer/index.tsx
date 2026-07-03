import { PortableText } from 'next-sanity'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import Logo from '@/ui/logo'
import CustomHTML from '@/ui/modules/custom-html'
import SocialNavigation from '@/ui/social-navigation'
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

				<div className="[&_a]:link text-center">
					<PortableText value={site?.copyright ?? []} />
				</div>
			</div>
		</footer>
	)
}
