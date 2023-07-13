<script>
	import Card from '$lib/shared/ui/Card.svelte';
	import H2 from '$lib/shared/ui/H2.svelte';
	import P from '$lib/shared/ui/P.svelte';
	import Ul from '$lib/shared/ui/Ul.svelte';
	import A from '$lib/shared/ui/A.svelte';
	import Callout from '$lib/entities/article/ui/Callout.svelte';
	import BlockWithImg from '../travel/ekat/BlockWithImg.svelte';
	import ImgSide from '$lib/entities/article/ui/ImgSide.svelte';
	import ShitMeter from './assets/shit-meter.jpeg';
</script>

<P>Не стоит работать в компаниях, где есть такие штуки:</P>

<Card>
	<H2>Плохой менеджмент</H2>

	<BlockWithImg>
		<Ul>
			<li><strong>Тимлид — мудак</strong>: не работайте с мудаками</li>

			<li>
				<strong><A href="https://youtu.be/6DrD_FucDK4">Микроменеджмент</A></strong>
				<Ul nested={true}>
					<li><i>Ну как там <del>с деньгами</del> с задачами, че, ебланишь сидишь?</i></li>
					<li>Принудительная работа из офиса</li>
					<li>Ежедневный статус чек</li>
				</Ul>
			</li>
			<li>
				<strong>Осуждение за баги</strong>

				<Ul nested>
					<li>
						<em>Ты опять ничего не тестил</em>
					</li>
					<li>
						<em>Ты свой код проверял?</em>
					</li>
					<li>
						<i>Чем меньше багов, тем лучше программист</i>
					</li>
					<li>
						<b>Fear Driven Development</b> - следствие осуждения за баги - ведет к тому что постоянно
						боимся что-то сломать, поэтому не рефакторим, не экспериментируем, скучаем, стрессуем
					</li>
				</Ul>
			</li>

			<li>
				<strong>Трекинг времени</strong>
				<Ul nested={true}>
					<li>Постоянный неприятный фон, что надо запускать таймер</li>
					<li>
						Оплата за сверхурочные хотфиксы = оплате за обычные задачи, но ты вообще-то ночью чето
						хуячишь на фоне паники/истерики
					</li>
					<li>
						<i>Обоснуй, почему задача заняла так много времени?</i>
					</li>
				</Ul>
			</li>

			<li>
				<b>Плохое планирование задач</b>
				<Ul nested={true}>
					<li><strong>Регулярные дедлайны</strong>: <em>сегодня успеешь задачу закрыть?</em></li>

					<li><strong>Скучные задачи</strong>: сделай 10 выгрузок пожалуйста</li>
					<li>
						<strong>Задачи не по профилю</strong>: ты python-backend, но позанимайся плиз фронтом,
						аналитикой, напиши плагин для 1с, вообще у нас тут новый проект на c# - займись им
					</li>
				</Ul>
			</li>
		</Ul>
		<ImgSide src={ShitMeter}>
			Из <A href="https://twitter.com/bunopus/status/1621418217892626434"
				>треда про терпимость к говну</A
			>
		</ImgSide>
	</BlockWithImg>

	<H2>Плохие процессы</H2>

	<Ul>
		<li><strong>Задержка ЗП</strong></li>

		<li><strong>Созвоны на час+</strong></li>
		<li><strong>Обсудили на созвоне, ничо не записали</strong>: и забыли</li>
		<li><strong>Ревью PR на 10+ файлов</strong>: задачи плохо декомпозированы</li>
		<li><strong>Просьбы в телеге, вместо задачи</strong></li>
		<li>
			<strong>Задачи без Definition of Done</strong>: в задаче нет описания того как должно работать
		</li>
	</Ul>

	<H2>Плохая автоматизация</H2>
	<Ul>
		<li>
			<strong>Отсутствие CI / деплоя по кнопке</strong>: без этого впустую тратится время + в деплой
			добавляется человеческий фактор
		</li>
		<li><strong>Ручное тестирование</strong>: ты бекер, а тебе фронт надо тыкать - почему???</li>
	</Ul>

	<H2>Плохая разработка</H2>
	<Ul>
		<li>
			<strong>Рефакторинг ради рефакторинга</strong>: нет проблем с кодом - но зачем-то рефакторим,
			не получая никакого ощутимого профита
		</li>
		<li>
			<strong>Тестирование ради тестирования</strong>: однотипные тесты, напр. что хендлер отдает
			200
		</li>
		<li><strong>Цензура в коде</strong>: нельзя использовать матюки, сленг, сокращения</li>
	</Ul>
</Card>
<Card>
	<H2>Какая работа хорошая</H2>
	<Ul>
		<li>
			<strong>Хорошие процессы</strong>: задачи по SMART, все задокументировано, отсутствие авралов
		</li>
		<li>
			<A href="https://youtu.be/jFSSV1pdZTw">blame-free environment</A>: не осуждают за ошибки
		</li>
		<li><strong>Сильная автоматизация</strong>: CI все проверит, задеплоит</li>
		<li><strong><i>Ничего не произойдет, если ты не будешь работать несколько дней</i></strong></li>
	</Ul>

	<Callout>
		Совет
		<div slot="desc">Оъебитесь от разрабов</div>
	</Callout>
</Card>
