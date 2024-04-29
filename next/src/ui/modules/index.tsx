import BlogRollup from './blog/Rollup'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FAQList from './FAQList'
import HeroCentered from './HeroCentered'
import HeroPostcard from './HeroPostcard'
import RichtextModule from './RichtextModule'

export default function Modules({ modules }: { modules?: Sanity.Module[] }) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'blog-rollup':
						return <BlogRollup {...module} key={module._key} />
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />
					case 'faq-list':
						return <FAQList {...module} key={module._key} />
					case 'hero.centered':
						return <HeroCentered {...module} key={module._key} />
					case 'hero.postcard':
						return <HeroPostcard {...module} key={module._key} />
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />

					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
