<script lang="ts">
	import Figure from '$lib/shared/ui/Figure.svelte';

	/**
	Использовать вместе с BlockWithImg
	*/

	export let src: string;

	export let caption = '';
	export let alt = '';
</script>

<Figure>
	<img class=" rounded-xl w-full md:w-fit max-w-sm" {src} {alt} />
	<!-- svelte-ignore a11y-structure -->
	<figcaption><slot>{caption}</slot></figcaption>
</Figure>
