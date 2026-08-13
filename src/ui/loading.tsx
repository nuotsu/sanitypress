import { VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function ({
	className,
	children,
}: React.ComponentProps<'aside'>) {
	return (
		<aside
			className={cn(
				'gap-ch loading flex items-center justify-center text-current/50',
				className,
			)}
			role="status"
		>
			<VscLoading className="animate-spin" />
			{children || 'Loading...'}
		</aside>
	)
}
