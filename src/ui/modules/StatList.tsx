import { PortableText, stegaClean } from 'next-sanity'

export default function StatList({
	intro,
	stats,
	textAlign = 'center',
}: Partial<{
	intro: any
	stats: Partial<{
		prefix: string
		value: string
		suffix: string
		text: string
	}>[]
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
				{stats?.map(({ prefix, value, suffix, text }, key) => (
					<div className="w-full max-w-[250px] space-y-2" key={key}>
						<dt className="text-xl font-bold">
							{prefix && (
								<small className="text-ink/50 dark:text-ink-dark/50">
									{prefix}
								</small>
							)}

							<span className="text-gradient text-6xl">{value}</span>

							{suffix && (
								<small className="text-ink/50 dark:text-ink-dark/50">
									{suffix}
								</small>
							)}
						</dt>

						{text && <dd className="text-balance font-bold">{text}</dd>}
					</div>
				))}
			</dl>
		</section>
	)
}
