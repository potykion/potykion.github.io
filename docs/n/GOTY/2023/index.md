---
hide:
  - toc
  - navigation
title: '2023'
---

<style>
.card {
    justify-content: space-between;
}
.card-text {
    border-top: 1px solid #dedede;
}
a {
    text-decoration: none;
}
a * {
    color: initial;

}


</style>

<script type="module">
  import { createApp } from 'https://unpkg.com/petite-vue?module';

  function Card(props) {
    return {
      $template: '#template-card',
      
      extraClass: props.extraClass,
      extraStyle: props.extraStyle,
      icon: props.icon,
      imgIcon: props.imgIcon,
      img: props.img,
      title: props.title,
      subtitle: props.subtitle,
      isLink: props.isLink ?? true,
      music: props.music,
      buildClass() {
            return `rounded-xl  shadow-md hover:scale-110 border-4 bg-white   ${this.isLink ? 'hover:border-blue-400  border-blue-50' : 'border-white'} ${this.extraClass}`
      },
    }
  }

  createApp({
    Card
  }).mount()
</script>

<template id="template-card">
    <div :class="buildClass()" :style="extraStyle">
        <img v-if="img" :src="img" class="rounded-t-xl" />
        <iframe v-if="music === 'tsygun'" frameborder="0" style="border:none;width:100%;height:450px;" width="100%" height="450" src="https://music.yandex.ru/iframe/#album/23426419">Слушайте <a href='https://music.yandex.ru/album/23426419'>Хворь</a> — <a href='https://music.yandex.ru/artist/8106971'>Tsygun</a> на Яндекс Музыке</iframe>
        <div class="flex items-center space-x-4 text-lg p-3">
        <span v-if="icon" class="text-2xl">{{ icon }}</span>
        <img v-if="imgIcon" :src="imgIcon" />
        <div>
            <div class="text-lg font-bold">{{ title  }}</div>
            <div class="text-sm font-normal">{{ subtitle }}</div>
        </div>
        </div>
    </div>
</template>

# 2023

<h2 class="font-bold"> Январь</h2>

<div class="grid-3-col" >

<a class="card hover:border-blue-400 border-4 border-blue-50" href="/g">
    <div></div>
    <img src="gazeta.jpg">
    <div class="card-text"><b>📝 Gazeta</b><br>
    <span class="small-font">Теперь все мои находки в одном месте</span></div>
</a>

<a class="card hover:border-blue-400 border-4 border-blue-50" href="https://www.alpacainfo.ru/">
<div></div>
<img src="alpaka.jfif">
<div class="card-text"><b>🦙 Альпаки</b><br>
<span class="small-font">Прикольные зверушки, можно кормить, гладить</span>
</div>
</a>

<a class="card hover:border-blue-400 border-4 border-blue-50" href="https://www.ozon.ru/category/winia-awx-70-sef/">
<div></div>
<img src="winia.jpg" class="rounded-xl">
<div class="card-text"><b>🔌 Winia AWX-70</b><br>
<span class="small-font">Вкатился в микро-климат, спится теперь хорошо</span>
</div>
</a>

<div class="card cols-2 ">
<iframe frameborder="0" style="border:none;width:100%;height:450px;" width="100%" height="450" src="https://music.yandex.ru/iframe/#playlist/leybovich-nikita/1087">Слушайте <a href='https://music.yandex.ru/users/leybovich-nikita/playlists/1087'>The Garden - Horseshit on Route 66</a> — <a href='https://music.yandex.ru/users/leybovich-nikita'>leybovich-nikita</a> на Яндекс Музыке</iframe>
<div class="card-text">🎵 Раз 10 переслушал, тупа нормальная панкуха</div>
</div>

<a class="card hover:border-blue-400 border-4 border-blue-50" href="https://bitbucket.org/product/features/pipelines">
<div></div>
<img src="pipelines.png">
<div class="card-text"><b>👷‍♂️ BitBucket Pipelines</b><br>
<span class="small-font">Тесты крутятся, деплои мутятся - CI в одном файле</span>
</div>
</a>

</div>

## Февраль

<div class="grid lg:grid-cols-3 gap-3">

<div class="rounded-xl shadow-md  hover:scale-110">
<img class="p-3" src="flask.jpg">
<div class="p-3">👷‍♂️ 6 лет живем с легаси и никак не можем перейти с Py2 на Py3 - начинали переписывать все с нуля, а потом дропали. А переписывать с нуля ничо и не надо! - надо просто <b>инкрементально переводить легаси на Flask</b>, а потом и на Python 3 - и, на удивление, <b><i>результатов уже больше, чем за несколько лет неудачных попыток переписывания</i></b></div>
</div>


<div class="rounded-xl shadow-md  hover:scale-110">
<img src="bobry.jpeg">
<div class="p-3">🚶‍♂️ Начал <b>гулять</b>: по парку походил, на уточек посмотрел, на пожранные бобрами деревья посмотрел<br>
<i><b>Гулять — лучшее занятие, чтобы почувствовать себя лучше</b></i>
</div>
</div>

<div v-scope="Card({img: 'bobry.jpeg', title: 'Начал гулять', subtitle: ''})"></div>


<a class="lg:row-span-2" href="https://www.imdb.com/title/tt3915174/" v-scope='Card({extraClass: "", img: "puss.jpg", title: "Кот в Сапогах 2", subtitle: "Рисовка — топ, саунд-диз — топ и Смерть — топ 💀", icon: "🎥"})'></a>



<div class="lg:col-span-2 lg:row-span-2" v-scope='Card({isLink: false, extraClass: "", title: "TSYGUN — Хворь", subtitle: "Бодро, пацы ебошут хорошо", icon: "🎵", music: "tsygun"})'>
</div>


<a class="lg:row-span-2" href="https://restoranmyzhenaty.ru/" v-scope='Card({extraClass: "", img: "piter-rebra.webp", title: "Питербрюх", subtitle: "Обжирались там — вот такие ребра заточили", icon: "😋"})' ></a>



<a  href="https://untappd.com/user/potykion" v-scope="Card({extraStyle: 'background:#ffce0d;', extraClass: '', imgIcon: 'untappd.png', title: 'Вкат в untappd', subtitle: 'Пьем и оцениваем пивчик',})"></a>
<a href="https://potyk.notion.site/ce52fff3e97c453ba4dcfed11a714ad7?v=370a091b38cb402c889d4e27145873ab" v-scope="Card({extraClass: '', icon: '🍿', title: 'Снекомания', subtitle: 'Рейтинг снеков всея Руси',})"></a>


</div>

## Март

<div class="grid lg:grid-cols-3 gap-3">



<a href="/b/work/bad-job/" v-scope="Card({extraClass: '', icon: '🏥', title: 'Дроп второй работы', subtitle: 'Собрал бинго хуевой работы',})"></a>
<a href="https://rateyourmusic.com/~potykion" v-scope="Card({extraClass: '!bg-sky-50', icon: '🎵', title: 'Вкат в RTM', subtitle: 'JPEGMAFIA, 100 gecs, slowthai',})"></a>
<div v-scope="Card({isLink: false, extraClass: 'bg-white ', icon: '👷', title: 'Вкат в Svelte и Go', subtitle: 'И камбек в TailwindCSS',})"></div>




</div>

- Побухали с Дениской в его ебенях
- Наконец-то почистил почту!
- Возвращение блудного сына
- Антифог!
- ПНК Рентал - все
