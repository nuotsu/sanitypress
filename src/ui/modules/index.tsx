import type { Get } from '@sanity/codegen'
import { stegaClean } from 'next-sanity'
import type {
	BLOG_POST_QUERY_RESULT,
	ModuleAttributes,
	PAGE_QUERY_RESULT,
} from '@/sanity/types'
import AccordionList from './accordion-list'
import BlogIndex from './blog/blog-index'
import BlogPostContent from './blog/blog-post-content'
import BlogPostList from './blog/blog-post-list'
import Breadcrumbs from './breadcrumbs'
import Callout from './callout'
import CardList from './card-list'
import CustomHTML from './custom-html'
import FormModule from './form-module'
import HeroSplit from './hero.split'
import LogoList from './logo-list'
import PersonList from './person-list'
import Prose from './prose'
import QuoteList from './quote-list'
import SearchModule from './search'
import StatList from './stat-list'
import StepList from './step-list'

const MODULES_MAP = {
	'accordion-list': AccordionList,
	'blog-index': BlogIndex,
	'blog-post-content': BlogPostContent,
	'blog-post-list': BlogPostList,
	breadcrumbs: Breadcrumbs,
	callout: Callout,
	'card-list': CardList,
	'custom-html': CustomHTML,
	'form-module': FormModule,
	'hero.split': HeroSplit,
	'logo-list': LogoList,
	'person-list': PersonList,
	prose: Prose,
	'quote-list': QuoteList,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
} as const

export default function ({
	page,
	post,
}: {
	page?: PAGE_QUERY_RESULT
	post?: BLOG_POST_QUERY_RESULT
}) {
	const modules = [page, post].flatMap((item) => item?.modules ?? [])

	const moduleSpecificProps = (module: ModuleProps) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'breadcrumbs':
				return { currentPage: page || post }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module) => {
				if (!module) return null

				const Component = MODULES_MAP[
					module._type as keyof typeof MODULES_MAP
				] as React.ComponentType

				if (!Component) return null

				return (
					<Component
						{...module}
						{...moduleSpecificProps(module)}
						key={module._key}
					/>
				)
			})}
		</>
	)
}

export type ModuleProps = Partial<
	Get<PAGE_QUERY_RESULT | BLOG_POST_QUERY_RESULT, 'modules', 0>
> & { attributes?: ModuleAttributes }

export function Module({
	as: As = 'section',
	_key,
	_type,
	attributes,
	children,
	...props
}: ModuleProps &
	React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
	const id = stegaClean(attributes?.uid) || `module-${_key}`
	const css = stegaClean(attributes?.scopedCss?.code)

	return (
		<As id={id} data-module={_type} hidden={attributes?.hidden} {...props}>
			{children}
			{css && <style>{`@scope{${css}}`}</style>}
		</As>
	)
}
