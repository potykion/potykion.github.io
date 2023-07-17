<script lang="ts">
  import P from "$lib/shared/ui/P.svelte";
  import BeerTranslation from "$lib/entities/beer/tool/BeerTranslation.svelte";
  import BeerQuery from "$lib/features/beer/translate/BeerQuery.svelte";
  import type { Translation } from "$lib/entities/beer/tool/beer-dict";

  let error = "";
  let translation: Translation = [];

</script>

<BeerQuery bind:translation bind:error></BeerQuery>

{#if error}
  <P>{error}</P>
{:else}
  <BeerTranslation {translation}></BeerTranslation>
{/if}