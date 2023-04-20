<script>
	import H1 from '$lib/design-system/atoms/H1.svelte';
	import { beers } from '$lib/logic/beer/beer-list';
</script>

<H1>Пивко</H1>

<table >
	<thead>
		<tr>
			<th>Название</th>
			<th>Страна</th>
			<th>Стиль</th>
			<th>Пивоварня</th>
			<th>Плотность</th>
			<th>Алк</th>
			<th>Цена</th>
		</tr>
	</thead>
	<tbody>
		{#each beers as beer}
			<tr>
				<td>{beer.title}</td>
				<td>{beer.country}</td>
				<td>{beer.type}</td>
				<td>{beer.brewery}</td>
				<td>{beer.og}</td>
				<td>{beer.abv}</td>
				<td>{beer.price}</td>
			</tr>
		{/each}
	</tbody>
</table>
