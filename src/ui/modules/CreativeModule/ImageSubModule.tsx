import { Img } from '@/ui/Img'
import { stegaClean } from 'next-sanity'

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
} & Omit<React.ComponentProps<typeof Img>, 'image'>) {
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
