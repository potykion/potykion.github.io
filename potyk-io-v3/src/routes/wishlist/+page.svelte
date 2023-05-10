<script lang="ts">
  import MxKeys from "$lib/assets/wishlist/mx-keys.webp";
  import Grid3 from "$lib/design-system/atoms/Grid3.svelte";
  import H1 from "$lib/design-system/atoms/H1.svelte";
  import ArticleHeader from "$lib/design-system/molecules/ArticleHeader.svelte";
  import GotyGrid from "$lib/design-system/molecules/GotyGrid.svelte";
  import Tag from "./Tag.svelte";
  import GotyCard from "$lib/design-system/molecules/GotyCard.svelte";
  import type { GotyCardData } from "$lib/logic/goty-card-data";

  let wishlist: GotyCardData[] = [
    {
      title: "Logitech MX Keys",
      subtitle: "Топ клава за большой бабос",
      img: MxKeys

    }
  ];
</script>

<ArticleHeader>
  Вишлист
</ArticleHeader>

<GotyGrid>
  {#each wishlist as data}
    <GotyCard {data} to="https://www.logitech.com/en-us/products/keyboards/mx-keys-wireless-keyboard.920-009294.html"></GotyCard>
  {/each}
</GotyGrid>


<!--<div class="shadow rounded-lg py-4 bg-white flex justify-center flex-col ">-->
<!--    <div class="aspect-video self-center flex justify-center flex-col">-->

<!--      <img src={MxKeys} alt="mx-keys" class="w-80  " />-->
<!--    </div>-->

<!--    <div class="px-4 space-y-2">-->
<!--      <div class="py-1">-->
<!--        <div class="text-xl font-semibold ">Logitech MX Keys</div>-->
<!--        <div class="text-sm">Топ клава за большой бабос</div>-->
<!--      </div>-->

<!--      <div class="flex space-x-2">-->
<!--        <Tag to="https://www.logitech.com/en-us/products/keyboards/mx-keys-wireless-keyboard.920-009294.html"-->
<!--             class="text-black bg-sky-400 hover:bg-sky-500">-->
<!--          Logitech-->
<!--        </Tag>-->
<!--        <Tag to="https://ozon.ru/t/be62L7q"-->
<!--             class="text-white bg-blue-600 hover:bg-blue-700">-->
<!--          OZON: ~17 000 ₽-->
<!--        </Tag>-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->