<script lang="ts">


  let type_: 'idea' | 'warn' = 'idea'
  export{type_ as type};

  $: bg = type_ === 'idea' ? 'bg-yellow-50' : 
  type_ === 'warn' ? 'bg-orange-50' : ''

  $: icon = type_ === 'idea' ? '💡' :
    type_ === 'warn' ? '⚠️' : ''

</script>

<div class={`rounded-xl shadow px-4 py-2 !my-6 md:p-4  flex space-x-2 ${bg}`}>
	<div class="py-2 text-lg md:text-xl">
		{icon}
	</div>
	<div>
		<div class="text-lg md:text-xl font-bold py-2">
			<slot />
		</div>
		<div class="mb-2">
			<slot name="desc" />
		</div>
	</div>
</div>
