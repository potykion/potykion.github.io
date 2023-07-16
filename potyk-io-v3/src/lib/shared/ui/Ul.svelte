<script lang="ts">
	let class_: string = '';
	export { class_ as class };

	export let nested = false;

	export let noListItems = false;
</script>

<ul
	class={`${
		noListItems ? '' : 'list-disc ml-6'
	} space-y-4 md:text-lg list-outside my-4  md:my-4 ${nested ? 'ml-6' : ''} ${class_} `}
>
	<slot />
</ul>
