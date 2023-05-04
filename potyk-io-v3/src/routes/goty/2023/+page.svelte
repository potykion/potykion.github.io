<script>
  import H1 from "$lib/design-system/atoms/H1.svelte";
  import H2 from "$lib/design-system/atoms/H2.svelte";
  import GotyCard from "$lib/design-system/molecules/GotyCard.svelte";
  import Gazeta from "$lib/assets/goty/2023/gazeta.jpg";
  import Alpaca from "$lib/assets/goty/2023/alpaka.jfif";
  import Winia from "$lib/assets/goty/2023/winia.webp";
  import Pipelines from "$lib/assets/goty/2023/pipelines.png";
  import GotyGrid from "$lib/design-system/molecules/GotyGrid.svelte";
  import Flask from "$lib/assets/goty/2023/flask.jpg";
  import Bobry from "$lib/assets/goty/2023/bobry.jpeg";
  import Puss from "$lib/assets/goty/2023/puss.jpg";
  import PiterRebra from "$lib/assets/goty/2023/piter-rebra.webp";
  import Untappd from "$lib/assets/goty/2023/untappd.png";
  import Breadcrumbs from "$lib/design-system/molecules/Breadcrumbs.svelte";
  import ArticleHeader from "$lib/design-system/molecules/ArticleHeader.svelte";
</script>

<ArticleHeader>GOTY • 2023 • 🍺👨‍💻🍟</ArticleHeader>

<H2>Январь</H2>

<GotyGrid>
  <GotyCard to="https://www.alpacainfo.ru/" img={Alpaca} icon="🦙" title="Альпаки" padImg={false}
            subtitle="Прикольные зверушки, можно кормить, гладить"></GotyCard>

  <GotyCard to="https://potyk.io/g" img={Gazeta} icon="📝" title="Gazeta" padImg={true}
            subtitle="Теперь все мои находки в одном месте"></GotyCard>


  <GotyCard to="https://www.ozon.ru/category/winia-awx-70-sef/" img={Winia} icon="🔌" title="Winia AWX-70"

            subtitle="Вкатился в микро-климат, спится теперь хорошо"></GotyCard>

  <GotyCard class="md:col-span-2 " icon="🎵" title="Garden — Horseshit on Route 66"
            subtitle="Раз 10 переслушал, тупа нормальная панкуха" music="garden"></GotyCard>

  <GotyCard to="https://bitbucket.org/product/features/pipelines" icon="👷‍♂️" img={Pipelines}
            title="BitBucket Pipelines" padImg={true}
            subtitle="Тесты крутятся, деплои мутятся - CI в одном файле"></GotyCard>
</GotyGrid>

<H2>Февраль</H2>

<GotyGrid>
  <GotyCard img={Flask} icon="👷‍♂️" title="Переход на Flask" isLink={false} padImg={true}
            subtitle="Понял что с легаси надо бороться инкрементально"></GotyCard>


  <GotyCard img={Bobry} icon="🚶‍♂️" title="Начал гулять"
            subtitle="Гулять — лучшее занятие, чтобы почувствовать себя лучше" isLink={false}>
  </GotyCard>

  <GotyCard class="lg:row-span-2" to="https://www.imdb.com/title/tt3915174/" img={Puss} title="Кот в Сапогах 2"
            subtitle="Рисовка — топ, саунд-диз — топ и Смерть — топ 💀"
            icon="🎥"></GotyCard>

  <GotyCard class="lg:col-span-2 lg:row-span-2" isLink={false} title="TSYGUN — Хворь"
            subtitle="Бодро, пацы ебошут хорошо" icon="🎵" music="tsygun">
  </GotyCard>

  <GotyCard class="lg:row-span-2" to="https://restoranmyzhenaty.ru/"
            img={PiterRebra} title="Питербрюх" subtitle="Обжирались там — вот такие ребра заточили"
            icon="😋"></GotyCard>

  <GotyCard to="https://potyk.notion.site/ce52fff3e97c453ba4dcfed11a714ad7?v=370a091b38cb402c889d4e27145873ab"
            icon="🍿" title="Снекомания" subtitle="Делаем рейтинг снеков всея Руси"></GotyCard>

  <GotyCard to="https://untappd.com/user/potykion" bg="#ffce0d" imgIcon={Untappd}
            title="Вкат в untappd"
            subtitle="Теперь пьем пив и оцениваем"></GotyCard>
</GotyGrid>

<H2>Март</H2>

<GotyGrid>


  <GotyCard to="https://potyk.io/b/work/bad-job/"
            icon="🏥" title="Дроп второй работы" subtitle="Собрал бинго хуевой работы"></GotyCard>

  <GotyCard to="https://rateyourmusic.com/~potykion" icon="🎵" title="Вкат в RYM"
            subtitle="Заревьювил свежих JPEGMAFIA, 100 gecs, slowthai"></GotyCard>

  <GotyCard icon="👷" title="Вкат в Svelte и Go" subtitle="И камбек в TailwindCSS"></GotyCard>

</GotyGrid>

<ul>
  <li> Побухали с Дениской в его ебенях</li>
  <li> Наконец-то почистил почту!</li>
  <li> Возвращение блудного сына</li>
  <li> Антифог!</li>
  <li> ПНК Рентал - все</li>
</ul>

<H2>Апрель</H2>

<ul>
  <li>Нижний</li>
  <li>Новые проекты: плеер, сковорода, blog v3 & beer</li>
  <li>ai-coding-tools</li>
  <li></li>
</ul>

