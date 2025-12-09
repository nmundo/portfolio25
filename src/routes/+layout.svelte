<script lang="ts">
	import { fade } from 'svelte/transition'
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/Header.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
	<Header />
	{@render children()}
</div>

<style>
</style>
