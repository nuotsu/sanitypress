import { getSite } from '@/lib/sanity'
import SkipToContent from '../SkipToContent'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'

export default async function Header() {
	const { title, headerMenu, ctas } = await getSite()

	return (
		<Wrapper className="sticky top-0 z-10 border-b border-ink/10 bg-canvas/90 backdrop-blur">
			<SkipToContent />

			<div
				className={cn(
					css.header,
					'mx-auto grid max-w-screen-xl items-center gap-x-4 p-4',
				)}
			>
				<div className="[grid-area:logo]">
					<Link className="font-bold" href="/">
						{title}
					</Link>
				</div>

				<Navigation />

				<CTAList
					className="[grid-area:ctas] max-md:*:w-full max-md:header-closed:hidden md:ml-auto"
					ctas={ctas}
				/>

				<Toggle />
			</div>
		</Wrapper>
	)
}
