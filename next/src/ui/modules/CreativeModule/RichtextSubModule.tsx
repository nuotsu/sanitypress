import { PortableText } from '@portabletext/react'

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
