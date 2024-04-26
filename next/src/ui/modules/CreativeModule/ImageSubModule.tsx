import Img from '@/ui/Img'

export type ImageSubModuleType = Sanity.Module<'image'> &
	Sanity.Image &
	Partial<{
		aspectRatio: string
	}>

export default function ImageSubModule({
	module,
}: {
	module: ImageSubModuleType
}) {
	return (
		<figure>
			<Img
				className="w-full object-cover"
				style={{ aspectRatio: module.aspectRatio }}
				image={module}
				imageWidth={1000}
			/>
		</figure>
	)
}
