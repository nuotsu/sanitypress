import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import Pretitle from '../Pretitle'
import Img from '../Img'

export default async function LogoList({
	pretitle,
	content,
	logoType = 'default',
	logos,
}: Partial<{
	pretitle: string
	content: any
	logoType: 'default' | 'light' | 'dark'
	logos: Sanity.Logo[]
}>) {
	const allLogos =
		logos || (await fetchSanity<Sanity.Logo[]>(groq`*[_type == 'logo']`))

	return (
		<section className="section space-y-8">
			<header className="richtext text-center">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText value={content} />
			</header>

			<figure className="item-center mx-auto flex flex-wrap justify-center gap-x-4 gap-y-8">
				{allLogos.map((logo, key) => (
					<Img
						className="max-h-[2em] max-w-[200px] object-contain"
						image={logo.image[logoType]}
						imageWidth={400}
						key={key}
					/>
				))}
			</figure>
		</section>
	)
}
