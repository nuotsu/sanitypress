import { getSite } from '@/lib/sanity/queries'
import { cn } from '@/lib/utils'
import CTA from '@/ui/CTA'
import { stegaClean } from '@sanity/client/stega'

export default async function Menu() {
	const { footerMenu } = await getSite()

	return (
		<nav className="flex flex-wrap items-start gap-x-12 gap-y-6">
			{footerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return <CTA className="hover:link" link={item} key={key} />

					case 'link.list':
						return (
							<div className="space-y-2 text-left" key={key}>
								<div className="technical text-xs">
									<CTA link={item.link}>
										{stegaClean(item.link?.label) || item.link.internal?.title}
									</CTA>
								</div>

								<ul>
									{item.links?.map((link, key) => (
										<li key={key}>
											<CTA
												className={cn(
													'inline-block py-px hover:underline',
													link.external?.startsWith('http') && 'is-external',
												)}
												link={link}
											/>
										</li>
									))}
								</ul>
							</div>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
