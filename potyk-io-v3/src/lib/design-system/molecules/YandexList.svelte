<script lang="ts">
	import Ymaps from '$lib/assets/nizhny/ymaps.png';

	export let amount: number;
	export let link: string;

	let class_ = '';
	export { class_ as class };
</script>

<a
	href={link}
	class="border rounded-lg flex p-4 md:p-8 items-center space-x-4 border-amber-400 hover:border-2 my-2 ${class_} bg-white"
>
	<img src={Ymaps} class="w-6" alt="icon" />

	<div>
		<div class="font-bold"><slot /></div>
		<div class="text-neutral-400">{amount} мест • Доступен по ссылке</div>
	</div>
</a>
