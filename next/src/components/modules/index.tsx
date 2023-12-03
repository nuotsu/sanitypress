import HeroPostcard from './HeroPostcard'

export default function Modules({ modules }: Props) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'hero.postcard':
						return <HeroPostcard {...module} key={module._key} />

					default:
						return <div data-type={module._type} />
				}
			})}
		</>
	)
}

type Props = {
	modules?: Sanity.Module[]
}
