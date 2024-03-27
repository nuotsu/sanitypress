import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function nl2br(str?: string) {
	if (!str) return ''
	return str.split('\n').join('<br>')
}
