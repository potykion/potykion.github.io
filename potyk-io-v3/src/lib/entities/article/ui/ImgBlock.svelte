<script lang="ts">
	import Figure from '$lib/shared/ui/Figure.svelte';

	export let src: string;
	export let caption = '';
	export let alt = '';
</script>

<Figure>
	<img {src} class="rounded-xl w-full max-w-4xl" {alt} />
	<!-- svelte-ignore a11y-structure -->
	<figcaption>{caption}</figcaption>
</Figure>
