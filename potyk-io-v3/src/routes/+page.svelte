<script lang="ts">
  import A from "$lib/design-system/atoms/A.svelte";
  import GotyGrid from "$lib/design-system/molecules/GotyGrid.svelte";
  import GotyCard from "$lib/design-system/molecules/GotyCard.svelte";
  import LinkCard from "$lib/design-system/atoms/LinkCard.svelte";
  import Index from "$lib/assets/index.png";
  import { articles } from "$lib/logic/articles";
</script>


<div class="mt-2">
  <GotyGrid>
    {#each Object.entries(articles) as [articleLink, article]}
      <GotyCard blank={false} to={`/${articleLink}`} title={article.title} subtitle={article.desc}></GotyCard>
    {/each}
  </GotyGrid>
</div>


