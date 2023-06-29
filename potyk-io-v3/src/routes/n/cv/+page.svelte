<script>
	import ArticleHeader from '$lib/design-system/molecules/ArticleHeader.svelte';
	import H2 from '$lib/design-system/atoms/H2.svelte';
	import A from '$lib/design-system/atoms/A.svelte';
	import Ul from '$lib/design-system/atoms/Ul.svelte';
	import H3 from '$lib/design-system/atoms/H3.svelte';
	import Card from '$lib/design-system/atoms/Card.svelte';
	import Hr from '$lib/design-system/atoms/Hr.svelte';
	import P from '$lib/design-system/atoms/P.svelte';
	import CV from '$lib/assets/n/cv/cv.jpg';

	let hadBirthdayInThisYear = new Date().getMonth() === 12 && new Date().getDay() > 18;
	let age = new Date().getFullYear() - 1996 + (hadBirthdayInThisYear ? 0 : -1);
	let exp = new Date().getFullYear() - 2016;
</script>

<Card>
	<H2>TL;DR</H2>
	<img src={CV} class=" rounded-xl h-36 md:h-48 float-right ml-6" alt="Лицо" />

	<Ul>
		<li>Лейбович Никита • {age} лет • Москва</li>
		<li>Full Stack Developer • {exp} лет опыта</li>
		<li>
			<b>Backend:</b> Python • Django/FastAPI/Flask • Postgres/MySQL/Mongo/Elastic • Celery/Redis/RabbitMQ
			• pytest/mypy/ruff
		</li>
		<li><b>Frontend:</b> Svelte • TypeScript/JavaScript • TailwindCSS • Vue/Vuetify/Nuxt</li>
		<li>
			<b>Ops:</b> GoogleCloud/YandexCloud • GitHubActions/BitBucketPipelines • Docker
		</li>
		<!-- <li><b>Сферы:</b> Фудтех • ЭДО • Медичка • Фитнес</li> -->
		<li><b>Хобби:</b> Писать • Делать пет-проджекты • Слушать музыку • Пить пиво :)</li>
		<hr />
		<li>
			<b>Связаться:</b>
			<A href="https://t.me/potykion">Telegram</A> • <A href="mailto:potykion@gmail.com">Почта</A> •
			<A href="https://github.com/potykion">Github</A>
		</li>
	</Ul>
</Card>

<Card>
	<H2><A href="http://web-aspect.ru/">WebAspect</A> [2021 — 2023]</H2>

	<Ul class="space-y-2">
		<li><b>Стек:</b> Python + Django + Celery + Postgres + Redis</li>
		<li>
			Разрабатывал и поддерживал <A href="http://lins.ru/"
				>Радиологическую информационную систему ЛИНС</A
			>, позволяющую проводить КТ, МРТ, УЗИ и прочее
		</li>
		<li>
			Писал интеграции с другими медицинскими системами, такими как ЕРИС ЕМИАС — что позволило
			внедрять ПО в большее количество медицинских организаций
		</li>
		<li>
			Занимался оптимизациями баз данных: вынес логирование в отдельную базу данных, реализовал
			кеширование и оптимизацию запросов аналитики — что позволило снизить нагрузку на сервера, и
			ускорить генерацию статистики
		</li>
		<li>
			Реализовывал межсерверное взаимодействие между медицинскими организациями — что позволило
			получать историю обследований пациента в других медицинских организациях, а также упростило
			создание новостей и справочников
		</li>
		<li>
			По классике занимался поддержкой, закрывал всякие багулечки, писал тесты, делал рефакторинг —
			что улучшило стабильность системы, и упростило разработку
		</li>
	</Ul>
</Card>

<Card>
	<H2><A href="https://rbcn.mobi/">RuBeacon</A> [2016 — ...]</H2>

	<Ul class="space-y-2">
		<li><b>Стек:</b> Все, что указано в TL;DR</li>
		<li>
			Занимался сервером для мобильных приложений по доставке еды, включая разработку, поддержку,
			тестирование и развертывание
		</li>
		<li>
			Переписывал легаси сервер с Python 2 на Python 3, а также внедрил тесты, линтинг и
			автоматизацию билда и деплоя на CI - что позволило уменьшить техдолг и ускорило разработку
		</li>
		<li>
			Реализовал механизмы captcha, throttling и jwt - что улучшило безопасность и помогло справится
			с смс-спамом
		</li>
		<li>Переписывал отправку пушей через Firebase - иначе пуши бы отвалились =\</li>
		<li>
			Написал систему электронного документооборота, позволяющую генерировать документы по
			нескольким сотням юрлиц, и отправлять их в Почту России и сторонние системы, типа Pyrus —
			ускорив тем самым выставление счетов на оплату
		</li>
		<li>
			Писал интеграции с системами автоматизации ресторанов: Iiko, FrontPad, Mobidel, Poster,
			позволяющие выгружать меню, создавать заказы, участвовать в лояльности — что позволило
			работать с бОльшим количеством ресторанов
		</li>
		<li>
			Писал интеграции с банковскими и смс сервисами, а также работал над локализацией - что
			позволило запускаться в других странах
		</li>
		<li>
			Делал уведомления о заказах по почте и телеграм, а также админку для принятия заказов - что
			упростило ресторанам обработку заказов
		</li>
		<li>Занимался оптимизациями трат в облаке</li>
		<li>
			Написал систему для синхронизации данных из Google AppEngine DataStore в Google Bigquery, что
			ускорило генерацию отчетов + появилась возможность делать аналитику, используя BigQuery SQL
		</li>
	</Ul>

	<Hr />
	<P
		>Помимо основного продукта, компания занимается заказной разработкой, так я работал над
		мобильным приложением McDonald's и ПО для фитнес-клубов Kometa Fit:</P
	>

	<H3><A href="https://kometa.fit/">Kometa Fit</A> [2018 — 2020]</H3>

	<Ul class="space-y-2">
		<li><b>Стек:</b> C# / ASP.NET Core + Python + Flask + Nuxt</li>
		<li>
			Разработал админку для топ-менеджеров: отчеты, менеджмент тренеров, браслетов, цен на
			абонементы и прочее - что позволило автоматизировать перечисленные процессы и делегировать эти
			задачи менеджменту, вместо IT
		</li>
		<li>
			Занимался поддержкой: различные SQL-выгрузки, баг-фиксы, расследование инцидентов - что
			позволило функционировать фитнес-клубу в ситуации, когда прошлая команда разработки покинула
			компанию
		</li>
	</Ul>
	<Hr />

	<H3><A href="https://mcdonalds.ru/">McDonald's</A> [2017 — 2019]</H3>

	<Ul class="space-y-2">
		<li><b>Стек:</b> Python + Django + Celery + Elastic + MySQL</li>
		<li>
			Разрабатывал админку и API для мобильного приложения McDonald's - что позволило редактировать
			информацию о меню и ресторанах, а также получать данные в мобильном приложении
		</li>
		<li>
			Разрабатывал API для акции “Монополия”: возможность собирать стикеры, участие в розыгрыше
			призов - что позволило провести акцию
		</li>
		<li>
			Разрабатывал API для системы лояльности на чеках, а также плагин для кассы, который по
			QR-коду, добавлял в чек призовые позиции - что позволило повысить прибыль
		</li>
	</Ul>
</Card>
