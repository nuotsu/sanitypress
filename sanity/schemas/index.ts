// documents
import site from './documents/site'
import page from './documents/page'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'

// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'

// modules
import heroCentered from './modules/hero.centered'
import heroPostcard from './modules/hero.postcard'
import blogRollup from './modules/blog-rollup'

export const schemaTypes = [
	// documents
	site,
	page,
	blogPost,
	blogCategory,

	// objects
	cta,
	link,
	linkList,
	metadata,

	// modules
	blogRollup,
	heroCentered,
	heroPostcard,
]
