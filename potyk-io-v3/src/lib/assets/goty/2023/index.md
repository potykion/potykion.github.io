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






</div>

## Февраль

<div class="grid lg:grid-cols-3 gap-3">














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
