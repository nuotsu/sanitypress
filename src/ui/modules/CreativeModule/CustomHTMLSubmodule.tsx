import CustomHTML from '@/ui/modules/CustomHTML'

export type CustomHTMLSubmoduleType = Sanity.Module<'custom-html'> &
	Sanity.CustomHTML

export default function CustomHTMLSubmodule({
	module,
}: {
	module: CustomHTMLSubmoduleType
}) {
	return <CustomHTML html={module?.html} />
}
