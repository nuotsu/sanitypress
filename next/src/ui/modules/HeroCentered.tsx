import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'

export default function HeroCentered({ content, ctas }: Props) {
	return (
		<section className="section richtext text-center">
			<PortableText value={content} />
			<CTAList ctas={ctas} className="justify-center" />
		</section>
	)
}

type Props = Partial<{
	content: any
	ctas: Sanity.CTA[]
}>
