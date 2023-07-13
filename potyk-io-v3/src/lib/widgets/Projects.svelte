<script lang="ts">
	import GotyGrid from '$lib/entities/goty/ui/GotyGrid.svelte';
	import GotyCard from '$lib/entities/goty/ui/GotyCard.svelte';

	import H2 from '$lib/shared/ui/H2.svelte';
	import NewSup from '$lib/shared/ui/NewSup.svelte';
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
