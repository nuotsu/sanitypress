import { PortableText } from 'next-sanity'
import CTAsSubModule, { type CTAsSubModuleType } from './CTAsSubModule'
import IconSubModule, { type IconSubModuleType } from './IconSubModule'
import ImageSubModule, { type ImageSubModuleType } from './ImageSubModule'
import RichtextSubModule, {
	type RichtextSubModuleType,
} from './RichtextSubModule'

export default function CreativeModule({
	content,
	columns,
	modules,
}: Partial<{
	content: any
	columns: number
	modules: {
		subModules: Array<
			| CTAsSubModuleType
			| IconSubModuleType
			| ImageSubModuleType
			| RichtextSubModuleType
		>
	}[]
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
					{modules?.map((module, i) => (
						<article className="space-y-4" key={i}>
							{module.subModules.map((subModule, ii) => {
								switch (subModule._type) {
									case 'ctas':
										return <CTAsSubModule module={subModule} key={ii} />

									case 'icon':
										return <IconSubModule module={subModule} key={ii} />

									case 'image':
										return <ImageSubModule module={subModule} key={ii} />

									case 'richtext':
										return <RichtextSubModule module={subModule} key={ii} />
								}
							})}
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
