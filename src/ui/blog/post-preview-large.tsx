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
	isFeatured,
	className,
}: {
	post: BlogPost
	isFeatured?: boolean
} & React.ComponentProps<'article'>) {
	if (!post) return null

	return (
		<article
			className={cn('relative grid gap-x-8 gap-y-4 md:grid-cols-2', className)}
		>
			<figure className="bg-foreground/5 max-md:full-bleed aspect-video self-start">
				{post.metadata?.image ? (
					<Img
						className="aspect-video w-full object-cover"
						image={post.metadata?.image}
						width={600}
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
			</figure>

			<div className="grid gap-2 self-center">
				{isFeatured && <Eyebrow value="Featured" />}

				<SanityLink
					className="h1 block text-current after:absolute after:inset-0 hover:underline"
					link={
						{ type: 'internal', internal: post } as unknown as SanityLinkType
					}
				>
					{post.title}
				</SanityLink>

				{post.metadata?.description && (
					<p className="line-clamp-3">{post.metadata?.description}</p>
				)}

				<div className="flex flex-wrap items-center justify-between gap-x-4">
					<Date date={post.publishDate} />
					<Categories
						categories={post.categories as unknown as BlogCategory[]}
					/>
				</div>

				<Byline author={post.author as unknown as Person} />
			</div>
		</article>
	)
}
