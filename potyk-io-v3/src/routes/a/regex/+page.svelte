<script lang="ts">
	import ArticleHeader from '$lib/entities/article/ui/ArticleHeader.svelte';
	import H2 from '$lib/shared/ui/H2.svelte';
	import IdeaRegex from '$lib/assets/regex/idea-regex.png';
	import A from '$lib/shared/ui/A.svelte';
	import Ul from '$lib/shared/ui/Ul.svelte';
	import CodeBlock from '$lib/shared/ui/CodeBlock.svelte';
	import { articles } from '$lib/entities/article/articles';
	import Card from '$lib/shared/ui/Card.svelte';
</script>

<Card>
	<Ul>
		<li>Регулярки сложно читать и сложно писать</li>
		<li>Приведу пару альтернатив регуляркам + дам пару советов как проще писать регулярки</li>
	</Ul>
</Card>
<Card>
	<H2>Решение типовых задач</H2>

	<Ul>
		<li>Часто регулярки используют для решения типовых задач: парс телефонов, почт, дат</li>
		<li>
			На все эти задачи есть более robust решения:
			<Ul class="ml-6">
				<li>
					<A href="https://dateutil.readthedocs.io/en/stable/"><code>python-dateutil</code></A> — для
					парса дат
				</li>
				<li>
					<A href="https://pypi.org/project/phonenumbers/"><code>phonenumbers</code></A> — для парса
					телефонов
				</li>
				<li>
					<A href="https://github.com/JoshData/python-email-validator"
						><code>email-validator</code></A
					> — для парса почт
				</li>
				<li>
					Либы для парсинга также содержат типовые парсеры: так <A
						href="https://docs.pydantic.dev/latest/usage/types/"><code>pydantic</code></A
					>
					умеет парсить урлы, цвета, карты и прочее
				</li>
			</Ul>
		</li>
	</Ul>
</Card>
<Card>
	<H2>Есть тулы мощнее регулярок</H2>

	<p>
		<A href="https://pypi.org/project/parse/"><code>parse</code></A> — как раз такой пример:
	</p>

	<Ul>
		<li>
			По базе предоставляет более читаемый синтаксис чем регулярки:
			<CodeBlock class="md:ml-6"
				>{`r = parse("Bring out the holy {item}", "Bring out the holy hand grenade")
print(r)
<Result () {'item': 'hand grenade'}>
`}</CodeBlock
			>
		</li>

		<li>
			Можно еще и делать мощные штуки: напр. парсить определенные слова в bool
			<CodeBlock class="md:ml-6"
				>{`yesno_mapping = {
    "yes":  True,   "no":    False,
    "on":   True,   "off":   False,
    "true": True,   "false": False,
}

@with_pattern(r"|".join(yesno_mapping))
def parse_yesno(text):
    return yesno_mapping[text.lower()]`}</CodeBlock
			>
		</li>
	</Ul>
</Card>
<Card>
	<H2>Если очень надо</H2>

	<p>Если очень надо написать регулярку, то упростить процесс их написания помогут:</p>

	<Ul class="">
		<li>
			Чекеры регулярок, типа <A href="https://regex101.com/">regex101</A>
		</li>

		<li>
			Чекер регулярок прям в IDE
			<img class="ml-6 border rounded p-4 m-2" src={IdeaRegex} alt="Чекер регулярок прям в IDE" />
		</li>

		<li>
			Конечно же писать <b>юнит-тесты</b>
		</li>

		<li>
			Мы же вошли в эпоху AI — так что имеет смысл <A href="/tools?tag=ai">спросить совета у AI</A>
		</li>

		<li>
			Всегда полезно обновить знания по регуляркам:
			<Ul class="ml-6">
				<li>
					Напр. кол-во повторяющийся символов можно указать в скобках:
					<code>{`\\d{3}`}</code>
				</li>
				<li>
					А для матчинга любого символа нужно использовать специальный флаг — <code
						>{`re.DOTALL`}</code
					>
				</li>
			</Ul>
		</li>
	</Ul>
</Card>
