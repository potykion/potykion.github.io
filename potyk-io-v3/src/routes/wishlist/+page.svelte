<script lang="ts">
	import MxKeys from '$lib/assets/wishlist/mx-keys.webp';
	import Grid3 from '$lib/design-system/atoms/Grid3.svelte';
	import H1 from '$lib/design-system/atoms/H1.svelte';
</script>

<H1>Вишлист</H1>

<Grid3>
	<div class="shadow rounded-lg py-4 bg-white">
		<img src={MxKeys} alt="mx-keys" class="" />

		<div class="px-4 space-y-2">
			<div>
				<div class="text-xl font-semibold">Logitech MX Keys</div>
				<div class="text-sm">Топ клава за большой бабос</div>
			</div>

			<div class="flex space-x-2">
				<a
					href="https://www.logitech.com/en-us/products/keyboards/mx-keys-wireless-keyboard.920-009294.html"
					target="_blank"
					class="text-black bg-sky-400 hover:bg-sky-500 rounded-lg inline-block px-3 py-2 font-semibold text-sm"
				>
					Logitech
				</a>

				<a
					href="https://ozon.ru/t/be62L7q"
					target="_blank"
					class="text-white bg-blue-600 hover:bg-blue-700 rounded-lg inline-block px-3 py-2 font-semibold text-sm"
				>
					OZON: ~17 000 ₽
				</a>
			</div>
		</div>
	</div>
</Grid3>
