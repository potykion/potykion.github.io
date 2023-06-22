<script lang="ts">
  import Figure from "$lib/design-system/atoms/Figure.svelte";

  export let src: string;
  export let caption;
</script>

<Figure>
  <img {src} class="rounded-xl w-full max-w-4xl">
  <figcaption>{caption}</figcaption>
</Figure>