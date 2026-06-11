import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getSite } from '@/sanity/lib/queries'
import Img from './img'

export default async function ({
	variant: style = 'default',
	className,
}: {
	variant?: 'default' | 'light' | 'dark'
	className?: string
}) {
	const site = await getSite()
	const logo = site?.logo?.image?.[style]

	return (
		<Link
			href="/"
			className={cn('logo text-foreground inline-block font-bold', className)}
		>
			{logo ? (
				<Img
					image={logo}
					width={100}
					className="inline-block h-full w-auto object-contain"
					alt={site?.title ?? ''}
				/>
			) : (
				site?.title
			)}
		</Link>
	)
}
