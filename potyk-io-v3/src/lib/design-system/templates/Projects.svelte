<script lang="ts">
	import A from '$lib/design-system/atoms/A.svelte';
	import GotyGrid from '$lib/design-system/molecules/GotyGrid.svelte';
	import GotyCard from '$lib/design-system/molecules/GotyCard.svelte';
	import LinkCard from '$lib/design-system/atoms/LinkCard.svelte';
	import Index from '$lib/assets/index.png';
	import { articles } from '$lib/logic/articles';

	import H2 from '../atoms/H2.svelte';
	import NewSup from '../molecules/NewSup.svelte';
</script>

<H2>Делаю</H2>

<GotyGrid>
	<GotyCard to="https://t.me/potyk_weekly" icon="📰" subtitle="Новости от потика в телеге">
		потик викли <NewSup />
	</GotyCard>

	<GotyCard to="https://potyk.io/potyk-base/" icon="🪨" title="potyk-base" subtitle="База знаний" />

	<GotyCard
		to="https://skovoroda.website.yandexcloud.net/"
		icon="🍳"
		title="скорода"
		subtitle="Книга рецептов"
	/>
	<GotyCard
		to="https://github.com/potykion/player"
		icon="🎵"
		title="🚧 плеер 🚧"
		subtitle="Нормальный музыкальный сервис"
	/>
</GotyGrid>
