import { getHeader } from '@/lib/sanity'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'

export default async function Menu({}: {}) {
	const { menu } = await getHeader()

	return (
		<nav className="max-md:anim-fade-to-r flex gap-x-4 [grid-area:menu] max-md:flex-col max-md:header-closed:hidden">
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
	)
}
