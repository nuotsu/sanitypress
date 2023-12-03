import { PortableText } from '@portabletext/react'
import CTAList from '../CTAList'

export default function HeroCentered({ content, ctas }: Props) {
	return (
		<section className="section text-center richtext">
			<PortableText value={content} />
			<CTAList ctas={ctas} className="justify-center" />
		</section>
	)
}

type Props = Partial<{
	content: any
	ctas: Sanity.CTA[]
}>
