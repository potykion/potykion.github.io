<script lang="ts">
	import Donate from '$lib/widgets/Donate.svelte';
	import ArticlesList from '$lib/widgets/ArticlesList.svelte';
	import Projects from '$lib/widgets/Projects.svelte';
	import Reviews from '$lib/widgets/Reviews.svelte';
</script>

<div class=" space-y-4">
	<Projects />
	<ArticlesList />
	<Reviews />
	<Donate />
</div>
