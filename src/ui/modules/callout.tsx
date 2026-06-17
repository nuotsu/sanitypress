import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Callout } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import { Module } from '.'
import CustomHtml from './custom-html'

export default function ({
	eyebrow,
	intro = [],
	ctas,
	className,
	...props
}: Callout & React.ComponentProps<'section'>) {
	return (
		<Module className={cn('section text-center', className)} {...props}>
			<header className="prose mx-auto max-w-3xl text-balance">
				<Eyebrow value={eyebrow} />
				<PortableText
					value={intro}
					components={{
						types: {
							image: ({ value }) => (
								<figure>
									<Img
										className="mx-auto w-full"
										image={value}
										width={1000}
										alt={value.alt ?? ''}
									/>
								</figure>
							),
							'custom-html': ({ value }) => <CustomHtml {...value} />,
						},
					}}
				/>
				<CTAList ctas={ctas} className="justify-center max-sm:*:w-full" />
			</header>
		</Module>
	)
}
