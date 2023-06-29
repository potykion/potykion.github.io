<script>
	import { articles } from '$lib/logic/articles';
	import H2 from '../atoms/H2.svelte';
	import GotyCard from '../molecules/GotyCard.svelte';
	import GotyGrid from '../molecules/GotyGrid.svelte';

	let cvArticle = 'n/cv';
</script>

<H2>Жду твой бабос</H2>

<GotyGrid>
	<GotyCard
		to="https://www.tinkoff.ru/rm/leybovich.nikita1/8PkYa74332/"
		title="Тиньк"
		subtitle="Сразу на карту"
		icon="💳"
	/>

	<GotyCard
		to="https://new.donatepay.ru/@potyk"
		icon="💰"
		title="donatepay"
		subtitle="Донатная классика"
	/>

	<GotyCard
		to="https://boosty.to/potyk-io"
		icon="🅱️"
		title="Бусти"
		subtitle="Регулярная поддержка"
	/>
	<GotyCard
		icon="👨🏼‍💼"
		blank={false}
		to={`/${cvArticle}`}
		title={articles[cvArticle].title}
		subtitle={articles[cvArticle].desc}
	/>
</GotyGrid>
