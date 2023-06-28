<script>
	import GotyGrid from '$lib/design-system/molecules/GotyGrid.svelte';
	import GotyCard from '$lib/design-system/molecules/GotyCard.svelte';
	import { articles } from '$lib/logic/articles';

	import H2 from '../atoms/H2.svelte';
</script>

<H2>Пишу</H2>
<GotyGrid>
	{#each Object.entries(articles) as [articleLink, article]}
		{#if !article.draft}
			<GotyCard
				blank={false}
				to={`/${articleLink}`}
				title={article.title}
				subtitle={article.desc}
			/>
		{/if}
	{/each}
</GotyGrid>
