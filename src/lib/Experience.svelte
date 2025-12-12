<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	const experience = [
		{
			id: 'stiegler',
			title: 'Senior Lecturer',
			company: 'Stiegler EdTech',
			start: new Date('2024-04-01'),
			end: new Date('2024-11-01'),
			location: 'Wilmington, NC',
			points: [
				'Delivered comprehensive instruction in full-stack technologies including React, TypeScript, Spring Boot, and AWS to 35 students. Mentored students through real-world development workflows and agile practices, preparing them for professional software engineering careers.'
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
				'Enhanced internal tooling with React and JavaScript for automated site generation, improving development team efficiency. Optimized UI performance and integrated front-end applications with Java Spring Boot APIs.'
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
				'Improved CRM user interface with React, focusing on responsive and maintainable design patterns. Implemented CI/CD pipelines using GitHub Actions and worked with REST APIs and AWS cloud services to support mortgage processing workflows.'
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
				'Led front-end migration from Jinja templates to modern React/Node.js architecture. Built Algolia-powered instant search feature and established AWS CI/CD pipelines to improve deployment reliability and speed.'
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
				'Developed secure React front-end applications consuming Spring Boot APIs within a microservices architecture. Collaborated with offshore development teams to deliver enterprise-level financial applications.'
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
				'Maintained complex ERP platform using PL/SQL, Python, and JavaScript while leading modernization efforts to migrate legacy systems to React/Node.js. Built reusable UI components and developed REST APIs, bridging traditional enterprise systems with modern web technologies.'
			],
			tags: ['PL/SQL', 'Python', 'JavaScript', 'React', 'Node', 'ERP', 'jQuery']
		},
		{
			id: 'unc-charlotte',
			title: 'Data Analytics TA',
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

	let expandedRole: string | null = $state(null)

	function toggleRole(roleId: string) {
		expandedRole = expandedRole === roleId ? null : roleId
	}
</script>

<div class="list">
	{#each experience as role, i (role.id)}
		<button
			class="item"
			class:expanded={expandedRole === role.id}
			onclick={() => toggleRole(role.id)}
			in:fade={{ duration: 600, delay: i * 50 }}
		>
			<div class="header">
				<div>
					<h3 class="title">
						<span class="job-title">{role.title}</span>
						<span class="company-name">@ {role.company}</span>
					</h3>
					<div class="tags">
						{#each role.tags as tag (tag)}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>

				<span class="date">
					{role.start.getFullYear()}.{String(role.start.getMonth() + 1).padStart(2, '0')}
					→ {role.end.getFullYear()}.{String(role.end.getMonth() + 1).padStart(2, '0')}
				</span>

				<span class="expand-icon" class:rotated={expandedRole === role.id}> ▼ </span>
			</div>

			{#if expandedRole === role.id}
				<ul class="details" in:fly={{ y: -10, duration: 300 }}>
					{#each role.points as point (point)}
						<li>{point}</li>
					{/each}
				</ul>
			{/if}
		</button>
	{/each}
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 80vh;
		overflow: scroll;
	}

	.item {
		width: 100%;
		text-align: left;
		background: none;
		border: 1px solid var(--terminal-green);
		padding: 1.5rem;
		cursor: pointer;
		border-radius: 0.5rem;
		background: rgba(10, 14, 39, 0.6);
		opacity: 0.8;
		transition: all 0.3s ease;
		&:hover {
			opacity: 1;
			box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
			.title {
				filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));
			}
		}
		&.expanded {
			opacity: 1;
		}
	}

	.header {
		position: relative;
	}

	.title {
		font-size: 1rem;
		font-weight: 600;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		color: var(--terminal-green);
		transition: all 0.2s ease;
		span {
			display: inline;
			@media (max-width: 767px) {
				display: block;
			}
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
		align-items: center;

		.tag {
			display: inline-flex;
			align-items: center;
			padding: 0.125rem 0.5rem;
			font-size: clamp(0.6rem, 1.2vw, 0.75rem);
			font-family: 'JetBrains Mono', 'Courier Prime', monospace;
			border: 1px solid var(--terminal-green);
			border-radius: 0.25rem;
			color: var(--terminal-green);
			background: rgba(0, 255, 0, 0.05);

			flex: 0 1 auto;
			min-width: 0;
			max-width: 12rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	@media (max-width: 420px) {
		.tags {
			gap: 0.4rem;
		}

		.tag {
			padding: 0.08rem 0.4rem;
			max-width: 9rem;
		}

		.date {
			padding: 0.06rem 0.35rem;
			max-width: 8.5rem;
			font-size: clamp(0.65rem, 2.2vw, 0.78rem);
		}
	}

	.date {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.125rem 0.5rem;
		font-size: clamp(0.7rem, 1vw, 0.875rem);
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		background: rgba(0, 255, 0, 0.1);
		border: 1px solid rgba(0, 255, 0, 0.3);
		border-radius: 0.25rem;
		color: var(--terminal-green);
		opacity: 0.8;
		display: inline-flex;
		align-items: center;
		min-width: 0;
		max-width: 11rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.expand-icon {
		position: absolute;
		bottom: 0;
		right: 0;
		font-size: 1.125rem;
		color: var(--terminal-green);
		transition: transform 0.3s ease;
		&.rotated {
			transform: rotateZ(180deg);
		}
	}

	.details {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-family: 'JetBrains Mono', 'Courier Prime', monospace;
		font-size: 0.875rem;
		color: var(--terminal-green);
		list-style: none;
	}
</style>
