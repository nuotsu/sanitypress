import { PortableText } from 'next-sanity'

export default function StatList({
	content,
	stats,
}: Partial<{
	content: any
	stats: {
		value: string
		subValue?: string
		text: string
	}[]
}>) {
	return (
		<section className="section space-y-8">
			{content && (
				<header className="richtext text-center">
					<PortableText value={content} />
				</header>
			)}

			<dl className="flex items-start justify-center gap-x-12 gap-y-6 max-md:flex-col">
				{stats?.map((stat, key) => (
					<div className="w-full max-w-[250px] space-y-2" key={key}>
						<dt className="text-6xl font-bold">
							{stat.value}
							{stat.subValue && (
								<small className="text-xl text-ink/50">{stat.subValue}</small>
							)}
						</dt>
						<dd className="text-balance font-bold">{stat.text}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
