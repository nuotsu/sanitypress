import { getSite } from '@/sanity/lib/queries'
import CTA from './CTA'
import { cn } from '@/lib/utils'
import {
	FaBluesky,
	FaFacebookF,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6'
import { IoIosLink } from 'react-icons/io'
import type { ComponentProps } from 'react'

export default async function Social({ className }: ComponentProps<'div'>) {
	const { social } = await getSite()

	if (!social?.items?.length) return null

	return (
		<nav className={cn('group flex flex-wrap items-center', className)}>
			{social.items.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="px-2 py-1 group-has-[a:hover]:opacity-50 hover:!opacity-100"
								link={item}
								key={key}
							>
								<Icon url={item.external} aria-label={item.label} />
							</CTA>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}

function Icon({
	url,
	...props
}: { url?: string } & React.ComponentProps<'svg'>) {
	if (!url) return null

	return url?.includes('bsky.app') ? (
		<FaBluesky {...props} />
	) : url?.includes('facebook.com') ? (
		<FaFacebookF {...props} />
	) : url?.includes('github.com') ? (
		<FaGithub {...props} />
	) : url?.includes('instagram.com') ? (
		<FaInstagram {...props} />
	) : url?.includes('linkedin.com') ? (
		<FaLinkedinIn {...props} />
	) : url?.includes('tiktok.com') ? (
		<FaTiktok {...props} />
	) : url?.includes('twitter.com') || url?.includes('x.com') ? (
		<FaXTwitter {...props} />
	) : url?.includes('youtube.com') ? (
		<FaYoutube {...props} />
	) : (
		<IoIosLink {...props} />
	)
}
