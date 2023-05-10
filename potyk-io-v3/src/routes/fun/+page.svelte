<script>
  import ArticleHeader from "$lib/design-system/molecules/ArticleHeader.svelte";
  import H2 from "$lib/design-system/atoms/H2.svelte";
  import A from "$lib/design-system/atoms/A.svelte";
  import Ul from "$lib/design-system/atoms/Ul.svelte";
</script>

<ArticleHeader>
  Отдых и развлечения
  <div slot="desc">
    Чем заниматься кроме работы
  </div>
</ArticleHeader>


<iframe class="aspect-video w-full" src="https://whimsical.com/embed/XF2dKiC1GZd123WWAJy48W"></iframe>

<H2>Еда</H2>

<Ul class="space-y-2">
  <li>
    Еда — это лучшее чем можно заниматься в перерывах от работы
  </li>
  <li>
    В принципе, одного <b>кукинга</b> достаточно
    <ul class="list-disc list-inside ml-6">
      <li>Сразу получаешь <b>фидбек</b>: если чето горит, то сразу унюхаешь</li>
      <li>Наслаждаешься <b>результатом</b>: вкусно поесть — всегда хорошо</li>
      <li>Можно делать из этого <b>контент</b>: фотки, рецы</li>
      <li>Рецептики можно надыбать на ютубе: напр. <A href="https://www.youtube.com/@pro100kuhnya">Просто Кухня</A></li>
    </ul>
  </li>
  <li>
    Если хочется приготовить что-то в компашке, то <b>мастер-классы</b> — хороший вар
    <ul class="list-disc list-inside ml-6">
      <li>Проходит такое в кулинарных студиях: напр. <A href="https://studio.jvcompany.ru/">Кулинарная студия Юлии Высоцкой</A> (не боись, <A href="https://youtube.com/shorts/S4YtjovXjyY?feature=share">супа из раков</A> не будет), <A href="https://igra-stolov.com/">Игра Столов</A></li>
    </ul>
  </li>
</Ul>
