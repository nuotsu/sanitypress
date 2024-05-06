import BlogRollup from './blog/Rollup'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FAQList from './FAQList'
import Hero from './Hero'
import HeroPostcard from './HeroPostcard'
import LogoList from './LogoList'
import RichtextModule from './RichtextModule'
import StatList from './StatList'
import TestimonialList from './TestimonialList'

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
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.postcard':
						return <HeroPostcard {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />
					case 'stat-list':
						return <StatList {...module} key={module._key} />
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />

					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
