import Img from '@/ui/Img'

export type IconSubModuleType = Sanity.Module<'icon'> &
	Partial<{
		icon: Sanity.Image
		size: number
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
				style={{ maxHeight: module.size }}
				imageWidth={module.size}
			/>
		</figure>
	)
}
