<script lang="ts">
	import { resolve } from '$app/paths'
	const { images } = $props()

	let currentImage = $state(0)
	function next() {
		const project = projects.find((p) => p.id === projectId)
		if (project) {
			const current = currentScreenshot[projectId] ?? 0
			currentScreenshot[projectId] = (current + 1) % project.screenshots.length
		}
	}

	function prev() {
		const project = projects.find((p) => p.id === projectId)
		if (project) {
			const current = currentScreenshot[projectId] ?? 0
			currentScreenshot[projectId] =
				(current - 1 + project.screenshots.length) % project.screenshots.length
		}
	}

	function initializeScreenshots() {
		projects.forEach((project) => {
			if (!(project.id in currentScreenshot)) {
				currentScreenshot[project.id] = 0
			}
		})
	}

	$effect(() => {
		initializeScreenshots()
	})
</script>

<div>
	<div class="screenshot-container border-terminal">
		{#each images as image (image)}
			<enhanced:img src={resolve(image)} alt={`screenshot`} />
		{/each}

		<div class="screenshot-counter">
			{currentImage + 1} / {images.length}
		</div>
	</div>

	{#if images.length > 1}
		<div class="controls-container">
			<button onclick={prev} class="screenshot-button btn"> ← prev </button>
			<button onclick={next} class="screenshot-button btn"> next → </button>
		</div>
	{/if}
</div>

<style>
	.screenshot-counter {
		position: absolute;
		bottom: 0.5rem;
		left: 0.5rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		background: rgba(10, 14, 39, 0.8);
		color: var(--terminal-green);
		border: 1px solid var(--terminal-green);
	}

	.screenshot-button {
		padding: 0.5rem 1rem;
		flex: 1;
		min-width: 0;
		font-size: 0.75rem;
	}

	.screenshot-container {
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		width: 100%;
		aspect-ratio: 1;
		background: rgba(5, 8, 18, 0.8);
	}

	.controls-container {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	enhanced\:img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
