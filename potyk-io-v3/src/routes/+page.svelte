<script lang="ts">
	import Donate from '$lib/design-system/organisms/Donate.svelte';
	import ArticlesList from '$lib/design-system/templates/ArticlesList.svelte';
	import Projects from '$lib/design-system/templates/Projects.svelte';
	import Reviews from '$lib/design-system/templates/Reviews.svelte';
</script>

<div class=" space-y-4">
	<Projects />
	<ArticlesList />
	<Reviews />
	<Donate />
</div>
