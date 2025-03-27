import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import { cn } from '@/lib/utils'

export default async function Menu() {
	const { headerMenu } = await getSite()

	const parentClassName = cn('md:px-3 md:text-center md:leading-tight')

	return (
		<nav
			className="max-md:anim-fade-to-r max-md:header-closed:hidden flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col md:justify-center"
			role="navigation"
		>
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className={cn(
									parentClassName,
									'hover:link md:grid md:place-content-center',
								)}
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return (
							<LinkList
								summaryClassName={parentClassName}
								{...item}
								key={key}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
