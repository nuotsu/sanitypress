import type { Get } from '@sanity/codegen'
import { stegaClean } from 'next-sanity'
import AccordionList from '@/modules/accordion-list'
import BlogIndex from '@/modules/blog-index'
import BlogPostContent from '@/modules/blog-post-content'
import BlogPostList from '@/modules/blog-post-list'
import Breadcrumbs from '@/modules/breadcrumbs'
import Callout from '@/modules/callout'
import CardList from '@/modules/card-list'
import CustomHTML from '@/modules/custom-html'
import FormModule from '@/modules/form-module'
import HeroCover from '@/modules/hero.cover'
import HeroSplit from '@/modules/hero.split'
import LogoList from '@/modules/logo-list'
import PersonList from '@/modules/person-list'
import Prose from '@/modules/prose'
import QuoteList from '@/modules/quote-list'
import SearchModule from '@/modules/search-module'
import StatList from '@/modules/stat-list'
import StepList from '@/modules/step-list'
import TabbedContent from '@/modules/tabbed-content'
import type { DynamicFetchOptions } from '@/sanity/lib/live'
import type {
	BLOG_POST_QUERY_RESULT,
	ModuleAttributes,
	PAGE_QUERY_RESULT,
} from '@/sanity/types'

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
	'hero.cover': HeroCover,
	'hero.split': HeroSplit,
	'logo-list': LogoList,
	'person-list': PersonList,
	prose: Prose,
	'quote-list': QuoteList,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
	'tabbed-content': TabbedContent,
} as const

export default function ({
	page,
	post,
	perspective,
	stega,
}: {
	page?: PAGE_QUERY_RESULT
	post?: BLOG_POST_QUERY_RESULT
} & Partial<DynamicFetchOptions>) {
	const modules = [page, post].flatMap((item) => item?.modules ?? [])

	const moduleSpecificProps = (module: ModuleProps) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'breadcrumbs':
				return { currentPage: page || post }
			case 'blog-index':
			case 'blog-post-list':
				return { perspective, stega }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module, i) => {
				if (!module) return null

				const Component = MODULES_MAP[
					module._type as keyof typeof MODULES_MAP
				] as React.ComponentType

				if (!Component) return null

				return (
					<Component
						{...module}
						{...moduleSpecificProps(module)}
						key={`${module._key}-${i}`}
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
