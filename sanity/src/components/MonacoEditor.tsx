import { useState, type ComponentType } from 'react'
import {
	set,
	unset,
	type StringInputProps,
	type StringSchemaType,
} from 'sanity'
import { Card, Stack, TextInput } from '@sanity/ui'
import Editor from '@monaco-editor/react'

const MonacoEditor: ComponentType<StringInputProps<StringSchemaType>> = ({
	value,
	onChange,
}) => {
	const [language, setLanguage] = useState('html')

	return (
		<Stack space={2}>
			<TextInput
				defaultValue={language}
				onChange={(e) => setLanguage(e.currentTarget?.value)}
				placeholder="Language (e.g. html, css, typescript)"
			/>

			<Card border>
				<Editor
					height="20em"
					theme="vs-dark"
					defaultLanguage={language}
					defaultValue={value}
					options={{
						minimap: { enabled: false },
						lineNumbersMinChars: 3,
						renderWhitespace: 'all',
						tabSize: 2,
						stickyScroll: { enabled: true },
					}}
					onMount={(editor, monaco) => {
						monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
							{
								noSemanticValidation: true,
								noSyntaxValidation: true,
							},
						)
					}}
					onChange={(value) => {
						onChange(value ? set(value) : unset())
					}}
					key={language}
				/>
			</Card>
		</Stack>
	)
}

export default MonacoEditor
