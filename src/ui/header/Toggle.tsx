export default function Toggle() {
	return (
		<label className="[grid-area:toggle] md:hidden">
			<input id="header-toggle" type="checkbox" hidden />

			<span className="header-open:hidden">Open</span>
			<span className="header-closed:hidden">Close</span>
		</label>
	)
}
