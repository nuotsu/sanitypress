import { Geist } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { preconnect } from 'react-dom'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import VisualEditing from '@/ui/visual-editing'
import '@/app.css'

const fontSans = Geist({
	subsets: ['latin'],
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://cdn.sanity.io')

	return (
		<html lang="en" data-scroll-behavior="smooth">
			<NuqsAdapter>
				<body className="bg-background text-foreground antialiased">
					<Header />
					<main>{children}</main>
					<Footer />

					<VisualEditing />
				</body>
			</NuqsAdapter>
		</html>
	)
}
