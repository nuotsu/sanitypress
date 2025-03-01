import type {
	Divider,
	ListItem,
	ListItemBuilder,
	StructureBuilder,
} from 'sanity/structure'

export const singleton = (
	S: StructureBuilder,
	id: string,
	title?: string,
): ListItemBuilder =>
	S.listItem()
		.id(id)
		.title(
			title ||
				id
					.split(/(?=[A-Z])/)
					.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(' '),
		)
		.child(S.editor().id(id).schemaType(id).documentId(id))

export const group = (
	S: StructureBuilder,
	title: string,
	items: (ListItemBuilder | ListItem | Divider)[],
): ListItemBuilder =>
	S.listItem().title(title).child(S.list().title(title).items(items))

/**
 * @example directory(S, 'docs/modules')
 */
export const directory = (S: StructureBuilder, path: string) =>
	S.listItem()
		.title(`/${path}`)
		.schemaType('page')
		.child(
			S.documentList()
				.id(`page.${path.replace(/\//, '-')}`)
				.filter(`string::startsWith(metadata.slug.current, '${path}/')`),
		)

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
