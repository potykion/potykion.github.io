<script lang="ts">
  import type { GotyCardData } from "$lib/logic/goty-card-data";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faChrome, faGithub, faTwitter, faWindows } from "@fortawesome/free-brands-svg-icons";
  import { tags } from "$lib/logic/goty-card-data";

  export let data: GotyCardData | null = null;

  let extraClass: string | undefined = data?.extraClass;
  export { extraClass as class };
  export let extraStyle: string | undefined = data?.extraStyle;
  export let icon: string | undefined = data?.icon;
  export let imgIcon: string | undefined = data?.imgIcon;
  export let img: string | undefined = data?.img;
  export let title: string | undefined = data?.title;
  export let subtitle: string | undefined = data?.subtitle;
  export let music: "tsygun" | "garden" | undefined = data?.music;
  export let bg: string | undefined = data?.bg;
  export let to: string | undefined = data?.to;

  export let blank = true;
</script>


<svelte:element this={to ? 'a' : 'div'} href={to} target={blank ? "_blank" : "_self"}
                class={` rounded-xl  border-dashed border-4  span    flex flex-col bg-white
${to ? 'hover:filter hover:saturate-130 hover:border-blue-700 ' : ''}
        ${extraClass}
        ${data?.rows ? `lg:row-span-${data.rows}` : ''}
        ${data?.cols ? `lg:col-span-${data.cols}` : ''}
        `}
                style={extraStyle}>
  {#if img}
    <div class="grow flex flex-col justify-center ">
      <img src={img}
           class={` ${to ? '' : ''} rounded-xl  hover:backdrop-filter  m-2   `} />

    </div>
  {/if}
  {#if music === 'tsygun'}
    <iframe frameborder="0" class="h-full" src="https://music.yandex.ru/iframe/#album/23426419">Слушайте <a
      href="https://music.yandex.ru/album/23426419">Хворь</a> — <a
      href="https://music.yandex.ru/artist/8106971">Tsygun</a>
      на Яндекс Музыке
    </iframe>
  {:else if music === 'garden'}
    <iframe frameborder="0" class="h-full" width="100%"
            src="https://music.yandex.ru/iframe/#playlist/leybovich-nikita/1087">Слушайте <a
      href="https://music.yandex.ru/users/leybovich-nikita/playlists/1087">The Garden - Horseshit on Route
      66</a> — <a href="https://music.yandex.ru/users/leybovich-nikita">leybovich-nikita</a> на Яндекс Музыке
    </iframe>
  {/if}

  <!--${to ? 'hover:border-blue-400  border-blue-50 border-4' : 'border-none'}-->
  <div class={`flex items-center    space-x-4  text-lg px-4    h-24

    ${img ? 'rounded-b-xl ' : `rounded-xl ${to ? '' : ''}`}

    `} style={bg ? `background: ${bg}` : ''}>

    {#if icon}
      <span class="text-xl md:text-3xl">{icon}</span>
    {/if}
    {#if data?.faIcon}
      <span class="text-xl md:text-3xl">
        {#if data.faIcon === 'twitter'}
          <Fa icon={faTwitter} color="#1d9bf0"></Fa>
        {:else if data.faIcon === 'windows'}
          <Fa icon={faWindows} color="#00a4e3"></Fa>
        {:else if data.faIcon === 'github'}
          <Fa icon={faGithub}></Fa>
        {:else if data.faIcon === 'chrome'}
          <Fa icon={faChrome}></Fa>
        {/if}
      </span>
    {/if}

    {#if imgIcon}
      <img class="w-16" src={imgIcon} />
    {/if}

    <div>
      <div class="text-lg font-bold">
        <slot>{title}</slot>
      </div>
      <div class="text-sm font-normal">{subtitle ?? ''}</div>
    </div>

  </div>

  <!--{#if data.tags}-->
  <!--  <div class="flex gap-1 p-2 flex-wrap items-center flex-row-reverse">-->
  <!--    {#each data.tags as tag}-->
  <!--      <div class="w-fit text-sm py-1 px-3 bg-blue-50 hover:bg-blue-100  text-semibold rounded-full ">{tags[tag]}</div>-->
  <!--    {/each}-->
  <!--  </div>-->
  <!--{/if}-->

</svelte:element>
