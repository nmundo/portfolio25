<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/Header.svelte'
	import { onNavigate } from '$app/navigation'
	import { page } from '$app/state'

	let { children } = $props()

	const SITE = 'https://nathanmundo.com'

	const meta: Record<string, { title: string; description: string }> = {
		'/': {
			title: 'Nathan Mundo — Full Stack Engineer',
			description:
				'Nathan Mundo is a full stack engineer with 7+ years building responsive, user-focused web applications across fintech, e-commerce, and manufacturing.'
		},
		'/projects': {
			title: 'Projects — Nathan Mundo',
			description:
				'Selected projects by Nathan Mundo, including real-time Chicago transit trackers built with SvelteKit and TypeScript and a Playdate UI library.'
		}
	}

	const current = $derived(meta[page.route.id ?? '/'] ?? meta['/'])
	const canonical = $derived(SITE + (page.route.id && page.route.id !== '/' ? page.route.id : ''))
	const ogImage = `${SITE}/og-image.png`

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<title>{current.title}</title>
	<meta name="description" content={current.description} />
	<link rel="canonical" href={canonical} />
	<link rel="icon" href={favicon} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Nathan Mundo" />
	<meta property="og:title" content={current.title} />
	<meta property="og:description" content={current.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={current.title} />
	<meta name="twitter:description" content={current.description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>

<div>
	<Header />
	<main id="main-content">
		{@render children()}
	</main>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-bottom {
		from {
			transform: translateY(30px);
		}
	}

	@keyframes slide-to-top {
		to {
			transform: translateY(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) forwards fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-top;
	}

	:root::view-transition-new(root) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-bottom;
	}

	.skip-link {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		padding: 0.75rem 1rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-weight: bold;
		color: var(--terminal-green);
		background: rgba(5, 8, 18, 0.95);
		border: 1px solid var(--terminal-green);
		border-radius: 0 0 0.5rem 0;
		transform: translateY(-150%);
		transition: transform 0.2s ease;
	}

	.skip-link:focus {
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:root::view-transition-old(root),
		:root::view-transition-new(root) {
			animation: none;
		}

		.skip-link {
			transition: none;
		}
	}
</style>
