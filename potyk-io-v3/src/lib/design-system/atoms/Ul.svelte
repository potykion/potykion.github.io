<script lang="ts">
	let class_: string = '';
	export { class_ as class };

	export let nested = false;

	export let noListItems = false;
</script>

<ul
	class={`${
		noListItems ? '' : 'list-disc'
	} space-y-4 md:text-lg list-inside my-4 md:my-4 ${nested ? 'ml-6' : ''} ${class_} `}
>
	<slot />
</ul>
