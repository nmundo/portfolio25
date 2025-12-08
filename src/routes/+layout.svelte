<script lang="ts">
	import { fade } from 'svelte/transition'
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/Header.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
	<Header />
	{@render children()}
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
	}

	:global(body) {
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
	}

	:global(a:hover) {
		filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.5));
	}

	:global(button:hover) {
		filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.3));
	}

	:global(.snap-section) {
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	:global(.content-container) {
		width: 100%;
		max-width: 48rem;
		margin-left: auto;
		margin-right: auto;
	}
</style>
