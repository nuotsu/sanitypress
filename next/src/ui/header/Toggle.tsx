export default function Toggle() {
	return (
		<label className="[grid-area:toggle] md:hidden">
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">Close</span>
			<span className="hidden header-closed:block">Open</span>
		</label>
	)
}
