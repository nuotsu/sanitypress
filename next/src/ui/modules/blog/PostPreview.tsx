import Link from 'next/link'
import Date from '@/ui/Date'
import Img from '@/ui/Img'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link className="group block" href={`/blog/${post.metadata.slug.current}`}>
			<figure className="aspect-video bg-black/5">
				<Img
					className="aspect-[inherit] w-full object-cover"
					image={post.metadata.image}
					imageWidth={600}
				/>
			</figure>
			<div className="h3 group-hover:underline">{post.title}</div>
			<Date value={post.publishDate} />
		</Link>
	)
}
