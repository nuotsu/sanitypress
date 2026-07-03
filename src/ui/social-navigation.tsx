import {
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLink,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYelp,
	FaYoutube,
} from 'react-icons/fa6'
import { getSite } from '@/sanity/lib/queries'
import SanityLink, { type SanityLinkType } from './sanity-link'

export default async function (props: React.ComponentProps<'nav'>) {
	const site = await getSite()

	return (
		<nav {...props}>
			{site?.social?.items?.map((link, i) => {
				switch (link._type) {
					case 'link':
						const url = link.external

						return (
							<SanityLink
								link={link as SanityLinkType}
								className="text-current"
								aria-label={link.label || url}
								key={`${link._key}-${i}`}
							>
								{url?.includes('facebook.com') ? (
									<FaFacebook />
								) : url?.includes('github.com') ? (
									<FaGithub />
								) : url?.includes('instagram.com') ? (
									<FaInstagram />
								) : url?.includes('linkedin.com') ? (
									<FaLinkedinIn />
								) : url?.includes('tiktok.com') ? (
									<FaTiktok />
								) : url?.includes('twitter.com') || url?.includes('x.com') ? (
									<FaXTwitter />
								) : url?.includes('yelp.com') ? (
									<FaYelp />
								) : url?.includes('youtube.com') ? (
									<FaYoutube />
								) : (
									<FaLink />
								)}
							</SanityLink>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
