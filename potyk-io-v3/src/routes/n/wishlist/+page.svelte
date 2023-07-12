<script lang="ts">
	import MxKeys from '$lib/assets/wishlist/mx-keys.webp';
	import GotyGrid from '$lib/entities/goty/ui/GotyGrid.svelte';
	import GotyCard from '$lib/entities/goty/ui/GotyCard.svelte';
	import type { GotyCardData } from '$lib/entities/goty/goty-card-data';

	let wishlist: GotyCardData[] = [
		{
			title: 'Logitech MX Keys',
			subtitle: 'Топ клава за большой бабос',
			img: MxKeys
		}
	];
</script>

<GotyGrid>
	{#each wishlist as data}
		<GotyCard
			{data}
			to="https://www.logitech.com/en-us/products/keyboards/mx-keys-wireless-keyboard.920-009294.html"
		/>
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
