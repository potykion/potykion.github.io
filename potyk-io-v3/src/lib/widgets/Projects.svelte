<script lang="ts">
  import GotyGrid from "$lib/entities/goty/ui/GotyGrid.svelte";
  import GotyCard from "$lib/entities/goty/ui/GotyCard.svelte";

  import H2 from "$lib/shared/ui/H2.svelte";
  import Sup from "$lib/shared/ui/Sup.svelte";
  import Tg from "./assets/tg.png";
</script>

<H2>Делаю</H2>

<GotyGrid>
  <GotyCard
    to="https://t.me/potyk_weekly"
    imgIcon={Tg}
    subtitle="Раз в неделю делюсь находками и приколюхами в Телеге"
  >
    потик викли
  </GotyCard>

  <GotyCard to="https://potyk.io/potyk-base/" icon="🪨" title="potyk-base" subtitle="База знаний" />

  <GotyCard
    to="https://skovoroda.website.yandexcloud.net/"
    icon="🍳"
    title="скорода"
    subtitle="Книга рецептов"
  />
  <GotyCard
    to="https://github.com/potykion/player"
    icon="🎵"
    subtitle="Нормальный музыкальный сервис"
  >
    плеер <Sup status="wip" />

  </GotyCard>

	<GotyCard status="new" to="https://www.instagram.com/potyk.art/" icon="🖼️" subtitle="Рисую чертей в Инстухе" title="potyk.art"></GotyCard>
	<GotyCard  to="https://twitter.com/PotykN66888" icon="🐦" subtitle="Лайкаю обнаженку в Тви" title="potyk.nsfw"></GotyCard>

</GotyGrid>
