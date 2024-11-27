import Scheduler from '@/ui/Scheduler'
import Modules from '.'

export default function ScheduleModule({
	start,
	end,
	modules,
}: Partial<{
	start: string
	end: string
	modules: Sanity.Module[]
}>) {
	return (
		<Scheduler start={start} end={end}>
			<Modules modules={modules} />
		</Scheduler>
	)
}
