<script lang="ts">
  import A from "$lib/design-system/atoms/A.svelte";
  import GotyGrid from "$lib/design-system/molecules/GotyGrid.svelte";
  import GotyCard from "$lib/design-system/molecules/GotyCard.svelte";
  import LinkCard from "$lib/design-system/atoms/LinkCard.svelte";
  import Index from "$lib/assets/index.png";
  import { articles } from "$lib/logic/articles";
</script>

<div class="flex  items-center flex-col ">
  <img src={Index}>
  <div class="text-5xl md:text-7xl font-black">potyk.io</div>
  <div class="text-lg md:text-2xl mt-4 ">Че в башке у <A href="https://t.me/potykion">потика</A></div>
</div>

<div class="mt-8">
  <GotyGrid>
    {#each Object.entries(articles) as [articleLink, article]}
      <GotyCard blank={false} to={`/${articleLink}`} title={article.title} subtitle={article.desc}></GotyCard>
    {/each}
  </GotyGrid>
</div>


