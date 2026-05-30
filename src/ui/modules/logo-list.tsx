import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Logo, LogoList } from '@/sanity/types'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import { Module } from '.'
import css from './logo-list.module.css'

export default function ({
	eyebrow,
	intro,
	logos,
	logoType = 'default',
	autoScroll,
	duration = 12,
	...props
}: LogoList) {
	return (
		<Module className="section space-y-8 text-center" {...props}>
			{(eyebrow || intro) && (
				<header className="prose">
					<Eyebrow value={eyebrow} />
					<PortableText value={intro ?? []} />
				</header>
			)}

			<figure
				className={cn(
					'mx-auto flex items-center',
					autoScroll
						? `${css.track} max-w-max overflow-hidden mask-x-from-[calc(100%-2rem)]`
						: 'flex-wrap justify-center gap-x-4 gap-y-4',
				)}
				style={{
					'--count': logos?.length,
					'--duration': `${duration}s`,
				}}
				key={logos?.length}
			>
				{(logos as unknown as Logo[])?.map((logo, key) => {
					if (!logo.image) return null

					return (
						<Img
							className="h-[2lh] w-[200px] shrink-0 object-contain px-4 max-sm:w-[150px]"
							style={{ '--index': key }}
							image={logo.image[logoType] ?? logo.image.default}
							width={200}
							alt={logo.title ?? ''}
							key={key}
						/>
					)
				})}
			</figure>
		</Module>
	)
}
