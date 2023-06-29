<script>
	import H2 from '../atoms/H2.svelte';
	import GotyCard from '../molecules/GotyCard.svelte';
	import GotyGrid from '../molecules/GotyGrid.svelte';
	import Untappd from '$lib/assets/goty/2023/untappd.png';
</script>

<H2>Оцениваю</H2>

<GotyGrid>
	<GotyCard
		to="https://untappd.com/user/potykion"
		imgIcon={Untappd}
		title="Пивч"
		subtitle="в Untappd"
	/>
	<GotyCard
		to="https://potyk.notion.site/8007aeb3f46d4fe78ecdc36c2f9be2a8"
		icon="🍿"
		title="Снеки"
		subtitle="в Notion"
	/>
	<GotyCard to="https://rateyourmusic.com/~potykion" icon="🎵" title="Музяку" subtitle="в RYM" />
</GotyGrid>
