<script>
	import { page } from '$app/stores';
	import ArticleHeader from '$lib/design-system/molecules/ArticleHeader.svelte';
	import { articles } from '$lib/logic/articles';
	import '../app.css';
	import Index from '$lib/assets/index.png';
	import A from '$lib/design-system/atoms/A.svelte';

	$: article = articles[$page.route.id?.slice(1)];
</script>

{#if article}
	<header class="flex-grow bg-white shadow">
		<div class="max-w-7xl mx-auto mt-0 md:mt-4 w-full px-4 pt-4 pb-2">
			<ArticleHeader {article} />
		</div>
	</header>
{/if}

{#if $page.route.id === '/'}
	<div class="flex-grow">
		<div class="flex h-full justify-end pb-4 md:pb-12 items-center flex-col bg-white shadow">
			<img src={Index} class="px-4 pt-4" />
			<div class="text-5xl md:text-7xl font-black">potyk.io</div>
			<div class="text-lg md:text-2xl mt-4 font-serif italic">
				жизнь и страдания <A class="!font-light" href="https://t.me/potykion">потика</A>
			</div>
		</div>
	</div>
{/if}

<main class="flex-grow">
	<div class="max-w-7xl mx-auto mt-0 md:mt-4 w-full px-2 md:px-4 py-2 md:py-4 space-y-4">
		<slot />
	</div>
</main>
