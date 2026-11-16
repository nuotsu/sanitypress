import { cn } from '@/lib/utils'
import ClickToCopy from '@/ui/click-to-copy'
import css from './code.module.css'

// Shared chrome for `code` and `code-group`; safe to render from server or client components

export function Filename({
	value,
	className,
	...props
}: { value?: string } & React.ComponentProps<'li'>) {
	if (!value) return null

	const [path, filename] = value.includes('/')
		? value.split(/(.*)\/(.*)$/).filter(Boolean)
		: [, value]

	return (
		<li className={cn('line-clamp-1 break-all', className)} {...props}>
			{path && <span className="text-background/50">{path}/</span>}
			<span>{filename}</span>
		</li>
	)
}

export function CopyButton({ value, dark }: { value?: string; dark: boolean }) {
	return (
		<li className="ml-auto shrink-0">
			<ClickToCopy
				value={value}
				className={cn(
					'p-2 text-lg transition-transform not-hover:opacity-50 active:scale-90 [&.copied]:opacity-100',
					dark && 'text-white',
				)}
			/>
		</li>
	)
}

export function Highlighted({
	html,
	className,
	...props
}: { html: string } & React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				css.code,
				'[--highlight-color:var(--color-green-400)] *:p-4',
				className,
			)}
			dangerouslySetInnerHTML={{ __html: html }}
			{...props}
		/>
	)
}

export const frameClassName = 'overflow-hidden'
export const menuClassName =
	'text-background gap-ch bg-foreground flex min-h-lh items-center border-b border-current/30 text-sm'
