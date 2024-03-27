import Header from '@/ui/header'
import Footer from '@/ui/footer'
// import { GoogleTagManager } from '@next/third-parties/google'
import '@/styles/app.css'

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
			{/* <GoogleTagManager gtmId='' /> */}
		</html>
	)
}
