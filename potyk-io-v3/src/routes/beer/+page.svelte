<script lang="ts">
	import H1 from '$lib/design-system/atoms/H1.svelte';
	import { formatBeerTitle, type Beer, beerDetails, simplifyType, cutBeerTitle } from '$lib/logic/beer/beer';
	import { beers as parsedBeers_ } from '$lib/logic/beer/beer-list';
	import { findUntappdRating } from '$lib/logic/beer/untapd-beers';
	import BeerFilter from './BeerFilter.svelte';
	import { parseBeruVyhodnoy } from './parse-beru-vyhodnoy';

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
</script>

<div class="flex justify-between items-center">
	<H1>Пивко</H1>

	<button
		on:click|preventDefault={sync}
		class="p-2 text-sm rounded-full border border-neutral-100 hover:bg-neutral-100"
		>{loading ? '⏳' : '🔃'}</button
	>
</div>

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
					><a href={`https://untappd.com/search?q=${cutBeerTitle(beer.title.replaceAll('&', '%26'))}`} target="_blank"
						>{@html formatBeerTitle(beer.title)}</a
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
