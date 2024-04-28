import Img from '@/ui/Img'

export type IconSubModuleType = Sanity.Module<'icon'> &
	Partial<{
		icon: Sanity.Image
		height: number
	}>

export default function IconSubModule({
	module,
	...props
}: {
	module: IconSubModuleType
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<figure {...props}>
			<Img
				className="w-auto"
				image={module.icon}
				style={{ maxHeight: module.height }}
				imageWidth={300}
			/>
		</figure>
	)
}
