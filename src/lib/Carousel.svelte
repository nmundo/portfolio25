<script lang="ts">
	import type { Picture } from 'vite-imagetools'
	import { fade } from 'svelte/transition'

	interface CarouselImage {
		src: Picture
		alt: string
	}

	const { images, ratio }: { images: CarouselImage[]; ratio: string } = $props()

	let currentImage = $state(0)

	function next() {
		currentImage = (currentImage + 1) % images.length
	}

	function prev() {
		currentImage = (currentImage - 1 + images.length) % images.length
	}
</script>

<div class="container">
	<div class="image" style:aspect-ratio={ratio}>
		{#key currentImage}
			<enhanced:img
				transition:fade|global={{ duration: 50 }}
				src={images[currentImage].src}
				alt={images[currentImage].alt}
				sizes="(min-width: 768px) 45vw, 90vw"
			/>
		{/key}

		<div class="counter">
			{currentImage + 1} / {images.length}
		</div>
	</div>

	{#if images.length > 1}
		<div class="controls">
			<button onclick={prev} class="btn"> ← prev </button>
			<button onclick={next} class="btn"> next → </button>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.image {
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		width: 100%;
		/*aspect-ratio: 1;*/
		background: rgba(5, 8, 18, 0.8);
		border: 1px solid var(--terminal-green);
		enhanced\:img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.counter {
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

	.controls {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		button {
			padding: 0.5rem 1rem;
			flex: 1;
			min-width: 0;
			font-size: 0.75rem;
		}
	}
</style>
