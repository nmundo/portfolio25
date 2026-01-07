<script lang="ts">
	import { fade } from 'svelte/transition'
	import Carousel from '$lib/Carousel.svelte'

	interface Project {
		id: string
		title: string
		description: string
		technologies: string[]
		screenshots: string[]
		github: string
		liveUrl?: string
	}

	const projects: Project[] = [
		{
			id: 'cta-tracker',
			title: 'CTA Tracker',
			description: `A real-time Chicago Transit Authority train tracking application built with SvelteKit. Features live train position mapping, estimated arrival times with real-time and schedule-based predictions, searchable station database, and a responsive design optimized for quick access to transit information. Integrates CTA's official tracking systems to provide accurate, up-to-date departure and arrival estimates across Chicago's 'L' network.`,
			technologies: ['SvelteKit', 'TypeScript'],
			screenshots: ['/img/cta-tracker-1.jpg', '/img/cta-tracker-2.jpg'],
			github: 'https://github.com/nmundo/cta-tracker',
			liveUrl: 'https://cta-tracker-pi.vercel.app/cta-tracker/'
		},
		{
			id: 'pd-ui',
			title: 'Playdate UI Library',
			description: 'A collection of UI components for the Playdate console.',
			technologies: ['Lua'],
			screenshots: ['/img/pd-ui-1.png'],
			github: 'https://github.com/nmundo/pd-ui'
		}
	]
</script>

<section class="projects">
	<div class="projects-grid">
		{#each projects as project, i (project.id)}
			<div in:fade={{ duration: 600, delay: i * 100 }} class="project-card-container">
				<div class="project-card border-terminal">
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
									[ live ]
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

					<div class="project-layout">
						<!-- Screenshot Slideshow -->
						<Carousel images={project.screenshots} />

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
				</div>
			</div>
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
		padding: 5rem 0 0 0;
		background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%);
		height: 100vh;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
	}

	.projects-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		margin: 0;
		max-width: 100%;
	}

	.project-card-container {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		scroll-snap-align: center;
	}

	.project-card {
		background: rgba(10, 14, 39, 0.6);
		color: var(--terminal-green);
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: 50rem;
		position: relative;
	}

	.project-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-top: 1rem;
		width: 100%;
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
		margin-bottom: 1rem;
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
		.project-card-container {
			padding: 1.5rem;
		}

		.project-card {
			padding: 1.5rem;
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

		.project-layout {
			gap: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.project-title {
			font-size: 1.875rem;
		}

		.project-card {
			padding: 2rem 1rem;
		}

		.label {
			font-size: 1rem;
		}

		.project-layout {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 767px) {
		.projects {
			scroll-snap-type: none;
		}

		.project-card-container {
			scroll-snap-align: none;
			height: auto;
			min-height: 100vh;
		}
	}
</style>
