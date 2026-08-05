import { PortableText, type PortableTextTypeComponentProps } from 'next-sanity'
import type { Table } from '@/sanity/types'

export default function ({ value }: PortableTextTypeComponentProps<Table>) {
	const rows = value.rows ?? []
	if (!rows.length) return null

	const headerCount = Math.max(0, Math.min(value.headerRows ?? 0, rows.length))
	const headerRows = rows.slice(0, headerCount)
	const bodyRows = rows.slice(headerCount)

	return (
		<table>
			{headerRows.length > 0 && (
				<thead>
					{headerRows.map((row) => (
						<tr key={row._key}>
							{row.cells?.map((cell) => (
								<th key={cell._key}>
									<PortableText value={cell.value ?? []} />
								</th>
							))}
						</tr>
					))}
				</thead>
			)}
			{bodyRows.length > 0 && (
				<tbody>
					{bodyRows.map((row) => (
						<tr key={row._key}>
							{row.cells?.map((cell) => (
								<td key={cell._key}>
									<PortableText value={cell.value ?? []} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			)}
		</table>
	)
}
