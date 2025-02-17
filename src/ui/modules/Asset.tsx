import { ResponsiveImg } from '@/ui/Img'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'

export default function Asset({
	asset,
}: {
	asset?: Sanity.Img | Sanity.Code | Sanity.CustomHTML
}) {
	if (!asset) return null

	switch (asset?._type) {
		case 'img':
			return <ResponsiveImg img={asset} className="w-full" width={1200} />

		case 'code':
			return (
				<Code
					className="richtext [&_.inner]:max-h-[20lh] [&_.inner]:overflow-auto"
					value={asset}
				/>
			)

		case 'custom-html':
			return <CustomHTML {...asset} />

		default:
			return null
	}
}
