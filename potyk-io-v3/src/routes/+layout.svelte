<script>
	import { page } from '$app/stores';
	import ArticleHeader from '$lib/design-system/molecules/ArticleHeader.svelte';
	import { articles } from '$lib/logic/articles';
	import '../app.css';

	$: article = articles[$page.route.id?.slice(1)];
</script>

{#if article}
	<header class="flex-grow bg-white shadow">
		<div class="max-w-7xl mx-auto mt-0 md:mt-4 w-full px-4 pt-4 pb-2">
			<ArticleHeader {article} />
		</div>
	</header>
{/if}

<main class="flex-grow">
	<div class="max-w-7xl mx-auto mt-0 md:mt-4 w-full px-2 md:px-4 py-2 md:py-4 space-y-4">
		<slot />
	</div>
</main>
