<script lang="ts">
	let class_: string = '';
	export { class_ as class };

	export let nested = false;

	export let noListItems = false;
</script>

<ul
	class={`${
		noListItems ? '' : 'list-disc'
	} space-y-2 md:space-y-3 md:text-lg list-inside my-2 md:my-4 ${nested ? 'ml-6' : ''} ${class_} `}
>
	<slot />
</ul>
