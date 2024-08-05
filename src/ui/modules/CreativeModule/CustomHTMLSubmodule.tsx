import CustomHTML from '../CustomHTML'
import type { ComponentProps } from 'react'

export type CustomHTMLSubmoduleType = Sanity.Module<'custom-html'> &
	ComponentProps<typeof CustomHTML>

export default function CustomHTMLSubmodule({
	module,
}: {
	module: CustomHTMLSubmoduleType
}) {
	return <CustomHTML html={module?.html} />
}
