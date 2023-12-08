import type {
	Divider,
	ListItem,
	ListItemBuilder,
	StructureBuilder,
	View,
	ViewBuilder,
} from 'sanity/desk'

export const singleton = (
	S: StructureBuilder,
	title: string,
	id: string,
	views: Array<View | ViewBuilder> = [],
): ListItemBuilder =>
	S.listItem()
		.title(title)
		.id(id)
		.child(
			S.document()
				.schemaType(id)
				.documentId(id)
				.views([S.view.form(), ...views]),
		)

export const list = (
	S: StructureBuilder,
	title: string,
	id: string,
): ListItemBuilder =>
	S.listItem().title(title).child(S.documentTypeList(id).title(title))

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
) {
	return (
		block?.reduce((a, c) => {
			return a + (c.children?.flatMap((c) => c.text).join('') || '')
		}, '') || ''
	)
}
