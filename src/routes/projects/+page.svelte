<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	interface Project {
		id: string
		title: string
		description: string
		technologies: string[]
		screenshots: string[]
		github: string
		liveUrl: string
	}

	let currentScreenshot: { [key: string]: number } = $state({})

	const projects: Project[] = [
		{
			id: 'cli-dashboard',
			title: 'CLI Dashboard',
			description:
				'A terminal-based dashboard application for monitoring system metrics and logs in real-time. Built with a focus on accessibility and keyboard navigation.',
			technologies: ['Node.js', 'TypeScript', 'CLI', 'System Monitoring'],
			screenshots: [
				'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
				'https://images.unsplash.com/photo-1516321318423-f06a6a19c51b?w=600&h=400&fit=crop',
				'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=600&h=400&fit=crop'
			],
			github: 'https://github.com/nmundo/cli-dashboard',
			liveUrl: 'https://cli-dashboard-demo.vercel.app'
		},
		{
			id: 'react-components',
			title: 'React Component Library',
			description:
				'A comprehensive library of reusable React components with TypeScript support, accessibility features, and extensive documentation. Includes buttons, modals, forms, and more.',
			technologies: ['React', 'TypeScript', 'Storybook', 'CSS'],
			screenshots: [
				'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=600&h=400&fit=crop',
				'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
				'https://images.unsplash.com/photo-1516321318423-f06a6a19c51b?w=600&h=400&fit=crop'
			],
			github: 'https://github.com/nmundo/react-components',
			liveUrl: 'https://react-components-lib.vercel.app'
		},
		{
			id: 'full-stack-crm',
			title: 'Full Stack CRM',
			description:
				'A modern customer relationship management system with real-time data synchronization, advanced filtering, and analytics. Built with React and Spring Boot.',
			technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'REST APIs'],
			screenshots: [
				'https://images.unsplash.com/photo-1516321318423-f06a6a19c51b?w=600&h=400&fit=crop',
				'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=600&h=400&fit=crop',
				'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
			],
			github: 'https://github.com/nmundo/full-stack-crm',
			liveUrl: 'https://full-stack-crm-demo.vercel.app'
		}
	]

	function nextScreenshot(projectId: string) {
		const project = projects.find((p) => p.id === projectId)
		if (project) {
			const current = currentScreenshot[projectId] ?? 0
			currentScreenshot[projectId] = (current + 1) % project.screenshots.length
		}
	}

	function prevScreenshot(projectId: string) {
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

<section class="projects-section">
	<div class="projects-grid">
		{#each projects as project, i (project.id)}
			<div in:fade={{ duration: 600, delay: i * 100 }} class="project-card-container">
				<div class="project-card border-terminal">
					<h2 class="project-title text-terminal">{project.title}</h2>
					<p class="project-id text-terminal">[project-id: {project.id}]</p>

					<div class="project-layout">
						<!-- Screenshot Slideshow -->
						<div class="screenshot-section flex-col gap-md">
							<div class="screenshot-container border-terminal">
								{#key currentScreenshot[project.id]}
									<img
										src={project.screenshots[currentScreenshot[project.id] ?? 0]}
										alt={`${project.title} screenshot ${(currentScreenshot[project.id] ?? 0) + 1}`}
										class="screenshot-image"
										in:fade={{ duration: 400 }}
									/>
								{/key}

								<div class="screenshot-counter">
									{(currentScreenshot[project.id] ?? 0) + 1} / {project.screenshots.length}
								</div>
							</div>

							<!-- Screenshot Controls -->
							<div class="controls-container">
								<button
									onclick={() => prevScreenshot(project.id)}
									class="screenshot-button btn-terminal"
								>
									← prev
								</button>
								<button
									onclick={() => nextScreenshot(project.id)}
									class="screenshot-button btn-terminal"
								>
									next →
								</button>
							</div>
						</div>

						<!-- Project Details -->
						<div class="details-section flex-col gap-lg">
							<!-- Description -->
							<div class="detail-block flex-col gap-sm">
								<h3 class="section-label text-terminal">// description</h3>
								<p class="project-description text-terminal">{project.description}</p>
							</div>

							<!-- Technologies -->
							<div class="detail-block flex-col gap-sm">
								<h3 class="section-label text-terminal">// technologies</h3>
								<div class="tech-tags-container">
									{#each project.technologies as tech}
										<span class="tech-tag">[{tech}]</span>
									{/each}
								</div>
							</div>

							<!-- Links -->
							<div class="links-container">
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									class="project-link btn-terminal"
								>
									$ github
								</a>
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="project-link btn-terminal"
								>
									$ live
								</a>
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

	.btn-terminal {
		border: 1px solid var(--terminal-green);
		color: var(--terminal-green);
		background: rgba(10, 14, 39, 0.6);
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-weight: bold;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		display: inline-block;
	}

	.btn-terminal:hover {
		background: rgba(0, 255, 0, 0.1);
		text-shadow: 0 0 10px var(--terminal-green);
		transform: scale(1.05);
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.gap-sm {
		gap: 0.5rem;
	}
	.gap-md {
		gap: 1rem;
	}
	.gap-lg {
		gap: 2rem;
	}

	.pt-md {
		padding-top: 1rem;
	}

	/* Global Scroll Snap */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Layout & Structure */

	.projects-section {
		padding: 0;
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
		scroll-snap-align: center;
		scroll-snap-stop: always;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
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
	}

	.project-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-top: 1rem;
		width: 100%;
	}

	.tech-tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.controls-container {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.links-container {
		display: flex;
		gap: 1rem;
		padding-top: 1rem;
	}

	.project-title {
		font-size: 1.25rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.project-id {
		font-size: 0.625rem;
		margin-bottom: 1rem;
	}

	.section-label {
		font-size: 0.8125rem;
		margin-bottom: 0.5rem;
	}

	.project-description {
		font-size: 0.8125rem;
		opacity: 0.9;
		line-height: 1.5;
	}

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

	/* Buttons & Interactive Elements */
	.screenshot-button {
		padding: 0.5rem 1rem;
		flex: 1;
		min-width: 0;
		font-size: 0.75rem;
	}

	.project-link {
		padding: 0.5rem 1rem;
		flex: 1;
		text-align: center;
		background: rgba(10, 14, 39, 0.8);
		font-size: 0.75rem;
		min-width: 0;
	}

	/* Images & Media */
	.screenshot-container {
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		aspect-ratio: 4 / 3;
		width: 100%;
		background: rgba(5, 8, 18, 0.8);
	}

	.screenshot-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Tags */
	.tech-tag {
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

		.project-title {
			font-size: 1.5rem;
		}

		.project-description {
			font-size: 0.875rem;
		}

		.section-label {
			font-size: 0.875rem;
		}

		.project-layout {
			gap: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.hero-title {
			font-size: 4.5rem;
		}

		.hero-subtitle {
			font-size: 1.125rem;
		}

		.hero-scroll {
			font-size: 0.875rem;
		}

		.project-title {
			font-size: 1.875rem;
		}

		.project-card {
			padding: 2rem 1rem;
		}

		.project-layout {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}
</style>
