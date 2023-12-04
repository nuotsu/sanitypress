import Header from '@/components/header'
import Footer from '@/components/footer'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Next.js + Sanity Template',
	description: '',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
