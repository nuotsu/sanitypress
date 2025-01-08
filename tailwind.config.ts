import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

export default {
	content: ['./src/{app,ui}/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				ink: {
					DEFAULT: '#1a1f36',
					light: '#2d3748',
					dark: '#e2e8f0',
					'dark-light': '#cbd5e1',
				},
				canvas: {
					DEFAULT: '#ffffff',
					dark: '#0f172a',
				},
				accent: {
					DEFAULT: '#1c1c1c',
					hover: '#2563eb',
					dark: '#60a5fa',
					'dark-hover': '#93c5fd',
				},
			},
			maxHeight: {
				fold: 'calc(100svh - var(--header-height))',
			},
			fontFamily: {
				mono: ['var(--font-mono)'],
				sans: ['var(--font-sans)'],
				display: ['var(--font-display)'],
			},
		},
		lh: {
			DEFAULT: '1lh',
			2: '2lh',
			3: '3lh',
		},
	},
	plugins: [
		plugin(function ({
			addVariant,
			matchUtilities,
			theme,
		}: {
			addVariant: (name: string, definition: string) => void
			matchUtilities: any
			theme: (path: string) => any
		}) {
			addVariant('header-open', 'body:has(#header-open:checked) &')
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')

			matchUtilities(
				{
					skeleton: (value: string) => ({
						height: value,
						backgroundColor: theme('colors.neutral.50'),
					}),
				},
				{
					values: theme('lh'),
				},
			)
		}),
	],
	safelist: [{ pattern: /action.*/ }, 'ghost'],
} satisfies Config
