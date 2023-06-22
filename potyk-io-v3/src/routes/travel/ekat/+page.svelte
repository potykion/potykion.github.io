<script lang="ts">
  import A from "$lib/design-system/atoms/A.svelte";
  import H2 from "$lib/design-system/atoms/H2.svelte";
  import H3 from "$lib/design-system/atoms/H3.svelte";
  import Li from "$lib/design-system/atoms/Li.svelte";
  import P from "$lib/design-system/atoms/P.svelte";
  import Ul from "$lib/design-system/atoms/Ul.svelte";
  import ArticleHeader from "$lib/design-system/molecules/ArticleHeader.svelte";
  import Callout from "$lib/design-system/molecules/Callout.svelte";
  import YandexList from "$lib/design-system/molecules/YandexList.svelte";
  import Card from "$lib/design-system/atoms/Card.svelte";
  import Gena from "$lib/assets/travel/ekb/ekb-gena.jpg";
  import Sevastyanov from "$lib/assets/travel/ekb/ekb-sevastyanov.jpg";
  import Shawa from "$lib/assets/travel/ekb/ekb-shawa.jpg";
  import Zhab from "$lib/assets/travel/ekb/ekb-zhab.jpg";
  import Elcin from "$lib/assets/travel/ekb/ekb-elcin.jpg";
  import Figure from "$lib/design-system/atoms/Figure.svelte";
  import ImgBlock from "$lib/design-system/molecules/ImgBlock.svelte";
  import ImgSide from "$lib/design-system/molecules/ImgSide.svelte";
  import BlockWithImg from "./BlockWithImg.svelte";
  import Hr from "$lib/design-system/atoms/Hr.svelte";
</script>

<div class="space-y-3 md:space-y-5 !mt-0">
  <Card>
    <!--    <P><i>Все места на Яндекс Картах:</i></P>-->
    <H2 borderBottom={false}>Все места на ЯКартах</H2>
    <YandexList
      amount={23}
      link="https://yandex.ru/maps?bookmarks%5BpublicId%5D=Y_xX3qTb&utm_source=share&utm_campaign=bookmarks"
    >
      Екат Проверенный
    </YandexList>
  </Card>

  <Card>
    <H2>Как добраться</H2>
    <Ul noListItems={true}>
      <Li class="font-semibold" icon="✈️">SVO ➡️ SVX ~ 2 ч.</Li>
      <Li class="font-semibold" icon="🚕">Аэропорт ➡️ Пл. 1905 года ~ 30 мин.</Li>
    </Ul>
  </Card>

  <Card>
    <H2>Как было у нас</H2>
    <H3>День 1</H3>
    <BlockWithImg>
      <Ul noListItems={true}>
        <Li icon="🏨"
        ><A href="https://radiusrentapart.turbo.site/">Радиус Централ Хаус</A> - разместились здесь
        </Li
        >
        <Li icon="🍴"><A href="https://dvadeda.ru/">Два Деда</A> — уральские пельмени и чебуреки, а также НаСтОЕчкИ</Li>
        <Li icon="🛌🏼"><i>(после ассорти пельменей и настоек надо поспать)</i></Li>
        <Li icon="🏢">
          <A href="https://yeltsin.ru/">Ельцин Центр</A> — тут движуха всякая: магазики, музеи, галереи,
          спорт
        </Li>
        <Li icon="🍴">
          <A href="https://barboris.info/">Барборис</A> — солидный рестик, тоже уральская кухня: грибочки
          грузди, козленок
        </Li>
      </Ul>

      <ImgSide src={Elcin} caption="В Ельцин-центре - много Ельцина"></ImgSide>
    </BlockWithImg>
    <Hr></Hr>

    <H3>День 2</H3>
    <BlockWithImg>
      <Ul noListItems={true}>
        <Li icon="🍴">
          <A href="https://engelscoffee.ru/">Engels</A> — норм завтраки: континентальным завтраком обжираешься
        </Li>
        <Callout>
          Местная особенность
          <div slot="desc">
            В Екате далеко не везде принято бронировать — так что будь готов размещаться по факту
          </div>
        </Callout>
        <Li icon="🚶🏼">
          <A href="https://www.ekbredline.ru/">Красная линия Екатеринбурга</A> — мастхев чтобы узнать город:
          красная линия, проходящая по центру города, которая освещает основные достопримечательности
        </Li>
        <Li icon="🍴">
          <A href="https://yandex.ru/maps/-/CCU9RIWJkA">Мангалыч</A> — Бомбическая Шаурма — так и называется:
          размером с локоть, нереально вкусная — но желающих так много, что
          <b>придется подождать минут 40</b>
        </Li>
        <Li icon="🛌🏼"><i>(после шаурмы с локоть надо поспать)</i></Li>
        <Li icon="🚶🏼">
          <A href="https://yandex.ru/maps/-/CCU9RIXScA">УралМаш</A> — ехать туда стоит только если хочешь
          шаурмы, а так <b>не надо</b>, там тебе не будут рады: так мы, выйдя из метро, первое что мы
          увидели - это девочка в футболке "Иди нахуй"; а потом были орки, много орков: просто в 2
          часа дня уже убитые-упитые ходят-плетутся
        </Li>
        <Li icon="🍴">
          <A href="https://nigora.ru/">Нигора</A> — чайхона, но балдежная: стройное меню, низкие цены,
          нормальные порции и все вкусное: лагман, плов, манты, морковочка, чайок
        </Li>
      </Ul>

      <ImgSide caption="Шава по локоть" src={Shawa}></ImgSide>
    </BlockWithImg>
    <Hr></Hr>

    <H3>День 3</H3>
    <BlockWithImg>
      <Ul>
        <Li icon="🍴"><A href="https://gorozhane.me/">Горожане</A> — оч кайфовые завтраки и десерты</Li>
        <Li icon="🚶🏼"><A href="https://experience.tripster.ru/experience/13324/">Екатеринбург — столица
          конструктивизма</A> — экскурсия из 2 частей - 2 экскурсоводов: первый - бодрый дядечка, рассказывает че такое
          конструктивизм, что важно - <b>интерактивит</b>: задает вопросы тебе, проверяет че ты усвоил; вторая половина
          -
          про быт чекистов - просто лекция с заходом в хату - тоже типа интерактив, но маленький
        </Li>
        <Li icon="🍴"><span class="line-through">Jo Wu Ramen Bar</span> > <A
          href="https://jackiebistro.ru/">Jackie</A>: хотели рамена, но чет там тесно, долго ждать, пошли в китайку -
          норм
          супчики
        </Li>
        <Li icon="🚶🏼">
          <A href="https://главныйпроспект.рф/">Главный проспект</A> — тут всякие выставки: картины, камушки, арт-хуярт
        </Li>
        <Li icon="🍴"><A href="https://grinvich.com/">ТРЦ Гринвич</A> - местная большая тцшка, идти стоит за <b>памятником
          Гены Букина</b> и фудмаркетом <A href="https://estory.market/">Estory</A>- тут можно попробовать блюда из
          разных
          кафешек еката: тот же Jackie, TomYum Bar, <b>Shrmps & brgrs, Креветки и Мидии</b> - креветки в екате
          распространены и вкусны
        </Li>
      </Ul>

      <ImgSide caption="Гена Букин " src={Gena}></ImgSide>
    </BlockWithImg>
    <Hr></Hr>

    <H3>День 4</H3>
    <Ul>
      <Li icon="🍴"><A href="https://gorozhane.me/">Горожане</A> — настолько кайфовые завтраки, что еще раз можно сходить
      </Li>
      <Li icon="🍴"><A href="https://agonagon.ru/">Агонь</A> - хороши грилль-штуки, типа колбасок; стейки норм, но все же
        в Нижнем вкуснее
      </Li>
      <Li icon="🚶🏼"><A
        href="https://www.sputnik8.com/ru/ekaterinburg/activities/18400-obzornaya-peshehodnaya-ekskursiya-po-ekaterinburgu?from_listing=true">Обзорка</A>
        - в последний день обзорочка - гениальноэ - но по сути все прошли уже по Красной линии
      </Li>
      <ImgBlock src={Sevastyanov} caption="Дом Севастьянова - оч красивоэ"></ImgBlock>
      <Li icon="🍴">TomYum Bar - том ям норм, но ничего кроме него брать не стоит</Li>
    </Ul>
  </Card>
</div>
