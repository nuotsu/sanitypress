import { PortableText } from 'next-sanity'

export default function StatList({
	content,
	stats,
}: Partial<{
	content: any
	stats: {
		value: string
		text: string
	}[]
}>) {
	return (
		<section className="section">
			{content && (
				<header className="richtext text-center">
					<PortableText value={content} />
				</header>
			)}

			<dl className="flex items-start justify-center gap-x-12 gap-y-6 max-md:flex-col">
				{stats?.map((stat, key) => (
					<div className="w-full max-w-[250px]" key={key}>
						<dt className="text-6xl font-bold">{stat.value}</dt>
						<dd className="font-bold">{stat.text}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
