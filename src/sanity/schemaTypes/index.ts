import { type SchemaTypeDefinition } from 'sanity'

// documents
import site from './documents/site'
import page from './documents/page'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
import navigation from './documents/navigation'
import announcement from './documents/announcement'
import redirect from './documents/redirect'
import logo from './documents/logo'
import person from './documents/person'
import pricing from './documents/pricing'
import reputation from './documents/reputation'
import testimonial from './documents/testimonial'

// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleOptions from './objects/module-options'

// modules
import accordionList from './modules/accordion-list'
import blogFrontpage from './modules/blog-frontpage'
import blogList from './modules/blog-list'
import blogPostContent from './modules/blog-post-content'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import cardList from './modules/card-list'
import creativeModule from './modules/creative'
import customHtml from './modules/custom-html'
import flagList from './modules/flag-list'
import hero from './modules/hero'
import heroSaas from './modules/hero.saas'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import pricingList from './modules/pricing-list'
import richtextModule from './modules/richtext-module'
import scheduleModule from './modules/schedule-module'
import searchModule from './modules/search-module'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
import tabbedContent from './modules/tabbed-content'
import testimonialFeatured from './modules/testimonial.featured'
import testimonialList from './modules/testimonial-list'

export const schemaTypes: SchemaTypeDefinition[] = [
	// documents
	site,
	page,
	blogPost,
	blogCategory,
	navigation,
	announcement,
	redirect,
	logo,
	person,
	pricing,
	reputation,
	testimonial,

	// objects
	cta,
	link,
	linkList,
	metadata,
	moduleOptions,
	// modules
	accordionList,
	blogFrontpage,
	blogList,
	blogPostContent,
	breadcrumbs,
	callout,
	cardList,
	creativeModule,
	customHtml,
	flagList,
	hero,
	heroSaas,
	heroSplit,
	logoList,
	pricingList,
	richtextModule,
	scheduleModule,
	searchModule,
	statList,
	stepList,
	tabbedContent,
	testimonialFeatured,
	testimonialList,
]
