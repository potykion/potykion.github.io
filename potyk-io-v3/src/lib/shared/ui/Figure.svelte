<script>
	let class_ = '';
	export { class_ as class };
</script>

<figure
	class={`flex items-center flex-col py-4 text-center text-sm text-gray-400 space-y-2
	${class_}`}
>
	<slot />
</figure>
