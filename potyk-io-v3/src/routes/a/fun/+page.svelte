<script lang="ts">
	import H2 from '$lib/shared/ui/H2.svelte';
	import A from '$lib/shared/ui/A.svelte';
	import Ul from '$lib/shared/ui/Ul.svelte';
	import Card from '$lib/shared/ui/Card.svelte';
</script>

<iframe
	class="aspect-video w-full"
	src="https://whimsical.com/embed/XF2dKiC1GZd123WWAJy48W"
	title="Чем заняться"
/>

<Card>
	<H2>Еда</H2>

	<Ul class="space-y-2">
		<li>Еда — это лучшее чем можно заниматься в перерывах от работы</li>
		<li>
			В принципе, одного <b>кукинга</b> достаточно
			<ul class="list-disc list-inside ml-6">
				<li>Сразу получаешь <b>фидбек</b>: если чето горит, то сразу унюхаешь</li>
				<li>Наслаждаешься <b>результатом</b>: вкусно поесть — всегда хорошо</li>
				<li>Можно делать из этого <b>контент</b>: фотки, рецы</li>
				<li>
					Рецептики можно надыбать на ютубе: напр. <A href="https://www.youtube.com/@pro100kuhnya"
						>Просто Кухня</A
					>
				</li>
			</ul>
		</li>
		<li>
			Если хочется приготовить что-то в компашке, то <b>мастер-классы</b> — хороший вар
			<ul class="list-disc list-inside ml-6">
				<li>
					Проходит такое в кулинарных студиях: напр. <A href="https://studio.jvcompany.ru/"
						>Кулинарная студия Юлии Высоцкой</A
					> (не боись, <A href="https://youtube.com/shorts/S4YtjovXjyY?feature=share"
						>супа из раков</A
					> не будет), <A href="https://igra-stolov.com/">Игра Столов</A>
				</li>
			</ul>
		</li>
		<hr />
		<li>
			Если готовить не хочется, то очевидно идем в <b>рестик/кафешку</b>
			<Ul nested={true}>
				<li>Куда идти - выходит за рамки этой статьи</li>
			</Ul>
		</li>
		<li>
			<b>Гастрономия</b> — когда хочется поесть о_с_о_з_н_а_н_н_о
			<Ul nested={true}>
				<li>Гастрономия — когда вкусновато, но маловато</li>
				<li>
					Бывает как тупа ресторан, напр. <A href="https://harvestduo.ru/">Harvest</A> в Спб, так и курсы
					- когда приносят много маленьких блюд - напр. <A href="https://twinsgarden.ru/"
						>Twins Garden</A
					> в Мск
				</li>
				<li>
					Надо понимать, что стоит это немало, и
					<b>надо шарить в этом</b>, то есть это как дорогая проститутка - вроде секс как секс, но
					<b>зачем-то ты платишь в несколько раз больше - вот надо понимать зачем</b>, можешь ли ты
					понять задумку поваров
				</li>
			</Ul>
		</li>
		<hr />

		<li>
			<b>Дегустации</b> работают аналогично: напр. перед тобой 7 сыров и нужно понять че в них
			такого
			<Ul nested={true}>
				<li>Помимо сыров, дегустируют вино, пиво, мясо</li>
				<li>Найти, где продегустировать - легко - просто гуглим</li>
				<li>
					Напр. в <A
						href="https://chesom.com/syry_i_gastronomiya_dlya_gurmanov/obuchenie_i_degustatsii/"
						>Сырном Сомелье</A
					> регулярно проводятся
				</li>
				<li>
					Есть агрегаторы, типа <A href="https://aggrego.ru/degustacii-vin/">Aggrego</A> - там и вино,
					и сыры, и пиво
				</li>
				<li>
					Есть вариант, когда тебя кормят и читают лекцию - <A href="https://www.gedonistica.ru/"
						>Гедонистика</A
					> - но лекционного контента там больше чем еды
				</li>
			</Ul>
		</li>

		<li>
			Еще дегустации проводят на <b>производстве</b>:
			<Ul nested={true}>
				<li>
					Фабрика мороженного <A href="https://chlclub.ru/">Чистая линия</A> - можно отведать пломбира
					прям со станка + дегустация всех вкусов после экскурсии
				</li>
				<li>
					Пивные заводы: <A href="https://mosbrew.ru/excursion/">Московская Пивоваренная Компания</A
					>, <A href="https://www.gletcherbrewery.com/tours">Gletcher Brewery</A> - можно отведать соответственно
					разные сорта пивка
				</li>
				<li>
					Сыроварни, <A
						href="https://welcome.mosreg.ru/stories/top-15-turov-na-fermerskie-hozajstva-podmoskov-a"
						>тысячи их</A
					>, напр. <A href="https://parmezan.ru/excursion/">Олега Сироты</A> - жрем сырок и прочее фермерское
				</li>
			</Ul>
		</li>

		<li>Еще есть <b>фесты</b> — это дегустация на максималках</li>
		<Ul nested={true}>
			<li>Все также легко гуглится, есть <A href="https://beer-life.ru/events/">агрегаторы</A></li>
			<li>Из фестов, которые заинтересовали:</li>
			<li>
				<A href="https://www.gletcherbrewery.com/klin-may-fest-2023">Клин Май Фест</A> - пивной фест
				от <A href="https://www.gletcherbrewery.com/">Gletcher Brewery</A>
			</li>
			<li><A href="https://www.xn--h1aalkeccb4g.xn--p1ai/">Сыр Пир Мир</A> - фест про сыр</li>
		</Ul>
	</Ul>

	<p>Итого можно все свести к такому виду:</p>

	<table class="border-collapse">
		<thead>
			<tr>
				<th class="border p-2">Активность</th>
				<th class="border p-2">Сам готовишь?</th>
				<th class="border p-2"
					>Тебе дают указания?<br /><span class="font-normal italic"
						>(вы должны что-то сделать,<br /> что-то почувствовать)</span
					>
				</th>
				<th class="border p-2">Сколько времени читают лекции?</th>
				<th class="border p-2">Масштаб</th>
				<th class="border p-2">Цена</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="border p-2"><b>Кукинг</b></td>
				<td class="border p-2">Да</td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Не читают</td>
				<td class="border p-2">1-2 чела</td>
				<td class="border p-2">Сколько хочешь</td>
			</tr>
			<tr class="border-b-2 border-gray-300">
				<td class="border p-2"><b>Мастер-класс</b></td>
				<td class="border p-2">Да</td>
				<td class="border p-2">Да</td>
				<td class="border p-2">Чуток</td>
				<td class="border p-2">~10 челов</td>
				<td class="border p-2">2000 - 10000₽</td>
			</tr>

			<tr>
				<td class="border p-2"><b>Рестики/кафе</b></td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Не читают</td>
				<td class="border p-2">1-2 чела</td>
				<td class="border p-2">2000 - 5000₽</td>
			</tr>
			<tr class="border-b-2 border-gray-300">
				<td class="border p-2"><b>Гастрономия</b></td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Да</td>
				<td class="border p-2">Чуток</td>
				<td class="border p-2">1-2 чела</td>
				<td class="border p-2">2000 - 20000₽</td>
			</tr>
			<tr>
				<td class="border p-2"><b>Дегустация</b></td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Да</td>
				<td class="border p-2">Приемлемо</td>
				<td class="border p-2">~10 челов</td>
				<td class="border p-2">2000 - 8000₽</td>
			</tr>

			<tr>
				<td class="border p-2"><b>Производство</b></td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Приемлемо</td>
				<td class="border p-2">~30 челов</td>
				<td class="border p-2">500 - 3000₽</td>
			</tr>
			<tr>
				<td class="border p-2"><b>Фест</b></td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Нет</td>
				<td class="border p-2">Не читают</td>
				<td class="border p-2">100+ челов</td>
				<td class="border p-2">Сколько хочешь</td>
			</tr>
		</tbody>
	</table>
</Card>
