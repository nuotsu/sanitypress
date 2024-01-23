import BlogRollup from './blog/Rollup'
import HeroCentered from './HeroCentered'
import HeroPostcard from './HeroPostcard'

export default function Modules({ modules }: Props) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'blog-rollup':
						return <BlogRollup {...module} key={module._key} />
					case 'hero.centered':
						return <HeroCentered {...module} key={module._key} />
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
