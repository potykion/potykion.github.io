<script lang="ts">
	export let icon = '';

	let class_ = '';
	export { class_ as class };
</script>

{#if icon}
	<li class={`flex space-x-2 ${class_}`}>
		<div>{icon}</div>
		<div>
			<slot />
		</div>
	</li>
{:else}
	<li class={class_}><slot /></li>
{/if}
