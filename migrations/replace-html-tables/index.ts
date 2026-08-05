import {at, defineMigration, set, type NodePatch} from 'sanity/migrate'

type SpanPart = {text: string; marks?: string[]}

function span(key: string, text: string, marks: string[] = []) {
	return {_type: 'span' as const, _key: key, text, marks}
}

function cell(key: string, parts: SpanPart[]) {
	const children = (parts.length ? parts : [{text: ''}]).map((part, index) =>
		span(`${key}-s${index}`, part.text, part.marks ?? []),
	)

	return {
		_type: 'cell' as const,
		_key: key,
		value: [
			{
				_type: 'block' as const,
				_key: `${key}-b`,
				style: 'normal' as const,
				markDefs: [],
				children,
			},
		],
	}
}

function textCell(key: string, text: string, marks: string[] = []) {
	return cell(key, [{text, marks}])
}

function row(key: string, cells: ReturnType<typeof cell>[]) {
	return {_type: 'row' as const, _key: key, cells}
}

function table(
	key: string,
	rows: ReturnType<typeof row>[],
	headerRows = 1,
) {
	return {
		_type: 'table' as const,
		_key: key,
		headerRows,
		rows,
	}
}

/** Getting Started — 6×5, all body cells are <td> */
const gettingStartedTable = table('4c372c37ddfc', [
	row('gs-r0', [
		textCell('gs-r0-c0', 'Document'),
		textCell('gs-r0-c1', 'Slug or Path'),
		textCell('gs-r0-c2', 'Usage'),
		textCell('gs-r0-c3', 'Required?'),
		textCell('gs-r0-c4', 'Notes'),
	]),
	row('gs-r1', [
		textCell('gs-r1-c0', 'site', ['code']),
		textCell('gs-r1-c1', ''),
		textCell('gs-r1-c2', 'Global settings'),
		textCell('gs-r1-c3', 'Yes'),
		textCell('gs-r1-c4', ''),
	]),
	row('gs-r2', [
		textCell('gs-r2-c0', 'page', ['code']),
		textCell('gs-r2-c1', 'index', ['code']),
		textCell('gs-r2-c2', 'Homepage route'),
		textCell('gs-r2-c3', 'Yes'),
		textCell('gs-r2-c4', ''),
	]),
	row('gs-r3', [
		textCell('gs-r3-c0', 'page', ['code']),
		textCell('gs-r3-c1', '404', ['code']),
		textCell('gs-r3-c2', 'Not found route'),
		textCell('gs-r3-c3', ''),
		textCell('gs-r3-c4', ''),
	]),
	row('gs-r4', [
		textCell('gs-r4-c0', 'page', ['code']),
		textCell('gs-r4-c1', 'blog', ['code']),
		textCell('gs-r4-c2', 'Blog index (homepage) route'),
		textCell('gs-r4-c3', ''),
		cell('gs-r4-c4', [
			{text: 'Add the '},
			{text: 'Blog index', marks: ['strong']},
			{text: ' module'},
		]),
	]),
	row('gs-r5', [
		textCell('gs-r5-c0', 'global-module', ['code']),
		textCell('gs-r5-c1', 'blog/', ['code']),
		textCell('gs-r5-c2', 'Blog post template'),
		textCell('gs-r5-c3', ''),
		cell('gs-r5-c4', [
			{text: 'Add the '},
			{text: 'Blog post content', marks: ['strong']},
			{text: ' module'},
		]),
	]),
])

/** Tech Specs — 4×3, body col-1 was <th> → strong; nested <code> kept */
const techSpecsTable = table('927b19194e05', [
	row('ts-r0', [
		textCell('ts-r0-c0', 'Tooling'),
		textCell('ts-r0-c1', 'Category'),
		textCell('ts-r0-c2', 'Info'),
	]),
	row('ts-r1', [
		cell('ts-r1-c0', [
			{text: 'Next.js ', marks: ['strong']},
			{text: 'v16.x', marks: ['strong', 'code']},
		]),
		textCell('ts-r1-c1', 'Frontend Framework'),
		textCell(
			'ts-r1-c2',
			'App Router, Server & Cache Components, TypeScript',
		),
	]),
	row('ts-r2', [
		cell('ts-r2-c0', [
			{text: 'Sanity ', marks: ['strong']},
			{text: 'v5.x', marks: ['strong', 'code']},
		]),
		textCell('ts-r2-c1', 'CMS'),
		cell('ts-r2-c2', [
			{text: 'Embedded Studio at '},
			{text: '/admin', marks: ['code']},
		]),
	]),
	row('ts-r3', [
		cell('ts-r3-c0', [
			{text: 'Tailwind ', marks: ['strong']},
			{text: 'v4.x', marks: ['strong', 'code']},
		]),
		textCell('ts-r3-c1', 'CSS Framework'),
		cell('ts-r3-c2', [
			{text: 'Config file at '},
			{text: 'src/app.css', marks: ['code']},
		]),
	]),
])

/** Shopify comparison — 11×3, body col-1 was <th> → strong; <i> → em */
const shopifyTable = table('acabd339d731', [
	row('sh-r0', [
		textCell('sh-r0-c0', 'Category'),
		textCell('sh-r0-c1', 'Shopify'),
		textCell('sh-r0-c2', 'Sanity + Next.js'),
	]),
	row('sh-r1', [
		textCell('sh-r1-c0', 'Primary Focus', ['strong']),
		textCell('sh-r1-c1', 'Ecommerce'),
		textCell('sh-r1-c2', 'Content & experience'),
	]),
	row('sh-r2', [
		textCell('sh-r2-c0', 'Ease of Setup', ['strong']),
		textCell('sh-r2-c1', 'Super quick'),
		textCell('sh-r2-c2', 'Needs developer setup'),
	]),
	row('sh-r3', [
		textCell('sh-r3-c0', 'Marketing Flexibility', ['strong']),
		textCell('sh-r3-c1', 'Limited by themes'),
		textCell('sh-r3-c2', 'Fully customizable'),
	]),
	row('sh-r4', [
		textCell('sh-r4-c0', 'CMS Experience', ['strong']),
		textCell('sh-r4-c1', 'Product/order-focused'),
		textCell('sh-r4-c2', 'Editor-friendly & scalable'),
	]),
	row('sh-r5', [
		textCell('sh-r5-c0', 'Design Freedom', ['strong']),
		textCell('sh-r5-c1', 'Theme-dependent'),
		textCell('sh-r5-c2', 'Unlimited with React'),
	]),
	row('sh-r6', [
		textCell('sh-r6-c0', 'Performance', ['strong']),
		textCell('sh-r6-c1', 'Depends on theme & apps'),
		textCell('sh-r6-c2', 'Full control with Next.js'),
	]),
	row('sh-r7', [
		textCell('sh-r7-c0', 'Blogging', ['strong']),
		textCell('sh-r7-c1', 'Basic'),
		textCell('sh-r7-c2', 'Flexible & scalable'),
	]),
	row('sh-r8', [
		textCell('sh-r8-c0', 'Developer Experience', ['strong']),
		textCell('sh-r8-c1', 'Liquid (can be quirky)'),
		textCell('sh-r8-c2', 'React (modern & familiar)'),
	]),
	row('sh-r9', [
		textCell('sh-r9-c0', 'AI Tooling', ['strong']),
		cell('sh-r9-c1', [
			{text: 'Sidekick', marks: ['em']},
			{text: ' (commerce-focused)'},
		]),
		cell('sh-r9-c2', [
			{text: 'AI Assist', marks: ['em']},
			{text: ' (content-focused)'},
		]),
	]),
	row('sh-r10', [
		textCell('sh-r10-c0', 'Pricing', ['strong']),
		textCell('sh-r10-c1', 'Shopify plan + apps + transaction fees'),
		textCell('sh-r10-c2', 'Sanity plan + hosting + dev'),
	]),
])

const TARGETS = [
	{
		documentId: '8f858023-1727-4cbd-857e-53b149a02d40',
		documentType: 'page',
		blockKey: '4c372c37ddfc',
		table: gettingStartedTable,
	},
	{
		documentId: '33f48b6a-74ff-457b-87a6-51f948822d57',
		documentType: 'page',
		blockKey: '927b19194e05',
		table: techSpecsTable,
	},
	{
		documentId: 'e3304b7e-e7e3-49d3-a0bb-3f6ee534ef37',
		documentType: 'blog.post',
		blockKey: 'acabd339d731',
		table: shopifyTable,
	},
] as const

type ProseModule = {
	_key?: string
	_type?: string
	content?: Array<{_key?: string; _type?: string}>
}

type PageDoc = {
	_id: string
	_type: 'page'
	modules?: ProseModule[]
}

type BlogDoc = {
	_id: string
	_type: 'blog.post'
	content?: Array<{_key?: string; _type?: string}>
}

function isCustomHtmlTable(
	block: {_key?: string; _type?: string} | undefined,
	blockKey: string,
) {
	return block?._key === blockKey && block._type === 'custom-html'
}

export default defineMigration({
	title: 'Replace HTML tables with native table blocks',
	documentTypes: ['page', 'blog.post'],
	migrate: {
		document(doc) {
			const patches: NodePatch[] = []
			const target = TARGETS.find((entry) => entry.documentId === doc._id)
			if (!target) return patches

			if (doc._type === 'blog.post') {
				const blog = doc as BlogDoc
				const block = blog.content?.find((item) => item._key === target.blockKey)
				if (isCustomHtmlTable(block, target.blockKey)) {
					patches.push(
						at(['content', {_key: target.blockKey}], set(target.table)),
					)
				}
				return patches
			}

			if (doc._type === 'page') {
				const page = doc as PageDoc
				for (const module of page.modules ?? []) {
					if (module._type !== 'prose' || !module._key) continue
					const block = module.content?.find(
						(item) => item._key === target.blockKey,
					)
					if (!isCustomHtmlTable(block, target.blockKey)) continue
					patches.push(
						at(
							[
								'modules',
								{_key: module._key},
								'content',
								{_key: target.blockKey},
							],
							set(target.table),
						),
					)
				}
			}

			return patches
		},
	},
})
