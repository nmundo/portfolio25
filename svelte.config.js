import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		appDir: 'app'
		// Deployed to the root of the custom domain (nathanmundo.com via static/CNAME),
		// so no base path. A `/portfolio25` base would break enhanced-img srcset URLs,
		// which SvelteKit does not rewrite to relative paths.
		// prerender: {
		// 	crawl: true,
		// 	entries: ['*']
		// }
	}
}

export default config
