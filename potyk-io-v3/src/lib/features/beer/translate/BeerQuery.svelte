<script lang="ts">
  import { translateBeerQuery } from "$lib/features/beer/translate/translate.js";
  import type { Translation } from "$lib/entities/beer/tool/beer-dict";


  export let translation: Translation = [];
  export let error = "";

  let timer: NodeJS.Timeout;

  const debounce = (func: () => void) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(), 300);
  };

  let beerQuery = "";

  function translateDebounce() {
    debounce(() => {
      if (!beerQuery) {
        translation = [];
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
  <textarea bind:value={beerQuery} on:input={translateDebounce} class="w-full md:p-4"
            placeholder="Введи что-нибудь пивное, напр. Hazelnut Stout"></textarea>
  {#if beerQuery}
    <button class="md:p-2 rounded-full text-base md:text-lg" on:click={reset}>✖️</button>
  {/if}
</div>
<hr>

