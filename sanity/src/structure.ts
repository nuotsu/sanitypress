import { list } from './utils'
import type { StructureResolver } from 'sanity/desk'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([list(S, 'Pages', 'page')])

export default structure
