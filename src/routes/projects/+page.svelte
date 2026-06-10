<script lang="ts">
	import { fade } from 'svelte/transition'
	import type { Picture } from 'vite-imagetools'
	import Carousel from '$lib/Carousel.svelte'

	// Build-time import of project screenshots so @sveltejs/enhanced-img can
	// generate optimized avif/webp at multiple sizes. enhanced-img only
	// processes images imported at build time, so the raw files must live under
	// src/ (not static/) and be referenced through this glob.
	const enhancedImages = import.meta.glob<Picture>('/src/lib/assets/projects/*.{png,jpg,jpeg}', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	})

	function screenshot(file: string): Picture {
		return enhancedImages[`/src/lib/assets/projects/${file}`]
	}

	interface Screenshot {
		file: string
		alt: string
	}

	interface Project {
		id: string
		title: string
		description: string
		technologies: string[]
		screenshots: Screenshot[]
		imgRatio: string
		github: string
		liveUrl?: string
	}

	const projects: Project[] = [
		{
			id: 'cta-tracker',
			title: 'CTA Tracker',
			description: `A real-time Chicago Transit Authority train tracking application built with SvelteKit. Features live train position mapping, estimated arrival times with real-time and schedule-based predictions, searchable station database, and a responsive design optimized for quick access to transit information. Integrates CTA's official tracking systems to provide accurate, up-to-date departure and arrival estimates across Chicago's 'L' network.`,
			technologies: ['SvelteKit', 'TypeScript'],
			screenshots: [
				{
					file: 'cta-tracker-1.jpg',
					alt: "CTA Tracker showing arrival times of Chicago 'L' trains"
				},
				{
					file: 'cta-tracker-2.jpg',
					alt: "CTA Tracker showing arrival times of Chicago 'L' trains"
				}
			],
			imgRatio: '1',
			github: 'https://github.com/nmundo/cta-tracker',
			liveUrl: 'https://cta-tracker.nathanmundo.com/cta-tracker/'
		},
		{
			id: 'bus-bunching-tracker',
			title: 'Bus Bunching Tracker',
			description:
				'A web application that visualizes bus bunching in real-time using data from the Chicago Transit Authority. The app displays live bus locations, identifies instances of bus bunching, and provides insights into transit efficiency. Built with SvelteKit and TypeScript, it offers an interactive map interface and data-driven visualizations to help users understand and track bus performance.',
			technologies: ['SvelteKit', 'TypeScript', 'PostgreSQL'],
			screenshots: [
				{
					file: 'bus-bunching-1.png',
					alt: 'Bus Bunching Tracker with list of CTA bus routes and their bunching stats'
				},
				{
					file: 'bus-bunching-2.png',
					alt: 'Bus Bunching Tracker highlighting clustered buses where bunching occurs'
				},
				{
					file: 'bus-bunching-3.png',
					alt: 'Bus Bunching Tracker visualization of bus spacing and headway over time'
				}
			],
			imgRatio: '4 / 3',
			github: 'https://github.com/nmundo/bus-bunching-tracker',
			liveUrl: 'https://bus-bunching.nathanmundo.com'
		},
		{
			id: 'pd-ui',
			title: 'Playdate UI Library',
			description: 'A collection of UI components for the Playdate console.',
			technologies: ['Lua'],
			screenshots: [
				{
					file: 'pd-ui-1.png',
					alt: 'Playdate UI Library components rendered on the Playdate console screen'
				}
			],
			imgRatio: '1',
			github: 'https://github.com/nmundo/pd-ui'
		}
	]
</script>

<section class="projects">
	<h1 class="sr-only">Projects</h1>
	<div class="projects-grid">
		{#each projects as project, i (project.id)}
			<article in:fade={{ duration: 300, delay: i * 80 }} class="project-card border-terminal">
				<div class="project-media">
					<!-- Screenshot Slideshow -->
					<Carousel
						images={project.screenshots.map((s) => ({
							src: screenshot(s.file),
							alt: s.alt
						}))}
						ratio={project.imgRatio}
					/>
				</div>

				<div class="project-body">
					<div class="project-header">
						<div class="title-section">
							<h2 class="project-title text-terminal">{project.title}</h2>
							<p class="project-id text-terminal">[project-id: {project.id}]</p>
						</div>

						<div class="links-container">
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="project-link btn"
								>
									[ demo ]
								</a>
							{/if}
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="project-link btn"
							>
								[ source ]
							</a>
						</div>
					</div>

					<div class="details">
						<div class="detail">
							<h3 class="label text-terminal">// description</h3>
							<p class="description text-terminal">{project.description}</p>
						</div>

						<div class="detail">
							<h3 class="label text-terminal">// technologies</h3>
							<div class="tags">
								{#each project.technologies as tech (tech)}
									<span class="tag">{tech}</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.text-terminal {
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
	}

	.border-terminal {
		border: 1px solid var(--terminal-green);
	}

	.details,
	.detail {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Layout & Structure */

	.projects {
		padding: 2rem;
		padding-top: 6rem;
		background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%);
		min-height: 100vh;
	}

	.projects-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.project-card {
		background: rgba(10, 14, 39, 0.6);
		color: var(--terminal-green);
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		transition: box-shadow 0.2s ease;
	}

	.project-card:hover {
		box-shadow: 0 0 25px rgba(0, 255, 0, 0.18);
	}

	.project-media,
	.project-body {
		min-width: 0;
	}

	.project-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.links-container {
		display: flex;
		gap: 1rem;
	}

	.project-header {
		display: grid;
		grid-template-columns: 1fr;
		align-items: start;
		gap: 1rem;
	}

	.title-section {
		display: flex;
		flex-direction: column;
	}

	.project-title {
		font-size: 1.25rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.project-id {
		font-size: 0.625rem;
		margin-bottom: 0;
	}

	.label {
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}

	.description {
		font-size: 0.8125rem;
		opacity: 0.9;
		line-height: 1.5;
	}

	.project-link {
		padding: 0.5rem 1rem;
		flex: 1;
		text-align: center;
		background: rgba(10, 14, 39, 0.8);
		font-size: 0.75rem;
		min-width: 0;
		white-space: nowrap;
	}

	.tag {
		border: 1px solid var(--terminal-green);
		color: var(--terminal-green);
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		border-radius: 0.25rem;
		display: inline-block;
		background: rgba(0, 255, 0, 0.05);
	}

	@media (min-width: 768px) {
		.projects {
			padding: 3rem;
			padding-top: 7rem;
		}

		/* screenshot on the left, title + details on the right */
		.project-card {
			display: grid;
			grid-template-columns: minmax(240px, 360px) 1fr;
			gap: 2rem;
			align-items: start;
		}

		.project-header {
			grid-template-columns: 1fr auto;
		}

		.project-title {
			font-size: 1.5rem;
		}

		.description {
			font-size: 0.875rem;
		}

		.label {
			font-size: 0.875rem;
		}
	}

	@media (min-width: 1024px) {
		.project-card {
			grid-template-columns: minmax(280px, 400px) 1fr;
			padding: 2rem;
		}

		.project-title {
			font-size: 1.875rem;
		}

		.label {
			font-size: 1rem;
		}
	}
</style>
