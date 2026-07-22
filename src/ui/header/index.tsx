import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { Cta } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Logo from '@/ui/logo'
import CustomHTML from '@/modules/custom-html'
import css from './header.module.css'
import MobileToggle from './mobile-toggle'
import Navigation from './navigation'
import Wrapper from './wrapper'

export async function DynamicHeader() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedHeader perspective={perspective} stega={stega} />
}

export default async function Header(props: DynamicFetchOptions) {
	return <CachedHeader {...props} />
}

async function CachedHeader({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const site = await getSite({ perspective, stega })
	const blurb = site?.header?.blurb

	return (
		<Wrapper className="bg-background/80 has-[.accordion:open]:bg-background max-md:header-open:shadow-xl sticky top-0 z-10 backdrop-blur transition-colors">
			<div className={cn(css.root, 'section grid items-center gap-x-4 py-4')}>
				<div className="just between flex items-center gap-4 [grid-area:top]">
					<Logo
						className="grow has-[img]:-my-2 has-[img]:h-[2lh]"
						perspective={perspective}
						stega={stega}
					/>
					<MobileToggle />
				</div>

				<Navigation perspective={perspective} stega={stega} />

				<div className="max-md:header-not-open:hidden flex items-center gap-[.5em_1em] [grid-area:ctas] max-md:flex-col">
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

					<CTAList
						ctas={site?.ctas as Cta[]}
						className="max-sm:w-full max-sm:*:w-full"
					/>
				</div>
			</div>
		</Wrapper>
	)
}
