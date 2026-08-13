import { VscChromeClose, VscMenu } from 'react-icons/vsc'

export default function () {
	return (
		<label className="has-focus-visible:focus-ring text-xl md:hidden">
			<input
				id="header-open"
				type="checkbox"
				className="sr-only"
				aria-controls="mobile-menu"
			/>

			<span className="header-open:hidden sr-only">Open menu</span>
			<span className="header-not-open:hidden sr-only">Close menu</span>

			<VscMenu className="header-open:hidden" aria-hidden />
			<VscChromeClose className="header-not-open:hidden" aria-hidden />
		</label>
	)
}
