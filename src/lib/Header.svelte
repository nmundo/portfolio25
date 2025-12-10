<script lang="ts">
	import { fade } from 'svelte/transition'
	import { page } from '$app/state'
	import { resolve } from '$app/paths'

	interface NavLink {
		href: string
		label: string
		cmd: string
	}

	const links: NavLink[] = [
		{ href: 'https://linkedin.com/in/nmundo', label: 'LinkedIn', cmd: '[ linkedin ]' },
		{ href: 'https://github.com/nmundo', label: 'GitHub', cmd: '[ github ]' }
	]
</script>

<div in:fade={{ duration: 800, delay: 800 }}>
	<div class="nav">
		{#if page.url.pathname === resolve('/')}
			<a href={resolve('/projects')} class="button"> [ projects ] </a>
		{:else}
			<a href={resolve('/')} class="button"> [ home ] </a>
		{/if}
	</div>
	<div class="nav social">
		{#each links as link (link.label)}
			<a
				in:fade={{ duration: 800, delay: 300 }}
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="button"
			>
				{link.cmd}
			</a>
		{/each}
	</div>
</div>

<style>
	.nav {
		position: fixed;
		top: 1.5rem;
		left: 1.5rem;
		z-index: 20;
		&.social {
			left: auto;
			right: 1.5rem;
			display: flex;
			gap: 1rem;
		}
	}

	.button {
		display: inline-block;
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-weight: bold;
		font-size: 0.6rem;
		color: var(--terminal-green);
		border: 2px solid var(--terminal-green);
		background: rgba(10, 14, 39, 0.6);
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
		@media (min-width: 768px) {
			font-size: 0.875rem;
		}
		&:hover {
			background: rgba(0, 255, 0, 0.1);
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}
	}
</style>
