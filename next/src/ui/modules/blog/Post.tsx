import Date from '@/ui/Date'
import { PortableText } from '@portabletext/react'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article className="section richtext">
			<h1 className="h1">{post.title}</h1>

			<Date value={post.publishDate} />

			<PortableText value={post.body} />
		</article>
	)
}
