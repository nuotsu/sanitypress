import type {
	StructureBuilder,
	ListItemBuilder,
	ListItem,
	Divider,
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

export const directory = (
	S: StructureBuilder,
	path: string,
	{ maxLevel }: { maxLevel?: number } = {},
) =>
	S.listItem()
		.title(`/${path}`)
		.schemaType('page')
		.child(
			S.documentList()
				.id(`page.${path.replaceAll('/', '-')}`)
				.filter(
					`
						string::startsWith(metadata.slug.current, $path)
						${maxLevel !== undefined ? `&& count(string::split(metadata.slug.current, '/')) <= ${maxLevel + 1}` : ''}
					`,
				)
				.params({ path: path + '/' }),
		)
