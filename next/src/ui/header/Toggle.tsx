export default function Toggle() {
	return (
		<label className="[grid-area:toggle] md:hidden">
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">Open</span>
			<span className="header-closed:block hidden">Close</span>
		</label>
	)
}
