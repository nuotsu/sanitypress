# Next.js + Sanity + Template

> A Next.js (App router), Sanity.io and Tailwind CSS starter template.

## Initialize a Sanity project and grab the project ID

1. `next/.env.local`
	- Also retrieve a [token from Sanity](https://sanity.io/manage) to allow for live previewing in dev mode.
2. `sanity/sanity.cli.ts`
3. `sanity/sanity.config.ts`

## Your Sanity Schema Types

Sanity schema are stored in `next/src/types/Sanity.d.ts` and can be accessed anywhere in the `next/` directory (import unncecessary) with `Sanity.*`.


## Images (`<Img>`)

In Next.js, serve images from Sanity using the custom `<Img>` component. This component is a wrapper around the [next/image](https://nextjs.org/docs/api-reference/next/image) component. It will automatically generate a `srcset` and `sizes` attribute for the image, and will also lazy load the image.

Utilize the `options.imageBuilder` prop to serve the appropriate size of the image based on the width. Typically, you want to set the width (or height) to 2x the actual size displayed in the viewport.

```jsx
import Img from '@/components/Img'

function Component({ image }) {
	return (
		<Img
			image={image}
			alt="..."
			options={{
				imageBuilder: b => b.width(200),	// for a 100px wide image
			}}
		/>
	)
}
```

## Resources

- [Official Next.js + Sanity setup documentation article](https://www.sanity.io/plugins/next-sanity)
