import BlogRollup from './blog/Rollup'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FAQList from './FAQList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import RichtextModule from './RichtextModule'
import StatList from './StatList'
import StepList from './StepList'
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
					case 'accordion-list':
						return <FAQList {...module} key={module._key} />
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.split':
						return <HeroSplit {...module} key={module._key} />
					case 'hero.saas':
						return <HeroSaaS {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />
					case 'stat-list':
						return <StatList {...module} key={module._key} />
					case 'step-list':
						return <StepList {...module} key={module._key} />
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />

					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
