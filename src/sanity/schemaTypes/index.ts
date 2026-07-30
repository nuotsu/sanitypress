import type { SchemaPluginOptions } from 'sanity'
// documents
import blogCategory from './documents/blog.category'
import blogPost from './documents/blog.post'
import form from './documents/form'
import globalModule from './documents/global-module'
import logo from './documents/logo'
import navigation from './documents/navigation'
import page from './documents/page'
import person from './documents/person'
import quote from './documents/quote'
import redirect from './documents/redirect'
import site from './documents/site'
import skill from './documents/skill'
// modules
import accordionList from '@/modules/accordion-list/schema'
import blogIndex from '@/modules/blog-index/schema'
import blogPostContent from '@/modules/blog-post-content/schema'
import blogPostList from '@/modules/blog-post-list/schema'
import breadcrumbs from '@/modules/breadcrumbs/schema'
import callout from '@/modules/callout/schema'
import cardList from '@/modules/card-list/schema'
import customHtml from '@/modules/custom-html/schema'
import formModule from '@/modules/form-module/schema'
import heroCover from '@/modules/hero.cover/schema'
import heroSplit from '@/modules/hero.split/schema'
import logoList from '@/modules/logo-list/schema'
import personList from '@/modules/person-list/schema'
import prose from '@/modules/prose/schema'
import quoteList from '@/modules/quote-list/schema'
import searchModule from '@/modules/search-module/schema'
import statList from '@/modules/stat-list/schema'
import stepList from '@/modules/step-list/schema'
import tabbedContent from '@/modules/tabbed-content/schema'
// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import megamenu from './objects/megamenu'
import metadata from './objects/metadata'
import moduleAttributes from './objects/module-attributes'
import sidebar from './objects/sidebar'

export const schema: SchemaPluginOptions = {
	types: [
		// documents
		site,
		skill,
		page,
		globalModule,
		blogPost,
		redirect,
		form,
		// references
		blogCategory,
		logo,
		navigation,
		person,
		quote,

		// objects
		cta,
		link,
		linkList,
		megamenu,
		metadata,
		moduleAttributes,
		sidebar,

		// modules
		accordionList,
		blogIndex,
		blogPostContent,
		blogPostList,
		breadcrumbs,
		callout,
		cardList,
		customHtml,
		formModule,
		heroCover,
		heroSplit,
		logoList,
		personList,
		prose,
		quoteList,
		searchModule,
		statList,
		stepList,
		tabbedContent,
	],

	templates: (templates) =>
		templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
}

const singletonTypes = ['site']
