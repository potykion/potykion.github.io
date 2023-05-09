<script lang="ts">
  import ArticleHeader from "$lib/design-system/molecules/ArticleHeader.svelte";
  import H2 from "$lib/design-system/atoms/H2.svelte";
  import GotyGrid from "$lib/design-system/molecules/GotyGrid.svelte";
  import MagicEraser from "$lib/assets/tools/magic-eraser.gif";
  import MagicStudio from "$lib/assets/tools/magic-studio.png";
  import TinyWow from "$lib/assets/tools/tiny-wow.png";
  import EraseBg from "$lib/assets/tools/erase-bg.png";
  import GotyCard from "$lib/design-system/molecules/GotyCard.svelte";
  import Mobbin from "$lib/assets/tools/mobbin.webp";
  import Chamjo from "$lib/assets/tools/chamjo.jpg";
  import Dribbble from "$lib/assets/tools/dribbble.png";
  import DevToys from "$lib/assets/tools/devtoys.png";
  import ShareX from "$lib/assets/tools/ShareX_Logo.png";
  import DevToysInterface from "$lib/assets/tools/devtoys-interface.png";
  import PowerToys from "$lib/assets/tools/powertoys.png";
  import Squoosh from "$lib/assets/tools/squoosh.jpg";
  import Surfshark from "$lib/assets/tools/surfshark.webp";
  import FuckRKN from "$lib/assets/tools/fuckrkn.png";
  import VanyaVPN from "$lib/assets/tools/vanyavpn.png";
  import Lorem from "$lib/assets/tools/lorem.svg";
  import DogApi from "$lib/assets/tools/dog-api-logo.svg";
  import FaLang from "$lib/assets/tools/fa-language.svg";
  import Phind from "$lib/assets/tools/phind.jpg";
  import RapidApi from "$lib/assets/tools/rapidapi.webp";
  import AwsCw from "$lib/assets/tools/aws-cw.svg";
  import Copilot from "$lib/assets/tools/copilot.png";
  import VcRu from "$lib/assets/tools/Vc.ru-logo.png";
  import type { GotyCardData, Tag } from "$lib/logic/goty-card-data";
  import { tags } from "$lib/logic/goty-card-data";


  const sections: { section: string, cards: (GotyCardData & { tags: Tag[] })[] }[] = [
    {
      section: "Десигн", cards: [
        {
          to: "https://mobbin.com/browse/ios/apps/",
          title: "Mobbin",
          imgIcon: Mobbin,
          subtitle: "Скрины приложух",
          tags: ["design"]
        },
        {
          bg: "#ffe4d3",
          to: "https://chamjo.design/",
          title: "Chamjo",
          imgIcon: Chamjo,
          subtitle: "Еще скрины приложух",
          tags: ["design"]
        },
        {
          to: "https://dribbble.com/",
          title: "Dribbble",
          imgIcon: Dribbble,
          subtitle: "Дезигн несуществующих приложух",
          tags: ["design"]
        }
      ]
    },
    {
      section: "Графика / диаграммы", cards: [
        {
          to: "https://whimsical.com/",
          title: "Whimsical",
          subtitle: "Лучший диаграмминг, вайтбординг",
          tags: ["diagrams"]
        },
        { to: "https://miro.com/", title: "Miro", subtitle: "Диаграмминг, вайтбординг похуже", tags: ["diagrams"] },
        {
          to: "https://app.diagrams.net/",
          title: "Diagrams.net (ex. Draw.io)",
          subtitle: "Формальный диаграмминг",
          tags: ["diagrams"]
        },
        { to: "https://mermaid.js.org/", title: "Mermaid", subtitle: "Диаграммы как код", tags: ["diagrams"] },
        { to: "https://excalidraw.com/", title: "Excalidraw", subtitle: "Hand-drawn рисовалка", tags: ["diagrams"] }
      ]
    },
    {
      section: "Тырилки",
      cards: [
        {
          title: "yt-dlp",
          subtitle: "Скачиватель видосов с YouTube",
          to: "https://github.com/yt-dlp/yt-dlp",
          tags: ["cli", "yt"],
          faIcon: "github"
        },
        {
          title: "Screenshot YouTube",
          to: "https://chrome.google.com/webstore/detail/screenshot-youtube/gjoijpfmdhbjkkgnmahganhoinjjpohk",
          tags: ["ext", "yt"],
          faIcon: "chrome",
          subtitle: "Скриншотит youtube-видео без кнопок"
        },
        {
          title: "Yandex Music Downloader",
          to: "https://chrome.google.com/webstore/detail/yandex-music-downloader/agkcaldeglaadeknkclfbpdojhhclfej",
          tags: ["ext"],
          subtitle: "Качает музыку из Яндекс Музыки",
          faIcon: "chrome"
        },

        {
          title: "VK Flex",
          to: "https://chrome.google.com/webstore/detail/vk-flex/ljbmkjikheoaglnnifnghjbknejbmhap",
          tags: ["ext"],
          subtitle: "Качает видео из ВК",
          faIcon: "chrome"

        },
        {
          title: "TabCopy",
          to: "https://chrome.google.com/webstore/detail/tabcopy/micdllihgoppmejpecmkilggmaagfdmb",
          tags: ["ext"],
          subtitle: "Копирует все ссылки из браузера в список",
          faIcon: "chrome"

        },
        {
          title: "WhatFont",
          to: "https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm",
          tags: ["ext"],
          subtitle: "Определяет шрифт на странице",
          faIcon: "chrome"

        },

        {
          title: "GoFullPage - Full Page Screen Capture",
          to: "https://chrome.google.com/webstore/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl",
          tags: ["ext"],
          subtitle: "Скриншотит страницу полностью",
          faIcon: "chrome"
        }
      ]
    },
    {
      section: "Контент", cards: [
        { to: "https://symbl.cc/en/", title: "SYMBL", subtitle: "Все Unicode символы", icon: "(◕‿◕)", tags: ["text"] },
        {
          to: "https://lingojam.com/",
          title: "LingoJam",
          subtitle: "Делает текст п̶̡͎̳͉͎̉̒̈́͛͌͗͗̈́̅̄͘ͅр̴̢̧̩̤͓͇͎͇̦͔͙̻̠͙̺̋̅̏́͊̇̎͝и̵̡̬̙̭̥͍͔̞̠̮̬͈̣͊̀̚͜ќ̶̨̠̠̙̯̻͓̼̖͐́́̊͆͝о̸̨̨̥̱͓̩͖͔̠̲̭̫̠̍л̷̮̘̪̪̮̦̐̈̀̈ͅь̵̛̖͚̐̍͛̋͗̌̇̿̔͊̆͘͜н̶̙̰́̀̎̕̕͝͠ы̷̨̦̫̺̥̜̰̹͕̟͍̥̑̓̾̓̀̓͛͛͝м̸̢̬̠̺̝̬͍̩͖̹͖̗̖̻̲̆̊̇̀̎̑̈́  и 𝒶𝑒𝓈𝓉𝒽𝑒𝓉𝒾𝒸",
          imgIcon: FaLang,
          tags: ["text"]
        },
        {
          to: "https://picsum.photos/",
          title: "Lorem Picsum",
          subtitle: "The Lorem Ipsum для картинок",
          imgIcon: Lorem,
          tags: ["image", "mock"]
        },
        {
          to: "https://dog.ceo/dog-api/",
          title: "Dog API",
          subtitle: "Апишка с картинками собакенов",
          imgIcon: DogApi,
          tags: ["image", "mock"]
        },
        {
          to: "https://placehold.co/",
          title: "placehold.co",
          subtitle: "Тупа картинки-заглушки",
          icon: "⬜",
          tags: ["image", "mock"]
        }
      ]
    },
    {
      section: "Продуктивность", cards: [

        {
          img: PowerToys,
          to: "https://learn.microsoft.com/en-us/windows/powertoys/",
          title: "PowerToys",
          subtitle: "Утилитки на Винду: Color Picker • Window Management • Поиск курсора и прочее",
          tags: ["multi", "win"],
          rows: 2
        },
        {
          title: "Open Multiple URLs",
          to: "https://chrome.google.com/webstore/detail/open-multiple-urls/oifijhaokejakekmnjmphonojcfkpbbh",
          tags: ["ext"],
          subtitle: "Открывает список ссылок",
          faIcon: "chrome"
        },
        {
          title: "JSON Viewer",
          to: "https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh",
          tags: ["ext", "dev"],
          subtitle: "Форматирует json в браузере",
          faIcon: "chrome"

        },
        {
          rows: 3,
          to: "https://magicstudio.com/ru/magiceraser",
          title: "MagicEraser",
          subtitle: "Стереть ненужное",
          img: MagicEraser,
          tags: ["image"]
        },
        {
          to: "https://www.erase.bg/ru",
          title: "Erase.bg",
          subtitle: "Удаляет бекграунд",
          img: EraseBg,
          tags: ["image"],
          rows: 2
        },
        {
          to: "https://squoosh.app/",
          title: "Squoosh",
          subtitle: "Сжимает картинки хорошо",
          img: Squoosh,
          tags: ["image"],
          rows: 2
        },
        {
          to: "https://tinywow.com/",
          img: TinyWow,
          title: "TinyWow",
          subtitle: "Работа с файлами: PDF • Картинки • Видео • Генерация Текста",
          tags: ["multi", "image", "ai"],
          rows: 2
        },
        {
          to: "https://magicstudio.com/ru",
          img: MagicStudio,
          title: "MagicStudio",
          subtitle: "Работа с картинками: Удаление лишнего • Генерация • Увеличение",
          tags: ["multi", "image", "ai"],
          rows: 2
        },
        {
          imgIcon: ShareX,
          to: "https://getsharex.com/",
          title: "ShareX",
          subtitle: "Гифкоделалка, скриншотилка и тд",
          tags: ["multi", "win"]
        }


      ]
    },

    {
      section: "Редакторы кода / текста", cards: [
        {
          to: "https://www.jetbrains.com/",
          title: "PyCharm / WebStorm / ...",
          subtitle: "IDE от JetBrains - лучшие",
          tags: ["editor", "dev"]
        },
        {
          to: "https://code.visualstudio.com//",
          title: "VsCode",
          subtitle: "IDE от Microsoft - когда чего-то не хватает в JetBrains",
          tags: ["editor", "dev"]
        },
        {
          to: "https://obsidian.md/",
          title: "Obsidian",
          subtitle: "Лучший Markdown редактор / локальная база знаний",
          tags: ["editor", "dev"]
        }
      ]
    },
    {
      section: "Разработка + AI", cards: [
        {
          to: "https://github.com/features/copilot",
          title: "Copilot",
          subtitle: "Платный AI-авто-комплит в IDE от GitHub",
          imgIcon: Copilot,
          tags: ["ai", "dev"]
        },
        {
          to: "https://aws.amazon.com/ru/codewhisperer/",
          title: "CodeWhisperer",
          subtitle: "Copilot от AWS",
          imgIcon: AwsCw,
          tags: ["ai", "dev"]
        },
        { to: "https://www.phind.com/", title: "phind", subtitle: "AI-поиск для кода", imgIcon: Phind, tags: ["ai"] }
      ]
    },
    {
      section: "Утилитки для разработки", cards: [
        {
          to: "https://github.com/typicode/json-server",
          title: "json-server",
          subtitle: "REST-апишка-круд из json-файла",
          faIcon: "github",
          tags: ["dev"]
        },
        {
          img: DevToysInterface,
          imgIcon: DevToys,
          to: "https://devtoys.app",
          title: "DevToys",
          subtitle: "Утилитки для разработки: форматтеры, де/енкодеры, конвертеры",
          tags: ["multi", "win", "dev"],
          rows: 3
        },
        {
          to: "https://www.postman.com/",
          title: "Postman",
          subtitle: "Лучший HTTP-клиент, хорош для коллаборации",
          tags: ["dev"]
        },


        {
          to: "https://codebeautify.org/",
          title: "codebeautify",
          subtitle: "Форматтеры для любого языка",
          tags: ["dev"]
        }, {
          to: "https://www.strfti.me/",
          title: "strfti.me",
          subtitle: "Форматтеры дат",
          tags: ["dev"]
        }
      ]
    },
    {
      section: "Подборки для разработки", cards: [
        {
          to: "https://github.com/sindresorhus/awesome",
          title: "awesome",
          subtitle: "Подборка с подборками по технологиям",
          icon: "😎",
          tags: ["dev"]
        },
        {
          to: "https://free-for.dev/",
          title: "freefordev",
          subtitle: "Подборка бесплатных штук для разработки",
          faIcon: "github",
          tags: ["dev"]
        },
        {
          to: "https://rapidapi.com/",
          title: "rapidapi",
          subtitle: "Платформа для апишек",
          imgIcon: RapidApi,
          tags: ["dev"]
        },
        {
          to: "https://github.com/public-apis/public-apis",
          title: "public-apis",
          subtitle: "Подборка апишек",
          faIcon: "github",
          tags: ["dev"]
        }

      ]
    },

    {
      section: "VPN", cards:
        [
          {
            to: "https://surfshark.club/friend/VCC4DRsx",
            title: "SurfShark",
            imgIcon: Surfshark,
            subtitle: "Хороший платный VPN: быстрый, безлимит по девайсам, интеграция с OpenVPN",
            tags: ["vpn"]
          },
          {
            to: "https://fuckrkn1.org/#ru",
            title: "FuckRKN",
            imgIcon: FuckRKN,
            bg: "black",
            extraClass: "text-white",
            subtitle: ">Делаем некомерческий VPN, не собирающий никаких данных",
            tags: ["vpn"]
          },
          {
            to: "https://vanyavpn.com/",
            title: "Дядя Ваня VPN",
            imgIcon: VanyaVPN,
            bg: "#ff0412",
            extraClass: "text-yellow-300",
            subtitle: ">Ваш личный VPN, который не заблокируют.",
            tags: ["vpn"]
          }
        ]
    },
    {
      section: "Склад 📦",
      cards: [
        {
          to: "https://www.bing.com/images/create",
          title: "Генератор картинок от Bing",
          faIcon: "windows",
          tags: ["image", "mock", "ai"]
        },
        { to: "https://twitter.com/hasantoxr", title: "Чел обозревает ai-тулзы", tags: ["ai"], faIcon: "twitter" },
        {
          to: "https://vc.ru/services/683398-30-poleznyh-neyrosetey-dlya-rutiny",
          title: "30 полезных нейросетей для рутины",
          subtitle: "Жесть, конечно, понаделали",
          tags: ["ai"],
          imgIcon: VcRu
        },
        {
          to: "https://vc.ru/services/681031-servisy-na-osnove-ii-dlya-raboty-s-tekstom-samyy-polnyy-obzor-instrumentov-na-russkom-yazyke",
          title: "Сервисы на основе ИИ для работы с текстом",
          tags: ["ai"],
          imgIcon: VcRu
        },
        {
          to: "https://huggingface.co/blog/starcoder",
          title: "StarCoder",
          subtitle: "[новиночка] Copilot от HuggingFace",
          icon: "🤗",
          tags: ["ai", "dev"]
        },
        {
          to: "https://sourceforge.net/software/ai-coding-assistants/",
          title: "Подборка ai-тулзов на SourceForge",
          subtitle: "Ai-тулзов для разработки уже десятки",
          tags: ["ai", "dev"]
        }

      ]
    }
  ];
  let selectedTag: Tag | null = null;
  $: tagCards = sections.flatMap(s => s.cards).filter(c => c.tags?.includes(selectedTag!));

</script>

<ArticleHeader>
  Инструментарий 🔨🪚🪓🔧🪛⛏️
  <div slot="desc">Тулзы для дизайна, разработки и прочего креатива</div>
</ArticleHeader>

<div class="flex gap-2 flex-wrap items-center">
  {#each Object.entries(tags) as [tag, tagStr]}
    <button
      class={`py-2 px-4 bg-blue-50 hover:bg-blue-100  text-semibold rounded-full ${selectedTag === tag ? ' border-blue-200 border-2' : ''}`}
      on:click={() => {selectedTag = selectedTag === tag ? null : tag}}>
      {tagStr}
    </button>
  {/each}
</div>

{#if selectedTag}
  <H2>{tags[selectedTag]}</H2>
  <GotyGrid>
    {#each tagCards as data, i (`tags-${data.title}`)}
      <GotyCard {data}></GotyCard>
    {/each}
  </GotyGrid>
{:else}
  {#each sections as section}
    <H2>{section.section}</H2>
    <GotyGrid>
      {#each section.cards as data}
        <GotyCard {data}></GotyCard>
      {/each}
    </GotyGrid>
  {/each}


{/if}

