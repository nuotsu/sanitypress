import type { Get } from '@sanity/codegen'
import { createDataAttribute, stegaClean } from 'next-sanity'
import { Fragment } from 'react'
import { ROUTES } from '@/lib/env'
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
import ImageGallery from '@/modules/image-gallery'
import LogoList from '@/modules/logo-list'
import OptimisticModules from '@/modules/optimistic-modules'
import PersonList from '@/modules/person-list'
import Prose from '@/modules/prose'
import QuoteList from '@/modules/quote-list'
import SchemaMarkup from '@/modules/schema-markup'
import SearchModule from '@/modules/search-module'
import StatList from '@/modules/stat-list'
import StepList from '@/modules/step-list'
import TabbedContent from '@/modules/tabbed-content'
import { dataset, projectId } from '@/sanity/env'
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
	'image-gallery': ImageGallery,
	'logo-list': LogoList,
	'person-list': PersonList,
	prose: Prose,
	'quote-list': QuoteList,
	'schema-markup': SchemaMarkup,
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

	const render = (module: ModuleProps, dataSanity?: string) => {
		const Component = MODULES_MAP[
			module._type as keyof typeof MODULES_MAP
		] as React.ComponentType<Record<string, unknown>>

		if (!Component) return null

		const { _source, ...rest } = module

		return (
			<Component
				{...rest}
				{...moduleSpecificProps(module)}
				data-sanity={dataSanity}
			/>
		)
	}

	// Published / non-Visual-Editing: plain server render, no `data-sanity`
	if (!stega) {
		return (
			<>
				{modules.map((module, i) =>
					module ? (
						<Fragment key={`${module._key}-${i}`}>{render(module)}</Fragment>
					) : null,
				)}
			</>
		)
	}

	// Visual Editing: group consecutive modules by their source document + array
	// so each group can be reordered optimistically on drag-and-drop
	const groups: { source?: ModuleSource; modules: ModuleProps[] }[] = []
	for (const module of modules) {
		if (!module) continue
		const source = module._source && stegaClean(module._source)
		const last = groups.at(-1)
		if (
			source &&
			last?.source?.id === source.id &&
			last.source.field === source.field
		) {
			last.modules.push(module)
		} else {
			groups.push({ source, modules: [module] })
		}
	}

	return (
		<>
			{groups.map(({ source, modules }, i) =>
				source ? (
					<OptimisticModules
						key={`${source.id}.${source.field}`}
						id={source.id}
						field={source.field}
						keys={modules.map((module) => module._key!)}
						modules={Object.fromEntries(
							modules.map((module) => [
								module._key!,
								render(
									module,
									createDataAttribute({
										projectId,
										dataset,
										baseUrl: `/${ROUTES.studio}`,
										id: source.id,
										type: source.type,
										path: `${source.field}[_key=="${module._key}"]`,
									}).toString(),
								),
							]),
						)}
					/>
				) : (
					<Fragment key={`${modules[0]._key}-${i}`}>
						{render(modules[0])}
					</Fragment>
				),
			)}
		</>
	)
}

type ModuleSource = NonNullable<ModuleProps['_source']>

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
}: Omit<ModuleProps, '_type' | '_key'> &
	React.HTMLAttributes<HTMLElement> & {
		as?: React.ElementType
		_type?: string
		_key?: string
	}) {
	const id = stegaClean(attributes?.uid) || `module-${_key}`
	const css = stegaClean(attributes?.scopedCss?.code)

	return (
		<As id={id} data-module={_type} hidden={attributes?.hidden} {...props}>
			{css && <style>{`@scope{${css}}`}</style>}
			{children}
		</As>
	)
}
