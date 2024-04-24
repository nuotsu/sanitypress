import { PortableText } from 'next-sanity'
import Img from '../Img'

export default function CreativeModule({
	columns,
	modules,
}: Partial<{
	columns: number
	modules: Sanity.Module<Image | Richtext>[]
}>) {
	return (
		<section>
			<div
				className="section grid items-center gap-x-9 gap-y-4 md:grid-cols-[repeat(var(--col,1),minmax(0px,1fr))]"
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
								</div>
							)

						default:
							return <div data-type={module._type} key={module._key} />
					}
				})}
			</div>
		</section>
	)
}

type Image = Sanity.Image

type Richtext = Partial<{
	content: any
}>
