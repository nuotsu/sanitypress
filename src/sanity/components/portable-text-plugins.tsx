import type { PortableTextPluginsProps } from 'sanity'
import {
	BlockInsertPicker,
	MarkdownInputRules,
	wellKnownInputRules,
} from '@sanity/block-insert-picker'

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
