<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { Spring } from 'svelte/motion'
	import Header from '$lib/Header.svelte'
	import Experience from '../lib/Experience.svelte'

	// State for interactive elements
	let expandedRole: string | null = $state(null)
	let mousePos = $state({ x: 0, y: 0 })
	let scrollY = $state(0)
	let terminalLines = $state<string[]>([])
	let typedFirst = $state('')

	// Spring for smooth scroll effects
	const parallaxY = new Spring(0, { stiffness: 0.08, damping: 0.25 })

	const terminalCommand = '> cat ./about.txt'
	const terminalGreeting = ['Nathan', 'Full Stack Engineer']

	const skills = {
		'Front-End': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Svelte'],
		'Back-End': ['Node', 'Express', 'Java', 'Python', 'SQL', 'PL/SQL']
		// 'Cloud & DevOps': ['AWS', 'CI/CD', 'GitHub Actions', 'Jenkins'],
		// 'Tools & Methodologies': ['Agile', 'Webpack', 'Git/GitHub', 'TDD', 'RESTful APIs']
	}

	function toggleRole(roleId: string) {
		expandedRole = expandedRole === roleId ? null : roleId
	}

	function handleMouseMove(e: MouseEvent) {
		const container = e.currentTarget as HTMLElement
		const rect = container.getBoundingClientRect()
		mousePos = {
			x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
			y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
		}
	}

	$effect(() => {
		parallaxY.target = scrollY * 0.5
	})

	$effect(() => {
		if (typeof window !== 'undefined') {
			let doneTyping = false
			let charIndex = 0
			let lineIndex = 0

			const timer = setInterval(() => {
				// First line typing animation
				if (!doneTyping) {
					const full = terminalCommand
					if (charIndex < full.length) {
						typedFirst = full.slice(0, charIndex + 1)
						charIndex++
						return
					} else {
						doneTyping = true
						return
					}
				}

				// Add the remaining lines normally
				if (lineIndex < terminalGreeting.length) {
					terminalLines = [...terminalLines, terminalGreeting[lineIndex]]
					lineIndex++
				} else {
					clearInterval(timer)
				}
			}, 80)

			return () => clearInterval(timer)
		}
	})
</script>

<svelte:window bind:scrollY />

<section class="hero" role="banner" onmousemove={handleMouseMove}>
	<div class="hero-content">
		<div class="terminal-output">
			<div class="terminal-line">{typedFirst}</div>
			{#each terminalLines as line, i (i)}
				<div class="terminal-line" in:fade={{ duration: 100, delay: i * 50 }}>
					{line}
				</div>
			{/each}
			{#if terminalLines.length === terminalGreeting.length}
				<div class="terminal-cursor" in:fade={{ duration: 50, delay: terminalLines.length * 50 }}>
					<span>&nbsp;_</span>
				</div>
			{/if}
		</div>

		<div class="scroll-hint" in:fly={{ y: 40, duration: 800, delay: 400 }}>
			▼ scroll to see more ▼
		</div>
	</div>
</section>

<!-- Summary Section -->
<section class="about">
	<div class="content-container">
		<h2 class="section-title" in:fade={{ duration: 600 }}>./about</h2>
		<p class="section-text" in:fade={{ duration: 600, delay: 100 }}>
			I build responsive, user-focused web applications using modern front-end technologies. Over
			the past 7+ years, I've worked across fintech, e-commerce, and manufacturing, migrating legacy
			systems to React, optimizing UI performance, creating dashboards to visualize company data,
			and shipping features that actually get used. I'm also not afraid to hop out of the browser
			and work on solutions that require knowledge outside web technologies; I am full-stack through
			and through.
		</p>
		<p class="section-text" in:fade={{ duration: 600, delay: 200 }}>
			What sets me apart is my ability to explain complex technical concepts clearly. Teaching
			full-stack development combined with working alongside non-technical decision-makers on
			architectural and roadmap choices has given me the ability to articulate what needs to be done
			and why.
		</p>
	</div>
</section>

<!-- Skills Section -->
<section class="skills">
	<div class="content-container">
		<h2 class="section-title">./skills</h2>
		<div class="skills-grid">
			{#each Object.entries(skills) as [category, items], i (category)}
				<div class="skill-category" in:fade={{ duration: 600, delay: i * 100 }}>
					<h3 class="skill-category-title">
						→ {category}
					</h3>
					<div class="skills-tags">
						{#each items as skill, j (skill)}
							<span class="skill-tag" in:fade={{ duration: 400, delay: i * 100 + j * 30 }}>
								[{skill}]
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="experience">
	<div class="content-container">
		<h2 class="section-title" in:fade={{ duration: 600 }}>./experience</h2>
		<Experience />
	</div>
</section>

<style>
	/* Section Styling */
	.hero,
	.about,
	.skills,
	.experience {
		scroll-snap-align: start;
		scroll-snap-stop: always;
		border-bottom: 2px solid var(--terminal-green);
	}

	.hero {
		position: relative;
		overflow: hidden;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #050812 0%, #0a0e27 50%, #050812 100%);
	}

	.about {
		position: relative;
		padding: 5rem 1rem;
		background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%);
	}

	.skills {
		padding: 5rem 1rem;
		background: linear-gradient(135deg, rgba(5, 8, 18, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%);
	}

	.experience {
		padding: 5rem 1rem;
		background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%);
	}

	/* Content Container */
	.content-container {
		width: 100%;
		max-width: 48rem;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-content {
		position: relative;
		/* z-index: 10; */
		text-align: center;
		padding: 1rem;
		width: 100%;
		max-width: 32rem;
	}

	.terminal-output {
		margin-bottom: 3rem;
		text-align: left;
		border: 1px solid var(--terminal-green);
		border-radius: 0.5rem;
		padding: 1.5rem;
		height: 165px;
		background: rgba(10, 14, 39, 0.8);
	}

	.terminal-line {
		margin-bottom: 0.5rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-size: 0.875rem;
		color: var(--terminal-green);
	}

	@media (min-width: 768px) {
		.terminal-line {
			font-size: 1.125rem;
		}
	}

	.terminal-cursor {
		margin-top: 0.5rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-size: 0.875rem;
		color: var(--terminal-green);
		&::before {
			content: '>';
		}
		span {
			animation: pulse 1s infinite;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Scroll Hint */
	.scroll-hint {
		font-size: 0.75rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		animation: bounce 2s infinite;
		margin-top: 2rem;
	}

	@media (min-width: 768px) {
		.scroll-hint {
			font-size: 0.875rem;
		}
	}

	/* Section Titles */
	.section-title {
		font-size: 1.875rem;
		font-weight: bold;
		margin-bottom: 2rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
	}

	@media (min-width: 768px) {
		.section-title {
			font-size: 2.25rem;
		}
	}

	.section-text {
		font-size: 1rem;
		line-height: 1.625;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
		opacity: 0.9;
		padding-bottom: 1rem;
		&::before {
			content: '> ';
		}
	}

	@media (min-width: 768px) {
		.section-text {
			font-size: 1.125rem;
		}
	}

	/* Skills Section */
	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.skill-category {
		padding: 1.5rem;
		border: 1px solid var(--terminal-green);
		border-radius: 0.5rem;
		background: rgba(10, 14, 39, 0.7);
		box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
		transition: all 0.3s ease;
	}

	.skill-category:hover {
		box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
	}

	.skill-category-title {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 1rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
		transition: all 0.2s ease;
	}

	@media (min-width: 768px) {
		.skill-category-title {
			font-size: 1.125rem;
		}
	}

	.skill-category:hover .skill-category-title {
		filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));
	}

	.skills-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.skill-tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		border: 1px solid var(--terminal-green);
		border-radius: 0.25rem;
		color: var(--terminal-green);
		background: rgba(10, 14, 39, 0.5);
		transition: all 0.2s ease;
	}

	@media (min-width: 768px) {
		.skill-tag {
			font-size: 0.875rem;
		}
	}

	.skill-tag:hover {
		transform: scale(1.05);
		filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.5));
	}
</style>
