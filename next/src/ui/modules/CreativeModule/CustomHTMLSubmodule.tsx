import CustomHTML from '../CustomHTML'

export type CustomHTMLSubmoduleType = Sanity.Module<'custom-html'> &
	Partial<{
		html: {
			code: string
		}
	}>

export default function CustomHTMLSubmodule({
	module,
}: {
	module: CustomHTMLSubmoduleType
}) {
	return <CustomHTML html={module?.html} />
}
