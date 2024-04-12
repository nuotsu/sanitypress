import Link from 'next/link'
import Date from '@/ui/Date'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link className="link" href={`/blog/${post.metadata.slug.current}`}>
			{post.title}—
			<Date value={post.publishDate} />
		</Link>
	)
}
