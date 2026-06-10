<script lang="ts">
	import { page } from '$app/state'
	import { resolve } from '$app/paths'
</script>

<section class="error">
	<div class="terminal">
		<div class="line">&gt; cd {page.url.pathname}</div>
		<div class="line error-line">
			bash: {page.status}: {page.error?.message ?? 'Not Found'}
		</div>
		<div class="line">
			&gt; <a href={resolve('/')} class="home-link">cd ~</a><span class="cursor">_</span>
		</div>
	</div>
</section>

<style>
	.error {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5rem 1rem;
		background: linear-gradient(135deg, #050812 0%, #0a0e27 50%, #050812 100%);
	}

	.terminal {
		width: min(100%, 32rem);
		border: 1px solid var(--terminal-green);
		border-radius: 0.5rem;
		padding: 1.5rem;
		background: rgba(10, 14, 39, 0.8);
		box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
	}

	.line {
		margin-bottom: 0.75rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-size: 0.875rem;
		color: var(--terminal-green);
	}

	.line:last-child {
		margin-bottom: 0;
	}

	.error-line {
		opacity: 0.85;
	}

	.home-link {
		color: var(--terminal-green);
		text-decoration: underline;
	}

	.home-link:hover {
		text-shadow: 0 0 10px var(--terminal-green);
	}

	.cursor {
		animation: blink 1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
