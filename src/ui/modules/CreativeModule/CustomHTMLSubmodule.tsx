import CustomHTML from '@/ui/modules/CustomHTML'

export type CustomHTMLSubmoduleType = Sanity.Module<'custom-html'> &
	React.ComponentProps<typeof CustomHTML>

export default function CustomHTMLSubmodule({
	module,
}: {
	module: CustomHTMLSubmoduleType
}) {
	return <CustomHTML html={module?.html} />
}
