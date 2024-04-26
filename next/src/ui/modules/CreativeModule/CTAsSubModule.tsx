import CTAList from '@/ui/CTAList'

export type CTAsSubModuleType = Sanity.Module<'ctas'> &
	Partial<{
		ctas: Sanity.CTA[]
	}>

export default function CTAsSubModule({
	module,
}: {
	module: CTAsSubModuleType
}) {
	return <CTAList ctas={module.ctas} />
}
