import { getSite } from '@/lib/sanity'
import Social from '../Social'

export default async function Footer() {
	const { title, footerMenu } = await getSite()

	return (
		<footer className="bg-black p-4 text-center text-white">
			<div className="mx-auto max-w-screen-xl space-y-4">
				<Social className="justify-center" />

				<p className="text-sm">
					&copy; {new Date().getFullYear()} {title}
				</p>
			</div>
		</footer>
	)
}
