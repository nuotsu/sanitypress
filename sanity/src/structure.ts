import { list, singleton } from './utils'
import type { StructureResolver } from 'sanity/structure'

import { VscEdit, VscServerProcess, VscTag } from 'react-icons/vsc'
import { PiFlowArrow } from 'react-icons/pi'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([
			singleton(S, 'Site', 'site').icon(VscServerProcess),
			list(S, 'Pages', 'page'),
			list(S, 'Redirects', 'redirect').icon(PiFlowArrow),
			S.divider(),

			list(S, 'Blog posts', 'blog.post').icon(VscEdit),
			list(S, 'Blog categories', 'blog.category').icon(VscTag),
		])

export default structure
