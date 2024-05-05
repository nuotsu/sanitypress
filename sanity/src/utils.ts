import type {
	Divider,
	ListItem,
	ListItemBuilder,
	StructureBuilder,
} from 'sanity/structure'

export const singleton = (
	S: StructureBuilder,
	title: string,
	id: string,
): ListItemBuilder =>
	S.listItem()
		.title(title)
		.id(id)
		.child(S.document().schemaType(id).documentId(id))

export const group = (
	S: StructureBuilder,
	title: string,
	items: (ListItemBuilder | ListItem | Divider)[],
): ListItemBuilder =>
	S.listItem().title(title).child(S.list().title(title).items(items))

/**
 * Return the text of a block type as a single string. Use in schema previews.
 */
export function getBlockText(
	block?: {
		children?: {
			text: string
		}[]
	}[],
	lineBreakChar: string = '↵ ',
) {
	return (
		block?.reduce((a, c, i) => {
			const text = c.children?.flatMap((c) => c.text).join('') || ''
			return a + text + (i !== block.length - 1 ? lineBreakChar : '')
		}, '') || ''
	)
}

export function count(arr: Array<any>, singular: string, plural?: string) {
	return `${arr?.length || 0} ${arr?.length === 1 ? singular : plural || singular + 's'}`
}
