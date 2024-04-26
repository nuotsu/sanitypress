import { PortableText } from 'next-sanity'
import Img from '@/ui/Img'
import CTAList from '@/ui/CTAList'

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
								return <Img image={module} className="mx-auto" key={key} />

							case 'richtext':
								return (
									<div className="richtext" key={key}>
										<PortableText value={(module as Richtext).content} />
										<CTAList ctas={(module as Richtext).ctas} />
									</div>
								)
						}
					})}
				</div>
			</div>
		</section>
	)
}

type Image = Sanity.Image & {
	_type: 'image'
}

type Richtext = Partial<{
	_type: 'richtext'
	content: any
	ctas: Sanity.CTA[]
}>
