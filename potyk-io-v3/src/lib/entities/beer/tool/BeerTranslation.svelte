<script lang="ts">
  import Ul from "$lib/shared/ui/Ul.svelte";
  import type { Translation } from "$lib/entities/beer/tool/beer-dict";

  export let translation: Translation;
</script>

{#if translation.length}
  <Ul>
    {#each translation as trans}
      <li><span class="font-semibold">{trans.key}</span>: {trans.def}</li>
    {/each}
  </Ul>
{/if}