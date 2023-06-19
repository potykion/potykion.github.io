<script lang="ts">
	import H1 from '$lib/design-system/atoms/H1.svelte';
	import Breadcrumbs from '$lib/design-system/molecules/Breadcrumbs.svelte';
	import type { Article } from '$lib/logic/articles';

	export let article: Article | null = null;
</script>

<div class="flex gap-2 bg-white">
	<div class="text-2xl md:text-5xl font-black">
		<Breadcrumbs />
	</div>
	<div class="flex flex-col md:gap-2">
		<H1>
			<slot>{article?.title}</slot>
		</H1>
		<div class="text-base md:text-xl italic">
			<slot name="desc">{article?.desc ?? ''}</slot>
		</div>
		<div class="flex">
			<slot name="tags" />
		</div>
	</div>
</div>
