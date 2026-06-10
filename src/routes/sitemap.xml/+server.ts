import type { RequestHandler } from './$types'

export const prerender = true

const SITE = 'https://nathanmundo.com'

const pages = ['/', '/projects']

export const GET: RequestHandler = () => {
	const urls = pages
		.map((path) => `\t<url>\n\t\t<loc>${SITE}${path === '/' ? '' : path}</loc>\n\t</url>`)
		.join('\n')

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	})
}
