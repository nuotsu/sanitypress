import Link from 'next/link'
import Date from '@/ui/Date'
import Img from '@/ui/Img'
import processUrl from '@/lib/processUrl'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			className="group block space-y-2"
			href={processUrl(post, { base: false })}
		>
			<figure className="aspect-video bg-ink/5">
				<Img
					className="aspect-[inherit] w-full object-cover"
					image={post.metadata.image}
					imageWidth={600}
				/>
			</figure>

			<div className="h3 group-hover:underline">{post.title}</div>

			<div>
				<Date value={post.publishDate} />
			</div>
		</Link>
	)
}
