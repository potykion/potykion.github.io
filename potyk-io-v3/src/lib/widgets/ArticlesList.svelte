<script>
	import GotyGrid from '$lib/entities/goty/ui/GotyGrid.svelte';
	import GotyCard from '$lib/entities/goty/ui/GotyCard.svelte';
	import { articles } from '$lib/entities/article/articles';

	import H2 from '$lib/shared/ui/H2.svelte';
	import NewSup from '$lib/shared/ui/NewSup.svelte';
</script>

<H2>Пишу</H2>
<GotyGrid>
	{#each Object.entries(articles) as [articleLink, article]}
		{#if !article.draft}
			<GotyCard blank={false} to={`/${articleLink}`} subtitle={article.desc}>
				{article.title}
				{#if article.new}<NewSup />{/if}
			</GotyCard>
		{/if}
	{/each}
</GotyGrid>
