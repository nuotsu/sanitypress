export default function SkipToContent() {
	return (
		<a
			href="#main-content"
			className="absolute left-0 top-0 z-20 -translate-x-full bg-canvas text-ink focus:translate-x-0"
			tabIndex={0}
		>
			Skip to content
		</a>
	)
}
