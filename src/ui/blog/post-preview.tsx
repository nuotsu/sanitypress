import Image from 'next/image'
import { ROUTES } from '@/lib/env'
import { cn } from '@/lib/utils'
import type { BlogCategory, BlogPost, Person } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Byline from './byline'
import Categories from './categories'
import Date from './date'

export default function ({
	post,
	className,
}: {
	post: BlogPost & { isFeatured?: boolean }
} & React.ComponentProps<'li'>) {
	return (
		<li className={cn('relative grid gap-2', className)}>
			<figure className="bg-foreground/5 relative aspect-video">
				{post.metadata?.image ? (
					<Img
						className="aspect-video w-full object-cover"
						image={post.metadata?.image}
						width={400}
						alt={post.title ?? ''}
					/>
				) : (
					<Image
						src={`/api/og?slug=${ROUTES.blog}/${post.metadata?.slug?.current}&invert=1`}
						className="aspect-video w-full object-cover"
						alt={post.title ?? ''}
						width={400}
						height={(400 * 9) / 16}
					/>
				)}

				{post.isFeatured && (
					<Eyebrow
						className="text-background bg-foreground/60 m-ch absolute bottom-0 left-0 p-[.25em_.5em] text-xs backdrop-blur"
						value="Featured"
					/>
				)}
			</figure>

			<SanityLink
				className="block leading-snug text-current after:absolute after:inset-0 hover:underline"
				link={{ type: 'internal', internal: post } as unknown as SanityLinkType}
			>
				<strong>{post.title}</strong>
			</SanityLink>

			{/* {post.metadata?.description && (
				<p className="line-clamp-3">{post.metadata?.description}</p>
			)} */}

			<div className="flex flex-wrap items-center justify-between gap-x-4">
				<Categories categories={post.categories as unknown as BlogCategory[]} />
				<Date date={post.publishDate} className="text-foreground/50" />
			</div>

			<Byline author={post.author as unknown as Person} />
		</li>
	)
}
