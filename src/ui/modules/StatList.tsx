import { PortableText, stegaClean } from 'next-sanity'

export default function StatList({
	intro,
	stats,
	textAlign = 'center',
}: Partial<{
	intro: any
	stats: {
		value: string
		subValue?: string
		text: string
	}[]
	textAlign: React.CSSProperties['textAlign']
}>) {
	return (
		<section
			className="section space-y-8"
			style={{ textAlign: stegaClean(textAlign) }}
		>
			{intro && (
				<header className="richtext text-center">
					<PortableText value={intro} />
				</header>
			)}

			<dl className="mx-auto flex items-start justify-center gap-x-12 gap-y-6 max-md:max-w-max max-md:flex-col">
				{stats?.map((stat, key) => (
					<div className="w-full max-w-3xs space-y-2" key={key}>
						<dt className="font-bold">
							<span className="text-gradient text-6xl">{stat.value}</span>
							{stat.subValue && (
								<small className="text-ink/50 text-xl">{stat.subValue}</small>
							)}
						</dt>
						<dd className="font-bold text-balance">{stat.text}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
