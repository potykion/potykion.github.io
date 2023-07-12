<script lang="ts">
	import H1 from '$lib/shared/ui/H1.svelte';
	import { formatBeerTitle, type Beer, simplifyType, cutBeerTitle } from '$lib/entities/beer/beer';
	import { beers as parsedBeers_ } from '$lib/entities/beer/beer-list';
	import { findUntappdRating } from '$lib/entities/beer/untapd-beers';
	import BeerFilter from './BeerFilter.svelte';
	import { parseBeruVyhodnoy } from './parse-beru-vyhodnoy';
	import H2 from '$lib/shared/ui/H2.svelte';
	import Ul from '$lib/shared/ui/Ul.svelte';
	import H3 from '$lib/shared/ui/H3.svelte';
	import A from '$lib/shared/ui/A.svelte';

	let parsedBeers: Beer[] = parsedBeers_;
	$: beers = parsedBeers.map((beer) => ({
		...beer,
		title: beer.title.replaceAll('& ', '&'),
		type: simplifyType(beer.type)
	}));

	$: beerCountries = [...new Set(beers.map((b) => b.country))].sort();
	let selectedCountries: string[] = ['РОССИЯ'];

	$: beerBreweries = [
		...new Set(
			beers
				.filter((b) => b.brewery)
				.filter((b) => !selectedCountries.length || selectedCountries.includes(b.country))
				.map((b) => b.brewery)
		)
	].sort();
	let selecteBreweries: string[] = [];

	$: beerTypes = [
		...new Set(
			beers
				.filter((b) => !selectedCountries.length || selectedCountries.includes(b.country))
				.filter((b) => !selecteBreweries.length || selecteBreweries.includes(b.brewery))
				.map((b) => b.type)
		)
	].sort();
	let selectedBeerTypes: string[] = [];

	$: beersToShow = beers
		.filter((b) => b.brewery)
		.filter((b) => !selectedCountries.length || selectedCountries.includes(b.country))
		.filter((b) => !selectedBeerTypes.length || selectedBeerTypes.includes(b.type))
		.filter((b) => !selecteBreweries.length || selecteBreweries.includes(b.brewery))
		.sort((b1, b2) => b1.brewery.localeCompare(b2.brewery) || b1.type.localeCompare(b2.type));

	let loading = false;

	async function sync() {
		loading = true;
		try {
			const resp = await fetch('https://beruvyhodnoy.ru/stock/index.html?id=321215');
			const html = await resp.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			parsedBeers = parseBeruVyhodnoy(doc);
		} finally {
			loading = false;
		}
	}

	let breweriesGrid = [
		'Stamm',
		'AF Brew',
		'Alaska',
		'Panzer',
		'4BREWERS',
		'Saldens',
		'Jaws',
		'Gletcher',
		'Konix',
		'Brewlok',
		'Brewmen',
		'Big Village'
	];

	let beerTypesGrid: { title: string; desc: string; examples?: string[] }[] = [
		{ title: 'Лагер / Пилзнер', desc: 'Светлое', examples: ['AF Brew'] },
		{
			title: 'Пшеничное / Weiss',
			desc: 'Мутнячок / Светлое нефильтрованное',
			examples: ['Paulaner']
		},
		{
			title: 'Эль',
			desc: 'Ипы всякие, горчинистые',
			examples: ['Alaska', 'Panzer', 'Stamm', 'Jaws']
		},
		{ title: 'Портер / Стаут', desc: 'Темное', examples: ['Alaska'] },
		{ title: 'Gose', desc: 'С солью, обычно томатное', examples: ['Saldens'] },
		{ title: 'Smoothie', desc: 'Оч густое, с мякотью', examples: ['КУЛИNAR'] },
		{ title: 'Fruit', desc: 'Фруктовое', examples: ['Alaska', 'Panzer'] },
		{ title: 'Сидр', desc: 'Яблочное / грушевое', examples: ['Дальняя дача', 'Василеостровская'] },
		{
			title: 'Медовуха / Mead / Melomel',
			desc: 'Очевидно с медовым вкусом',
			examples: ['Традиции Предков / mjolnir']
		},
		{ title: 'Pastry', desc: 'Со вкусом сладостей', examples: ['КУЛИNAR'] }
	];
	let beerStatsGrid = [
		{ title: 'ABV', desc: 'Алкоголь' },
		{ title: 'IBU', desc: 'Горечь' },
		{ title: 'OG', desc: 'Плотность' }
	];
	let beerPlaces = [
		{ title: 'ВкусВилл', link: 'https://vkusvill.ru/' },
		{ title: 'Беру Выходной', link: 'https://beruvyhodnoy.ru/' },
		{ title: 'PenaPack', link: 'https://pena.moscow/' }
	];
</script>

<H1>Пивко</H1>

<p>
	<A href="https://untappd.com/user/potykion">https://untappd.com/user/potykion</A>
</p>

<H2>Нормальные пивоварни</H2>

<div class="grid grid-cols-3 gap-4">
	{#each breweriesGrid as beer}
		<div class="text-xl shadow p-4 rounded-xl flex space-y-2 flex-col justify-center">
			<div class="text-lg font-bold">{beer}</div>
		</div>
	{/each}
</div>

<H3>С осторожностью</H3>

<Ul>
	<li>Волковская</li>
</Ul>

<H2>Виды пив</H2>

<div class="grid grid-cols-4 gap-4">
	{#each beerTypesGrid as beer}
		<div class="text-xl shadow p-4 rounded-xl text-center flex space-y-2 flex-col justify-center">
			🍺
			<div class="text-lg font-bold">{beer.title}</div>
			<div class="text-sm">{beer.desc}</div>
			{#if beer.examples?.length}
				<div class="text-sm font-semibold">{beer.examples.join(' • ')}</div>
			{/if}
		</div>
	{/each}
</div>

<H2>Характеристики пивные</H2>

<div class="grid grid-cols-3 gap-4">
	{#each beerStatsGrid as beer}
		<div class="text-xl shadow p-4 rounded-xl flex space-y-2 flex-col justify-center">
			<div class="text-lg font-bold">{beer.title}</div>
			<div class="text-sm">{beer.desc}</div>
		</div>
	{/each}
</div>

<H2>Где брать</H2>

<div class="grid grid-cols-3 gap-4">
	{#each beerPlaces as beer}
		<a
			href={beer.link}
			class="text-xl shadow p-4 rounded-xl border-blue-300 hover:border-blue-500 border-2 flex space-y-2 flex-col justify-center"
		>
			<div class="text-lg font-bold">{beer.title}</div>
		</a>
	{/each}
</div>

<H2>Табл</H2>

<button
	on:click|preventDefault={sync}
	class="p-2 text-sm rounded-full border border-neutral-100 hover:bg-neutral-100"
	>{loading ? '⏳' : '🔃'}</button
>

<div class="flex space-x-4">
	<BeerFilter
		class="flex-1"
		label="Страна"
		bind:selectedOptions={selectedCountries}
		options={beerCountries}
	/>

	<BeerFilter
		class="flex-1"
		label="Пивоварня"
		bind:selectedOptions={selecteBreweries}
		options={beerBreweries}
	/>

	<BeerFilter
		class="flex-1"
		label="Стиль"
		bind:selectedOptions={selectedBeerTypes}
		options={beerTypes}
	/>
</div>

<table class="w-full text-sm">
	<thead>
		<tr>
			<th>Название</th>
			<th>Страна</th>
			<th>Стиль</th>
			<th>Пивоварня</th>
			<th>Пл. %</th>
			<th>Алк. %</th>
			<th>Цена</th>
			<th>Рейтинг</th>
		</tr>
	</thead>
	<tbody>
		{#each beersToShow as beer}
			<tr>
				<td class="p-2 hover:font-semibold cursor-pointer"
					><a
						href={`https://untappd.com/search?q=${cutBeerTitle(beer.title.replaceAll('&', '%26'))}`}
						target="_blank">{@html formatBeerTitle(beer.title)}</a
					></td
				>
				<td class="p-2">{beer.country}</td>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<td
					class="p-2 hover:font-semibold cursor-pointer"
					on:click={() => (selectedBeerTypes = [...selectedBeerTypes, beer.type])}>{beer.type}</td
				>
				<td class="p-2 text-cente hover:font-semibold cursor-pointer"
					><a href={`https://untappd.com/search?q=${beer.brewery}`} target="_blank"
						>{beer.brewery}</a
					></td
				>
				<td class="p-2 text-center">{beer.og}</td>
				<td class="p-2 text-center">{beer.abv}</td>
				<td class="p-2 text-center">{beer.price}</td>
				<td class="p-2 text-center">{findUntappdRating(beer) || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
