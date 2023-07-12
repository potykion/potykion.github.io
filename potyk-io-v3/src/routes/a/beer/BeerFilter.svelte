<script lang="ts">

    export let label: string

    let class_: string
    export {class_ as class}


    export let options: any[];

    export let selectedOptions: any[]


</script>

<div class={`rounded shadow py-2 px-4 border-neutral-100  ${class_}`}>
	<div class="flex justify-between items-center">
		<label class="text-2xl font-semibold block py-2" for="countries"> {label} </label>
		<button
			on:click|preventDefault={() => (selectedOptions= [])}
			class="p-2 text-sm rounded-full border border-neutral-100 hover:bg-neutral-100">🧹</button
		>
	</div>
	<select
		id="countries"
		multiple
		bind:value={selectedOptions}
		class="w-full h-40  text-base !m-0"
	>
		{#each options as opt}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
</div>
