import { PortableText } from 'next-sanity'

export type RichtextSubModuleType = Sanity.Module<'richtext'> &
	Partial<{
		content: any
	}>

export default function RichtextSubModule({
	module,
}: {
	module: RichtextSubModuleType
}) {
	return (
		<div className="richtext">
			<PortableText value={module.content} />
		</div>
	)
}
