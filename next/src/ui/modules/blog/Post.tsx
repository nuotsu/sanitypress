import { PortableText } from '@portabletext/react'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article className="section richtext">
			<h1 className="h1">{post.title}</h1>

			<time dateTime={post.publishDate}>{post.publishDate}</time>

			<PortableText value={post.body} />
		</article>
	)
}
