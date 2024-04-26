// documents
import site from './documents/site'
import navigation from './documents/navigation'
import page from './documents/page'
import redirect from './documents/redirect'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'

// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'

// modules
import blogRollup from './modules/blog-rollup'
import creativeModule from './modules/creative-module'
import customHtml from './modules/custom-html'
import faqList from './modules/faq-list'
import heroCentered from './modules/hero.centered'
import heroPostcard from './modules/hero.postcard'

export const schemaTypes = [
	// documents
	site,
	navigation,
	page,
	redirect,
	blogPost,
	blogCategory,

	// objects
	cta,
	link,
	linkList,
	metadata,

	// modules
	blogRollup,
	creativeModule,
	customHtml,
	faqList,
	heroCentered,
	heroPostcard,
]
