import CustomHTML from '@/ui/modules/CustomHTML'

export type CustomHTMLSubmoduleType = Sanity.CustomHTML &
	Sanity.Module<'custom-html'>

export default function CustomHTMLSubmodule({
	module,
}: {
	module: CustomHTMLSubmoduleType
}) {
	return <CustomHTML {...module} />
}
