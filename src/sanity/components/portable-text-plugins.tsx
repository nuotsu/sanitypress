import {
	BlockInsertPicker,
	MarkdownInputRules,
	wellKnownInputRules,
} from '@sanity/block-insert-picker'
import type { PortableTextPluginsProps } from 'sanity'

export default function PortableTextEditorPlugins(
	props: PortableTextPluginsProps,
) {
	return (
		<>
			{props.renderDefault({
				...props,
				plugins: {
					...props.plugins,
					table: {
						enabled: true,
					},
				},
			})}
			<MarkdownInputRules rules={[...wellKnownInputRules]} />
			<BlockInsertPicker />
		</>
	)
}
