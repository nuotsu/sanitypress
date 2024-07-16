import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'
import css from './LogoList.module.css'

export default async function LogoList({
	pretitle,
	intro,
	logos,
	logoType = 'default',
	autoScroll,
}: Partial<{
	pretitle: string
	intro: any
	logos: Sanity.Logo[]
	logoType: 'default' | 'light' | 'dark'
	autoScroll?: boolean
}>) {
	const allLogos =
		logos || (await fetchSanity<Sanity.Logo[]>(groq`*[_type == 'logo']`))

	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext mx-auto max-w-screen-sm text-balance text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<figure
				className={cn(
					'mx-auto flex items-center gap-y-8 pb-4',
					autoScroll
						? `${css.track} overflow-fade max-w-max overflow-hidden`
						: 'flex-wrap justify-center gap-x-4',
				)}
				style={
					{
						'--count': allLogos?.length,
					} as React.CSSProperties
				}
			>
				{allLogos.map((logo, key) => (
					<Img
						className="h-[2.5em] w-[200px] shrink-0 object-contain max-sm:w-[150px]"
						style={{ '--index': key } as React.CSSProperties}
						image={logo.image?.[logoType]}
						imageWidth={400}
						key={key}
					/>
				))}
			</figure>
		</section>
	)
}
