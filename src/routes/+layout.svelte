<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/Header.svelte'
	import { onNavigate } from '$app/navigation'

	let { children } = $props()

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
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	<Header />
	{@render children()}
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
</style>
