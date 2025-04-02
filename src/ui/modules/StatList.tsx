import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'

export default function StatList({
	pretitle,
	intro,
	stats,
	textAlign: ta = 'center',
}: Partial<{
	pretitle: string
	intro: any
	stats: Partial<{
		prefix: string
		value: string
		suffix: string
		text: string
	}>[]
	textAlign: React.CSSProperties['textAlign']
}>) {
	const textAlign = stegaClean(ta)

	return (
		<section className="section space-y-8" style={{ textAlign }}>
			{(pretitle || intro) && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<dl className="mx-auto grid items-start justify-center gap-x-12 gap-y-6 max-md:max-w-max sm:grid-cols-2 md:flex">
				{stats?.map(({ prefix, value, suffix, text }, key) => (
					<div
						className="w-full max-w-[250px] space-y-2 max-md:mx-auto"
						key={key}
					>
						<dt className="text-xl font-bold">
							{prefix && <span className="text-accent/50">{prefix}</span>}

							<span className="text-gradient text-6xl">{value}</span>

							{suffix && <span className="text-accent/50">{suffix}</span>}
						</dt>

						{text && <dd className="font-bold text-balance">{text}</dd>}
					</div>
				))}
			</dl>
		</section>
	)
}
