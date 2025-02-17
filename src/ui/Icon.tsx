import { Img } from '@/ui/Img'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

export default function Icon({
	icon,
	...props
}: { icon?: Sanity.Icon } & Omit<ComponentProps<'img'>, 'width' | 'height'>) {
	if (!icon) return null

	const px = getPixels(icon.size)

	return icon.ic0n ? (
		<img
			src={`https://ic0n.dev/${stegaClean(icon.ic0n)}`}
			width={px}
			height={px}
			alt=""
			loading="lazy"
			{...props}
		/>
	) : (
		<Img
			className="aspect-square w-auto object-contain"
			image={icon?.image}
			style={{ maxHeight: stegaClean(icon?.size) ?? '40px' }}
			{...props}
			height={Number(px) * 2}
		/>
	)
}

export function getPixels(size?: string) {
	const s = stegaClean(size)

	if (!s || typeof s !== 'string') return undefined

	if (s.endsWith('px')) {
		return parseFloat(s)
	}

	if (s.endsWith('em') || s.endsWith('lh')) {
		return parseFloat(s) * 16
	}

	return undefined
}
