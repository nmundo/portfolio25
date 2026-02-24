<script lang="ts">
	import { fade } from 'svelte/transition'
	import { page } from '$app/state'
	import { resolve } from '$app/paths'

	interface NavLink {
		href: string
		label: string
		cmd: string
	}

	let dropdownOpen = $state(false)

	const links: NavLink[] = [
		{ href: 'https://linkedin.com/in/nmundo', label: 'LinkedIn', cmd: '[ linkedin ]' },
		{ href: 'https://github.com/nmundo', label: 'GitHub', cmd: '[ github ]' },
		{
			href: 'https://drive.google.com/file/d/1uGu68A4bDLXJCe261G5vPiDWWmJ7gvTf/view?usp=sharing',
			label: 'Resume',
			cmd: '[ resume ]'
		}
	]

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen
	}

	function closeDropdown() {
		dropdownOpen = false
	}
</script>

<div id="header" in:fade={{ duration: 800, delay: 800 }}>
	<div class="nav">
		{#if page.url.pathname === resolve('/')}
			<a href={resolve('/projects')} class="button"> [ projects ] </a>
		{:else}
			<a href={resolve('/')} class="button"> [ home ] </a>
		{/if}
	</div>
	<div class="nav social">
		<!-- Desktop view: flex layout of links -->
		<div class="desktop-links">
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

		<!-- Mobile view: dropdown toggle -->
		<button class="dropdown-toggle" onclick={toggleDropdown} aria-label="Toggle menu">
			[ menu ]
		</button>

		<!-- Mobile dropdown menu -->
		{#if dropdownOpen}
			<div class="dropdown-menu" in:fade={{ duration: 200 }}>
				{#each links as link (link.label)}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="dropdown-link"
						onclick={closeDropdown}
					>
						{link.cmd}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	#header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
		z-index: 10;
		view-transition-name: header;
	}
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
			flex-direction: column;
			align-items: flex-end;
		}
	}

	.desktop-links {
		display: flex;
		gap: 1rem;
		@media (max-width: 767px) {
			display: none;
		}
	}

	.dropdown-toggle {
		display: none;
		@media (max-width: 767px) {
			display: inline-block;
		}
	}

	.dropdown-menu {
		position: absolute;
		top: 3rem;
		right: 0;
		background: rgba(10, 14, 39, 0.95);
		border: 2px solid var(--terminal-green);
		border-radius: 0.5rem;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 150px;
		box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
		@media (min-width: 768px) {
			display: none;
		}
	}

	.dropdown-link {
		display: block;
		padding: 0.5rem 1rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-weight: bold;
		font-size: 0.6rem;
		color: var(--terminal-green);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
		border-radius: 0.25rem;
		text-align: right;

		&:hover {
			background: rgba(0, 255, 0, 0.1);
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
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

	.dropdown-toggle {
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

		&:hover {
			background: rgba(0, 255, 0, 0.1);
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}
	}
</style>
