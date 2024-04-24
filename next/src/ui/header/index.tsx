import getSite from '@/lib/getSite'
import Wrapper from './Wrapper'
import Link from 'next/link'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import CTAList from '../CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'

export default async function Header() {
	const { title, menu, ctas } = await getSite()

	return (
		<Wrapper className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
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

				<nav className="max-md:header-closed:hidden max-md:anim-fade-to-r flex gap-x-4 [grid-area:menu] max-md:flex-col">
					{menu?.map((item, key) => {
						switch (item._type) {
							case 'link':
								return <CTA className="link" link={item} key={key} />

							case 'link.list':
								return <LinkList {...item} key={key} />

							default:
								return null
						}
					})}
				</nav>

				<CTAList
					className="max-md:header-closed:hidden [grid-area:ctas] max-md:*:w-full md:ml-auto"
					ctas={ctas}
				/>

				<Toggle />
			</div>
		</Wrapper>
	)
}
