export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="https://fav.farm/🖤" />
			</head>
			<body style={{ margin: 0 }}>{children}</body>
		</html>
	)
}
