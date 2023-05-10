<script>

  import Zakat from "$lib/assets/nizhny/zakat.jpg";
  import ParkDay from "$lib/assets/nizhny/park-day.jpg";
  import ParkNight from "$lib/assets/nizhny/park-night.jpg";
  import StreetArt1 from "$lib/assets/nizhny/street-art-1.jpg";
  import StreetArt2 from "$lib/assets/nizhny/street-art-2.jpg";
  import StreetArt3 from "$lib/assets/nizhny/street-art-3.jpg";


  import Stairs1 from "$lib/assets/nizhny/stairs1.jpg";
  import Stairs2 from "$lib/assets/nizhny/stairs2.jpg";
  import Stairs3 from "$lib/assets/nizhny/stairs3.jpg";

  import Drift from "$lib/assets/nizhny/drift.mp4";
  import ArticleHeader from "$lib/design-system/molecules/ArticleHeader.svelte";
  import Bank from "$lib/assets/nizhny/bank.jpg";
  import Fns from "$lib/assets/nizhny/fns2.jpg";
  import House from "$lib/assets/nizhny/house.jpg";
  import Volga from "$lib/assets/nizhny/volga2.jpg";
  import Ymaps from "$lib/assets/nizhny/ymaps.png";

  let dark = false;
</script>

<style>
    .text-bw {
        background: linear-gradient(to right, black 0%, white 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
    }
</style>

<ArticleHeader>Нижний Новгород</ArticleHeader>

<div class="text-5xl md:text-9xl font-light">
  Нижний — это
</div>


<div class="relative">
  <!-- ВОЛГА -->
  <img class="rounded-xl" src={Volga}>
  <div
    class="text-5xl md:text-9xl font-black   text-indigo-200 opacity-90   absolute right-2 md:right-4 bottom-0 md:bottom-4"
    style=" text-shadow: black 2px 2px;"
  >
    Волга
  </div>
</div>

<div class="flex space-x-1 md:space-x-2 justify-center items-center relative">
  <!--  ЛЕСТНИЦЫ -->
  <img class="w-1/4 rounded" src={Stairs3}>
  <img class="w-1/3 rounded" src={Stairs2}>
  <img class="w-1/4 rounded" src={Stairs1}>

  <div class="absolute left-0 md:bottom-4 md:left-4 bottom-0">
    <div class="text-6xl md:text-9xl font-black text-orange-300 opacity-90" style=" text-shadow: black 2px 2px;">
      Лестницы
    </div>
  </div>
</div>


<div class="flex space-x-1 md:space-x-2 py-4  justify-center items-center relative">
  <!--  КОНТРАСТЫ -->
  <img class="w-1/4 md:w-1/3 rounded" src={Fns}>
  <img class="w-6/12 rounded" src={House}>
  <img class="w-1/4 md:w-1/3 rounded" src={Bank}>

  <div class="absolute left-0 bottom-0 md:bottom-4 md:left-4 ">
    <div class="text-6xl md:text-9xl font-black text-blue-200 opacity-90" style=" text-shadow: black 2px 2px;">
      Контрасты
    </div>
  </div>
</div>


<div class="flex space-x-1 md:space-x-2 justify-center items-center relative">
  <!--  СТРИТ АРТ -->
  <img class="w-1/3 rounded" src={StreetArt3}>
  <img class="w-5/12 rounded" src={StreetArt2}>
  <img class="w-1/3 rounded" src={StreetArt1}>

  <div class="absolute left-0 md:bottom-4 md:left-4 ">
    <div class="text-7xl md:text-9xl font-black text-teal-200 opacity-90" style=" text-shadow: black 2px 2px;">
      Стрит<span
      class="text-red-200">-</span><span class="text-yellow-200">арт</span>
    </div>
  </div>
</div>


<div class="relative">
  <!-- ЗАКАТ -->
  <img class="rounded-xl" src={Zakat}>
  <div
    class="text-6xl md:text-9xl font-black   text-rose-100 opacity-90   absolute left-2 md:left-4 bottom-0 md:bottom-4"
    style=" text-shadow: black 2px 2px;"
  >
    Закаты
  </div>
</div>

<div class="flex space-x-1 md:space-x-2 justify-center  relative">
  <!--  ДРИФТ -->
  <video src={Drift} class="w-9/12 md:w-5/12 h-96 md:h-full" controls></video>
  <div class="absolute left-0 bottom-16 md:bottom-48 md:left-32 ">
    <div class="text-7xl md:text-9xl font-black text-fuchsia-200 opacity-90" style=" text-shadow: black 2px 2px;">
      Дрифт
    </div>
  </div>
</div>


<div class="relative">
  <!--  ЧИЛЛ -->
  <img class="rounded-xl" src={dark ? ParkNight : ParkDay}>
  <button class="text-xl md:text-3xl absolute right-2 md:right-4 top-2 md:top-4"
          on:click={() => dark = !dark}>{dark ? '🌝' : '🌚'}</button>
  <div
    class=" text-6xl md:text-9xl absolute left-1 md:left-4 bottom-1 md:bottom-4  text-lime-100 opacity-90   font-black"
    style=" text-shadow: black 2px 2px;"

  >
    Чилл
  </div>
</div>

<div class="relative">
  <a href="https://yandex.ru/maps?bookmarks%5BpublicId%5D=N7wmM5Gc&utm_source=share&utm_campaign=bookmarks"
     class="border rounded-lg flex p-6 m-6 md:p-8 md:m-8 items-center space-x-4 hover:border-amber-400">
    <img src={Ymaps} class="w-6 ">

    <div>
      <div class="font-bold">Нижний Верифаед</div>
      <div class="text-neutral-400">8 мест • Доступен по ссылке</div>

    </div>
  </a>

  <div class="absolute left-0 -bottom-6 md:-bottom-16">
    <div
      class=" text-6xl md:text-9xl text-amber-100 opacity-90   font-black"
      style=" text-shadow: black 2px 2px;"

    >
      Вкусно
    </div>
  </div>


</div>