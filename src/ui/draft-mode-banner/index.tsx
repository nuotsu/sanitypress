import { VscChevronDown } from 'react-icons/vsc'
import { ROUTES } from '@/lib/env'
import HoverDetails from '@/ui/details/hover-details'

export default function DraftModeBanner() {
	return (
		<HoverDetails className="accordion fixed right-0 bottom-0 bg-amber-200/60 backdrop-blur-xs">
			<summary className="px-4 py-2">
				🚧 Draft mode
				<VscChevronDown />
			</summary>

			<menu className="p-4 pt-0">
				<li>
					<a href="/api/draft-mode/disable" className="link">
						Exit draft mode
					</a>
				</li>
				<li>
					<a href={`/${ROUTES.studio}`} className="link">
						Open the Studio
					</a>
				</li>
			</menu>
		</HoverDetails>
	)
}
