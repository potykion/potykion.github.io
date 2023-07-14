<script lang="ts">
  import BeerTranslation from "$lib/entities/beer/tool/BeerTranslation.svelte";
  import { translateBeerQuery } from "$lib/features/beer/translate/translate.js";
  import type { Translation } from "$lib/entities/beer/tool/beer-dict";
  import P from "$lib/shared/ui/P.svelte";


  let translation: Translation = [];

  let timer: NodeJS.Timeout;

  const debounce = (func: () => void) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(), 300);
  };

  let beerQuery = "";

  let error = "";

  function translateDebounce() {
    debounce(() => {
      if (!beerQuery) {
        translation = []
        return;
      }

      translation = translateBeerQuery(beerQuery);
      if (!translation.length) {
        error = "Хз че это такое 🤷🏼‍♂️";
      } else {
        error = "";
      }
    });
  }

  function reset() {
    translation = [];
    beerQuery = "";
    error = "";
  }
</script>

<div class=" w-full  flex space-x-2 text-lg lg:text-xl  items-center">
  <input bind:value={beerQuery} on:input={translateDebounce} class="w-full p-4"
         placeholder="Введи что-нибудь пивное, напр. Hazelnut Stout">
  {#if beerQuery}
    <button class="p-2 rounded-full  " on:click={reset}>✖️</button>
  {/if}
</div>
<hr>


{#if error}
  <P>{error}</P>
{:else}
  <BeerTranslation {translation}></BeerTranslation>
{/if}