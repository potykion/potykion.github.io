<script lang="ts">
	export let href: string;
	let class_ = '';
	export { class_ as class };
</script>

<a
	class={`text-blue-400 hover:text-blue-500 underline font-semibold ${class_}`}
	{href}
	target="_blank"
>
	<slot />
</a>
