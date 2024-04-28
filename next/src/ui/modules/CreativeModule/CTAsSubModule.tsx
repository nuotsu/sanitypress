import CTAList from '@/ui/CTAList'

export type CTAsSubModuleType = Sanity.Module<'ctas'> &
	Partial<{
		ctas: Sanity.CTA[]
	}>

export default function CTAsSubModule({
	module,
	...props
}: {
	module: CTAsSubModuleType
} & React.ComponentProps<typeof CTAList>) {
	return <CTAList ctas={module.ctas} {...props} />
}
