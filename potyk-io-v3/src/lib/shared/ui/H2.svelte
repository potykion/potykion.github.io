<script lang="ts">
	export let borderBottom = true;
</script>

<h2 class={`text-2xl md:text-3xl font-bold py-2 mb-2 md:py-3 ${borderBottom ? 'border-b-gray-200 border-b' : ''}`}>
	<slot />
</h2>
