import { PortableText } from 'next-sanity'
import Img from '../Img'
import CTAList from '../CTAList'

export default function CreativeModule({
	content,
	columns,
	modules,
}: Partial<{
	content: any
	columns: number
	modules: Sanity.Module<Image | Richtext>[]
}>) {
	return (
		<section>
			<div className="section space-y-8">
				<header className="richtext text-center">
					<PortableText value={content} />
				</header>

				<div
					className="grid items-center gap-x-12 gap-y-8 md:grid-cols-[repeat(var(--col,1),minmax(0px,1fr))]"
					style={{ '--col': columns || modules?.length } as React.CSSProperties}
				>
					{modules?.map((module, key) => {
						switch (module._type) {
							case 'image':
								return (
									<Img
										image={module as Sanity.Image}
										className="mx-auto"
										key={key}
									/>
								)
							case 'richtext':
								return (
									<div className="richtext" key={key}>
										<PortableText value={module.content} />
										<CTAList ctas={module.ctas} />
									</div>
								)
							default:
								return <div data-type={module._type} key={module._key} />
						}
					})}
				</div>
			</div>
		</section>
	)
}

type Image = Sanity.Image

type Richtext = Partial<{
	content: any
	ctas: Sanity.CTA[]
}>
