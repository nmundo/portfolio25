<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { Spring } from 'svelte/motion'
	import Header from '$lib/Header.svelte'

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

	const experience = [
		{
			id: 'stiegler',
			title: 'Senior Lecturer',
			company: 'Stiegler EdTech',
			start: new Date('2024-04-01'),
			end: new Date('2024-11-01'),
			location: 'Wilmington, NC',
			points: [
				'Taught full-stack technologies including React, TypeScript, Spring Boot, and AWS.',
				'Mentored a class of 35 students through real-world workflows and agile practices.'
			],
			tags: [
				'Teaching',
				'React',
				'TypeScript',
				'Spring Boot',
				'Java',
				'Technical Writing',
				'Mentoring'
			]
		},
		{
			id: 'bofa-1',
			title: 'Full Stack Engineer',
			company: 'Bank of America',
			start: new Date('2023-01-01'),
			end: new Date('2023-06-01'),
			location: 'Remote',
			points: [
				'Enhanced internal tooling with React and JavaScript for automated site generation.',
				'Improved UI performance and integrated with Java Spring Boot APIs.'
			],
			tags: ['React', 'JavaScript', 'Java', 'Spring Boot']
		},
		{
			id: 'movement',
			title: 'Full Stack Engineer',
			company: 'Movement Mortgage',
			start: new Date('2022-02-01'),
			end: new Date('2022-12-01'),
			location: 'Remote',
			points: [
				'Improved CRM UI with React; focused on responsive and maintainable design.',
				'Implemented CI/CD with GitHub Actions.',
				'Worked with REST APIs and AWS cloud services.'
			],
			tags: ['TypeScript', 'React', 'Express', 'CRM']
		},
		{
			id: 'unique-loom',
			title: 'Front End Engineer',
			company: 'Unique Loom USA',
			start: new Date('2021-02-01'),
			end: new Date('2022-01-01'),
			location: 'Remote',
			points: [
				'Led migration from Jinja templates to React/Node.',
				'Built Algolia-powered instant search and AWS CI/CD pipelines.'
			],
			tags: ['React', 'Node', 'Migration', 'Algolia', 'AWS', 'CI/CD']
		},
		{
			id: 'bofa-2',
			title: 'UI Developer',
			company: 'Bank of America',
			start: new Date('2020-02-01'),
			end: new Date('2021-02-01'),
			location: 'Charlotte, NC',
			points: [
				'Developed React front-end consuming secure Spring Boot APIs.',
				'Worked in microservices architecture with offshore teams.'
			],
			tags: ['React', 'Java', 'JSP', 'SQL']
		},
		{
			id: 'hyde-park',
			title: 'Full Stack Engineer',
			company: 'Hyde Park Partners',
			start: new Date('2018-05-01'),
			end: new Date('2020-02-01'),
			location: 'Charlotte, NC',
			points: [
				'Maintained ERP platform using PL/SQL, Python, JS.',
				'Migrated legacy systems to React/Node.',
				'Built reusable UI components and REST APIs.'
			],
			tags: ['PL/SQL', 'Python', 'JavaScript', 'React', 'Node', 'ERP', 'jQuery']
		},
		{
			id: 'unc-charlotte',
			title: 'Data Analytics Teaching Assistant',
			company: 'UNC Charlotte',
			start: new Date('2019-01-01'),
			end: new Date('2020-01-01'),
			location: 'Charlotte, NC',
			points: [],
			tags: ['Teaching', 'JavaScript', 'Python', 'D3', 'Data Analytics']
		},
		{
			id: 'visual-impressions',
			title: 'Support Rep / Developer',
			company: 'Visual Impressions',
			start: new Date('2017-12-01'),
			end: new Date('2018-05-01'),
			location: 'Charlotte, NC',
			points: [],
			tags: ['HTML', 'CSS', 'JavaScript', 'Python', 'Customer Support']
		},
		{
			id: 'hyde-park-intern',
			title: 'Intern',
			company: 'Hyde Park Partners',
			start: new Date('2013-10-01'),
			end: new Date('2015-11-01'),
			location: 'Charlotte, NC',
			points: [],
			tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Python']
		}
	]

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
<section class="about-section">
	<div class="content-container">
		<h2 class="section-title" in:fade={{ duration: 600 }}>./about</h2>
		<p class="section-text" in:fade={{ duration: 600, delay: 200 }}>
			Experienced Front-End leaning Full-Stack Developer delivering scalable web applications using
			React, JavaScript, TypeScript, HTML/CSS, and Svelte. Strong background in building responsive
			interfaces, integrating RESTful APIs, and contributing to agile teams. Experienced in
			full-stack development with Java Spring Boot and mentoring technical teams.
		</p>
	</div>
</section>

<!-- Skills Section -->
<section class="skills-section">
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

<section class="experience-section">
	<div class="content-container">
		<h2 class="section-title">./experience</h2>
		<div class="experience-list">
			{#each experience as role, i (role.id)}
				<button
					class="experience-item"
					class:expanded={expandedRole === role.id}
					onclick={() => toggleRole(role.id)}
					in:fade={{ duration: 600, delay: i * 50 }}
				>
					<div class="experience-header">
						<div>
							<h3 class="experience-title">
								{role.title} @ {role.company}
							</h3>
							<div class="experience-tags">
								{#each role.tags as tag}
									<span class="tag">[{tag}]</span>
								{/each}
							</div>
						</div>

						<span class="experience-date">
							{role.start.getFullYear()}.{String(role.start.getMonth() + 1).padStart(2, '0')}
							→ {role.end.getFullYear()}.{String(role.end.getMonth() + 1).padStart(2, '0')}
						</span>

						<span class="expand-icon" class:rotated={expandedRole === role.id}> ▼ </span>
					</div>

					{#if expandedRole === role.id}
						<ul class="experience-details" in:fly={{ y: -10, duration: 300 }}>
							{#each role.points as point (point)}
								<li>→ {point}</li>
							{/each}
						</ul>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Section Styling */
	.hero,
	.about-section,
	.skills-section,
	.experience-section {
		scroll-snap-align: start;
		scroll-snap-stop: always;
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

	.about-section {
		position: relative;
		padding: 5rem 1rem;
		background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%);
		border-top: 2px solid var(--terminal-green);
		border-bottom: 2px solid var(--terminal-green);
	}

	.skills-section {
		padding: 5rem 1rem;
		background: linear-gradient(135deg, rgba(5, 8, 18, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%);
	}

	.experience-section {
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

	/* Hero Content */
	.hero-content {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: 1rem;
		width: 100%;
		max-width: 32rem;
	}

	.terminal-border-wrapper {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.terminal-border {
		position: absolute;
		inset: 0;
		border: 2px solid var(--terminal-green);
		border-radius: 0.5rem;
		opacity: 0.5;
		box-shadow:
			inset 0 0 20px rgba(0, 255, 0, 0.1),
			0 0 30px rgba(0, 255, 0, 0.1);
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

	/* Experience Section */
	.experience-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.experience-item {
		width: 100%;
		text-align: left;
		background: none;
		border: 1px solid var(--terminal-green);
		padding: 0;
		cursor: pointer;
		border-radius: 0.5rem;
		background: rgba(10, 14, 39, 0.6);
		opacity: 0.8;
		transition: all 0.3s ease;
		&.expanded {
			border-color: var(--terminal-green);
			background: rgba(0, 255, 0, 0.05);
			opacity: 1;
			box-shadow: 0 0 20px rgba(0, 255, 0, 0.15);
		}
	}

	.experience-header {
		position: relative;
		padding: 1.5rem;
	}

	.experience-title {
		font-size: 1rem;
		font-weight: 600;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
		transition: all 0.2s ease;
	}

	@media (min-width: 768px) {
		.experience-title {
			font-size: 1.125rem;
		}
	}

	.experience-header:hover .experience-title {
		filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));
	}

	.experience-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.tag {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		border: 1px solid var(--terminal-green);
		border-radius: 0.25rem;
		color: var(--terminal-green);
		background: rgba(0, 255, 0, 0.05);
	}

	.experience-date {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		padding: 0.125rem 0.5rem;
		font-size: 0.875rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		background: rgba(0, 255, 0, 0.1);
		border: 1px solid rgba(0, 255, 0, 0.3);
		border-radius: 0.25rem;
		color: var(--terminal-green);
		opacity: 0.8;
	}

	.expand-icon {
		position: absolute;
		bottom: 1.5rem;
		right: 1.5rem;
		font-size: 1.125rem;
		color: var(--terminal-green);
		transition: transform 0.3s ease;
	}

	.expand-icon.rotated {
		transform: rotateZ(180deg);
	}

	.experience-details {
		margin-left: 1.5rem;
		margin-top: 0.5rem;
		padding-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-size: 0.875rem;
		color: var(--terminal-green);
		list-style: none;
	}

	.experience-details li {
		padding: 0;
		margin: 0;
	}
</style>
