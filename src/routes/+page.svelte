<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { Spring } from 'svelte/motion'

	// State for interactive elements
	let expandedRole: string | null = $state(null)
	let mousePos = $state({ x: 0, y: 0 })
	let scrollY = $state(0)
	let terminalLines = $state<string[]>([])

	// Spring for smooth scroll effects
	const parallaxY = new Spring(0, { stiffness: 0.08, damping: 0.25 })

	const terminalGreeting = ['$ ./portfolio', 'Nathan', 'Full Stack Engineer']

	const links = [
		{ href: 'mailto:nathanmundo@icloud.com', label: 'Email', cmd: '[ mail ]' },
		{ href: 'https://linkedin.com/in/nmundo', label: 'LinkedIn', cmd: '[ linkedin ]' },
		{ href: 'https://github.com/nmundo', label: 'GitHub', cmd: '[ github ]' }
	]

	const experiences = [
		{
			id: 'ai-freelance',
			title: 'AI Training - Freelance',
			company: 'Freelance',
			start: new Date('2025-01-01'),
			end: new Date('2025-12-01'),
			location: 'Remote',
			points: [
				'Contributed to projects training LLMs to generate production-ready code using RLHF.',
				'Worked on various projects focused on UI using JavaScript, Tailwind, and React.'
			],
			tags: []
		},
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
			tags: []
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
			tags: []
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
			tags: []
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
			tags: []
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
			tags: []
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
			tags: []
		},
		{
			id: 'unc-charlotte',
			title: 'Data Analytics Teaching Assistant',
			company: 'UNC Charlotte',
			start: new Date('2019-01-01'),
			end: new Date('2020-01-01'),
			location: 'Charlotte, NC',
			points: [],
			tags: []
		},
		{
			id: 'visual-impressions',
			title: 'Support Rep / Developer',
			company: 'Visual Impressions',
			start: new Date('2017-12-01'),
			end: new Date('2018-05-01'),
			location: 'Charlotte, NC',
			points: [],
			tags: []
		},
		{
			id: 'hyde-park-intern',
			title: 'Intern',
			company: 'Hyde Park Partners',
			start: new Date('2013-10-01'),
			end: new Date('2015-11-01'),
			location: 'Charlotte, NC',
			points: [],
			tags: []
		}
	]

	const skills = {
		'Front-End': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Svelte'],
		'Back-End': [
			'Node.js',
			'Express',
			'Java Spring Boot',
			'Python (Flask/Django)',
			'SQL',
			'PL/SQL'
		],
		'Cloud & DevOps': ['AWS', 'CI/CD', 'GitHub Actions', 'Jenkins'],
		'Tools & Methodologies': ['Agile', 'Webpack', 'Git/GitHub', 'TDD', 'RESTful APIs']
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
			let currentIndex = 0
			const timer = setInterval(() => {
				if (currentIndex < terminalGreeting.length) {
					terminalLines = [...terminalGreeting.slice(0, currentIndex + 1)]
					currentIndex++
				} else {
					clearInterval(timer)
				}
			}, 300)
			return () => clearInterval(timer)
		}
	})
</script>

<svelte:window bind:scrollY />

<!-- Hero Section with Terminal Aesthetic -->
<section
	class="hero relative overflow-hidden min-h-screen flex items-center justify-center"
	style="background: linear-gradient(135deg, #050812 0%, #0a0e27 50%, #050812 100%);"
	role="banner"
	onmousemove={handleMouseMove}
>
	<!-- Terminal border effect -->
	<div class="absolute inset-0 pointer-events-none">
		<div
			class="absolute inset-0 border-2 rounded-lg opacity-50"
			style="border-color: var(--terminal-green); box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.1), 0 0 30px rgba(0, 255, 0, 0.1);"
		></div>
	</div>

	<div class="relative z-10 text-center px-4 w-full max-w-2xl">
		<!-- Terminal output -->
		<div
			class="mb-12 text-left border rounded-lg p-6"
			style="border-color: var(--terminal-green); background: rgba(10, 14, 39, 0.8);"
		>
			{#each terminalLines as line, i (i)}
				<div
					in:fade={{ duration: 400 }}
					class="mb-2 font-mono text-sm md:text-lg"
					style="color: var(--terminal-green);"
				>
					{line}
				</div>
			{/each}
			{#if terminalLines.length > 0}
				<div class="animate-pulse mt-2 font-mono text-sm" style="color: var(--terminal-green);">
					$
				</div>
			{/if}
		</div>

		<div in:fade={{ duration: 800, delay: 800 }}>
			<div class="flex justify-center gap-6 mb-12 flex-wrap">
				{#each links as link (link.label)}
					<a
						in:fade={{ duration: 800, delay: 300 }}
						href={link.href}
						class="group relative px-6 py-3 font-mono font-bold transition-all duration-300 text-sm md:text-base hover:scale-105 active:scale-95"
						style="color: var(--terminal-green); border: 2px solid var(--terminal-green); background: rgba(10, 14, 39, 0.6); text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);"
					>
						<span class="group-hover:text-yellow-400 transition-colors">λ</span>
						{link.cmd}
					</a>
				{/each}
			</div>
		</div>

		<div
			in:fly={{ y: 40, duration: 800, delay: 400 }}
			class="text-xs md:text-sm font-mono animate-bounce mt-8"
			style="color: var(--terminal-green);"
		>
			▼ scroll to see more ▼
		</div>
	</div>
</section>

<!-- Summary Section -->
<section
	class="relative py-20 px-4"
	style="background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%); border-top: 2px solid var(--terminal-green); border-bottom: 2px solid var(--terminal-green);"
>
	<div class="max-w-3xl mx-auto">
		<h2
			class="text-3xl md:text-4xl font-bold mb-8 font-mono"
			style="color: var(--terminal-green);"
			in:fade={{ duration: 600 }}
		>
			./ about
		</h2>
		<p
			class="text-base md:text-lg leading-relaxed font-mono"
			style="color: var(--terminal-green); opacity: 0.9;"
			in:fade={{ duration: 600, delay: 200 }}
		>
			Experienced Front-End leaning Full-Stack Developer delivering scalable web applications using
			React, JavaScript, TypeScript, HTML/CSS, and Svelte. Strong background in building responsive
			interfaces, integrating RESTful APIs, and contributing to agile teams. Experienced in
			full-stack development with Java Spring Boot and mentoring technical teams.
		</p>
	</div>
</section>

<!-- Skills Section -->
<section
	class="py-20 px-4"
	style="background: linear-gradient(135deg, rgba(5, 8, 18, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%);"
>
	<div class="max-w-4xl mx-auto">
		<h2
			class="text-3xl md:text-4xl font-bold mb-12 font-mono"
			style="color: var(--terminal-green);"
		>
			./ skills
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each Object.entries(skills) as [category, items], i (category)}
				<div
					class="group p-6 rounded-lg border transition-all duration-300 hover:shadow-lg"
					style="border-color: var(--terminal-green); background: rgba(10, 14, 39, 0.7); box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);"
					in:fade={{ duration: 600, delay: i * 100 }}
				>
					<h3
						class="text-lg md:text-xl font-semibold mb-4 font-mono transition-colors group-hover:drop-shadow-lg"
						style="color: var(--terminal-green);"
					>
						→ {category}
					</h3>
					<div class="flex flex-wrap gap-2">
						{#each items as skill, j (skill)}
							<span
								class="px-3 py-1 text-xs md:text-sm font-mono rounded-sm border transition-all duration-200 hover:scale-105 hover:drop-shadow-lg"
								style="color: var(--terminal-green); border-color: var(--terminal-green); background: rgba(10, 14, 39, 0.5);"
								in:fade={{ duration: 400, delay: i * 100 + j * 30 }}
							>
								[{skill}]
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Experience Section -->
<section
	class="py-20 px-4"
	style="background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(13, 17, 23, 0.9) 100%);"
>
	<div class="max-w-3xl mx-auto">
		<h2
			class="text-3xl md:text-4xl font-bold mb-12 font-mono"
			style="color: var(--terminal-green);"
		>
			./ work_history
		</h2>
		<div class="space-y-4">
			{#each experiences as role, i (role.id)}
				<button
					onclick={() => toggleRole(role.id)}
					class="w-full group text-left"
					in:fade={{ duration: 600, delay: i * 50 }}
				>
					<div
						style={expandedRole === role.id
							? `border-color: var(--terminal-green); background: rgba(0, 255, 0, 0.05); box-shadow: 0 0 20px rgba(0, 255, 0, 0.15);`
							: `border-color: var(--terminal-green); background: rgba(10, 14, 39, 0.6); opacity: 0.8;`}
						class="p-6 rounded-lg border transition-all duration-300 cursor-pointer"
					>
						<div class="flex justify-between items-start">
							<div>
								<h3
									class="text-lg md:text-xl font-semibold font-mono transition-all group-hover:drop-shadow-lg"
									style="color: var(--terminal-green);"
								>
									{role.title} @ {role.company}
								</h3>
								<p class="text-sm font-mono mt-1 opacity-70" style="color: var(--terminal-green);">
									<span
										class="inline-block px-2 py-0.5 rounded-sm opacity-80"
										style="background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3);"
									>
										{role.start.getFullYear()}.{String(role.start.getMonth() + 1).padStart(2, '0')}
										→ {role.end.getFullYear()}.{String(role.end.getMonth() + 1).padStart(2, '0')}
									</span>
								</p>
							</div>
							<span
								class="text-lg transition-transform duration-300"
								class:rotate-180={expandedRole === role.id}
								style="color: var(--terminal-green);"
							>
								▼
							</span>
						</div>

						{#if expandedRole === role.id}
							<ul
								class="ml-6 mt-4 space-y-2 font-mono text-sm"
								in:fly={{ y: -10, duration: 300 }}
								style="color: var(--terminal-green);"
							>
								{#each role.points as point (point)}
									<li>→ {point}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	:global(body) {
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
	}

	:global(a:hover) {
		filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.5));
	}

	:global(button:hover) {
		filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.3));
	}
</style>
