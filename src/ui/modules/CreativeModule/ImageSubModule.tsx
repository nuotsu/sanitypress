import Img from '@/ui/Img'
import { stegaClean } from '@sanity/client/stega'
import type { ComponentProps } from 'react'

export type ImageSubModuleType = Sanity.Module<'image'> &
	Sanity.Image &
	Partial<{
		aspectRatio: string
	}>

export default function ImageSubModule({
	module,
	...props
}: {
	module: ImageSubModuleType
} & Omit<ComponentProps<typeof Img>, 'image'>) {
	return (
		<figure>
			<Img
				className="w-full object-cover"
				style={{ aspectRatio: stegaClean(module.aspectRatio) }}
				image={module}
				{...props}
			/>
		</figure>
	)
}
