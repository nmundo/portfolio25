<script lang="ts">
	import { fade } from 'svelte/transition'
	import { page } from '$app/state'

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
	<div class="nav-fixed-left">
		{#if page.url.pathname === '/'}
			<a href="/projects" class="nav-button projects-nav"> [ projects ] </a>
		{:else}
			<a href="/" class="nav-button"> [ home ] </a>
		{/if}
	</div>
	<div class="nav-fixed-right">
		{#each links as link (link.label)}
			<a
				in:fade={{ duration: 800, delay: 300 }}
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="nav-button"
			>
				{link.cmd}
			</a>
		{/each}
	</div>
</div>

<style>
	/* Navigation */
	.nav-fixed-left {
		position: fixed;
		top: 1.5rem;
		left: 1.5rem;
		z-index: 20;
	}

	.nav-fixed-right {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		display: flex;
		gap: 1rem;
		z-index: 20;
	}

	.nav-button {
		display: inline-block;
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-weight: bold;
		font-size: 0.75rem;
		color: var(--terminal-green);
		border: 2px solid var(--terminal-green);
		background: rgba(10, 14, 39, 0.6);
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
	}

	@media (min-width: 768px) {
		.nav-button {
			font-size: 0.875rem;
		}
	}

	.nav-button:hover {
		background: rgba(0, 255, 0, 0.1);
		transform: scale(1.05);
	}

	.nav-button:active {
		transform: scale(0.95);
	}

	.nav-icon {
		transition: color 0.2s ease;
	}

	.nav-button:hover .nav-icon {
		color: #ffff00;
	}
</style>
