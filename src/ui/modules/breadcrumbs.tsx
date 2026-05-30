import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import type { Breadcrumbs, Page } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import { Module } from '.'

export default function ({
	structuredDataOnly,
	crumbs,
	currentPage,
	...props
}: Breadcrumbs & { currentPage?: Page }) {
	return (
		<Module
			as="nav"
			className={cn('section py-4 text-sm', structuredDataOnly && 'sr-only')}
			{...props}
		>
			<ol
				className="flex items-center gap-x-2 gap-y-1"
				itemScope
				itemType="https://schema.org/BreadcrumbList"
			>
				{crumbs?.map((crumb, index) => (
					<Crumb
						link={crumb as SanityLinkType}
						position={index + 1}
						key={crumb._key}
					/>
				))}

				<Crumb position={(crumbs?.length ?? 0) + 1}>{currentPage?.title}</Crumb>
			</ol>
		</Module>
	)
}

function Crumb({
	link,
	position,
	children,
}: {
	position: number
	link?: Partial<ComponentProps<typeof SanityLink>['link']>
} & ComponentProps<'li'>) {
	const Content = (
		<>
			<span itemProp="name">
				{children || link?.label || link?.internal?.title}
			</span>
			<meta itemProp="position" content={position.toString()} />
		</>
	)

	return (
		<li
			className='line-clamp-1 not-first:before:mr-2 not-first:before:content-["/"] first:shrink-0'
			itemProp="itemListElement"
			itemScope
			itemType="https://schema.org/ListItem"
		>
			{link ? (
				<SanityLink
					link={link as SanityLinkType}
					className="link"
					itemProp="item"
				>
					{Content}
				</SanityLink>
			) : (
				Content
			)}
		</li>
	)
}
