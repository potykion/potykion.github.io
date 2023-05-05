<script>
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
  import PowerToys from "$lib/assets/tools/powertoys.png";
  import Squoosh from "$lib/assets/tools/squoosh.jpg";
  import Surfshark from "$lib/assets/tools/surfshark.webp";
  import FuckRKN from "$lib/assets/tools/fuckrkn.png";
  import VanyaVPN from "$lib/assets/tools/vanyavpn.png";
</script>

<ArticleHeader>Инструментарий 🔨🪚🪓🔧🪛⛏️</ArticleHeader>

<H2>Работа с изображениями</H2>

<GotyGrid>
  <GotyCard class="lg:grid-rows-2" to="https://magicstudio.com/ru/magiceraser" title="MagicEraser"
            subtitle="Стереть ненужное" img={MagicEraser}></GotyCard>
  <GotyCard to="https://www.erase.bg/ru" title="Erase.bg" subtitle="Удаляет бекграунд" img={EraseBg}></GotyCard>

  <GotyCard to="https://squoosh.app/" title="Squoosh" subtitle="Сжимает картинки" img={Squoosh}></GotyCard>

</GotyGrid>

<H2>Мультитулы</H2>

<GotyGrid>
  <GotyCard to="https://tinywow.com/" img={TinyWow} title="TinyWow"
            subtitle="Работа с файлами: PDF • Картинки • Видео • Генерация Текста"></GotyCard>
  <GotyCard to="https://magicstudio.com/ru" img={MagicStudio} title="MagicStudio"
            subtitle="Работа с картинками: Удаление лишнего • Генерация • Увеличение"></GotyCard>
  <GotyCard img={PowerToys} to="https://learn.microsoft.com/en-us/windows/powertoys/" title="PowerToys"
            subtitle="Утилитки на Винду: Color Picker • Window Management • Поиск курсора и тд"></GotyCard>

</GotyGrid>

<H2>Вдохновление</H2>

<GotyGrid>

  <GotyCard to="https://mobbin.com/browse/ios/apps/" title="Mobbin" imgIcon={Mobbin}
            subtitle="Скрины приложух"></GotyCard>
  <GotyCard bg="#ffe4d3" to="https://chamjo.design/" title="Chamjo" imgIcon={Chamjo}
            subtitle="Еще скрины приложух"></GotyCard>
  <GotyCard to="https://dribbble.com/" title="Dribbble" imgIcon={Dribbble}
            subtitle="Дезигн несуществующих приложух"></GotyCard>

</GotyGrid>

<H2>VPN</H2>

<GotyGrid>
  <GotyCard to="https://surfshark.club/friend/VCC4DRsx" title="SurfShark" imgIcon={Surfshark}
            subtitle="Хороший платный VPN: быстрый, безлимит по девайсам, интеграция с OpenVPN"></GotyCard>
  <GotyCard to="https://fuckrkn1.org/#ru" title="FuckRKN" imgIcon={FuckRKN} bg="black" class="text-white"
            subtitle=">Делаем некомерческий VPN, не собирающий никаких данных"></GotyCard>
  <GotyCard to="https://vanyavpn.com/" title="Дядя Ваня VPN" imgIcon={VanyaVPN} bg="#ff0412" class="text-yellow-300"
            subtitle=">Ваш личный VPN, который не заблокируют."></GotyCard>
</GotyGrid>