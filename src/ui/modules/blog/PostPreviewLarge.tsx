import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import Img from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'

export default function PostPreviewLarge({ post }: { post: Sanity.BlogPost }) {
	if (!post) return null

	return (
		<Link
			className="group grid items-center gap-x-8 gap-y-4 md:grid-cols-2"
			href={processUrl(post, { base: false })}
		>
			<figure className="max-md:full-bleed relative aspect-video overflow-hidden bg-ink/5 md:aspect-[1.5]">
				<Img
					className="aspect-[1.5] w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
					image={post.metadata.image}
					imageWidth={800}
					alt={post.metadata.title}
					loading="eager"
				/>

				{post.featured && (
					<span className="action absolute right-4 top-0 rounded-t-none py-1 text-xs shadow-md">
						Featured
					</span>
				)}
			</figure>

			<div className="mx-auto max-w-lg space-y-4">
				<h2 className="h2 md:h1 group-hover:underline">
					{post.metadata.title}
				</h2>

				<p className="line-clamp-4 max-md:text-sm">
					{post.metadata.description}
				</p>

				<div className="flex flex-wrap gap-x-4">
					<Date value={post.publishDate} />
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={post.categories}
					/>
				</div>

				{post.authors?.length && (
					<Authors
						className="flex flex-wrap items-center gap-4"
						authors={post.authors}
					/>
				)}
			</div>
		</Link>
	)
}
