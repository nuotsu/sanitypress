import { Fragment } from 'react'
import CTA from '@/ui/CTA'
import { stegaClean } from '@sanity/client/stega'

export default async function Breadcrumbs({
	crumbs,
	currentPage,
}: Partial<{
	crumbs: Sanity.Link[]
	currentPage: Sanity.Page | Sanity.BlogPost
}>) {
	return (
		<nav className="section py-4 text-sm">
			<ol
				className="flex flex-wrap items-center gap-x-2 gap-y-1"
				itemScope
				itemType="https://schema.org/BreadcrumbList"
			>
				{crumbs?.map((crumb, key) => (
					<Fragment key={key}>
						<Crumb link={crumb} position={key + 1} />

						<li className="opacity-20" role="presentation">
							/
						</li>
					</Fragment>
				))}

				<Crumb position={(crumbs?.length || 0) + 2}>
					{currentPage?.title || currentPage?.metadata.title}
				</Crumb>
			</ol>
		</nav>
	)
}

function Crumb({
	link,
	position,
	children,
}: {
	link?: Omit<Sanity.Link, '_type'>
	position: number
} & React.HTMLAttributes<HTMLLIElement>) {
	const content = (
		<>
			<span itemProp="name">
				{stegaClean(
					children || link?.label || link?.internal?.title || link?.external,
				)}
			</span>
			<meta itemProp="position" content={position.toString()} />
		</>
	)

	return (
		<li
			className="line-clamp-1"
			itemProp="itemListElement"
			itemScope
			itemType="https://schema.org/ListItem"
		>
			{link ? (
				<CTA
					className="hover:underline"
					link={{ _type: 'link', ...link }}
					itemProp="item"
				>
					{content}
				</CTA>
			) : (
				content
			)}
		</li>
	)
}
