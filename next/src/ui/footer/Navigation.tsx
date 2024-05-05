import { getSite } from '@/lib/sanity'
import CTA from '@/ui/CTA'

export default async function Menu() {
	const { footerMenu } = await getSite()

	return (
		<nav className="flex flex-wrap items-center justify-center gap-4">
			{footerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return <CTA className="link" link={item} key={key} />

					default:
						return null
				}
			})}
		</nav>
	)
}
