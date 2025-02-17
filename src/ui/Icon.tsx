import { Img } from '@/ui/Img'
import type { ComponentProps } from 'react'

export default function Icon({
	icon,
	...props
}: { icon?: Sanity.Icon } & Omit<ComponentProps<'img'>, 'width' | 'height'>) {
	if (!icon) return null

	const px = getPixels(icon.size)

	return icon.ic0n ? (
		<img
			src={`https://ic0n.dev/${icon.ic0n}`}
			width={px}
			height={px}
			alt=""
			loading="lazy"
			{...props}
		/>
	) : (
		<Img
			className="aspect-square object-contain"
			image={icon?.image}
			style={{ maxHeight: icon?.size ?? '40px' }}
			height={px}
			{...props}
		/>
	)
}

export function getPixels(size?: string) {
	if (!size) return undefined

	if (size?.endsWith('px')) {
		return parseFloat(size)
	}

	if (size?.endsWith('em') || size?.endsWith('lh')) {
		return parseFloat(size) * 16
	}

	return undefined
}
