<script lang="ts">
  import Figure from "$lib/design-system/atoms/Figure.svelte";

  export let src: string;

  export let caption;

</script>

<Figure>
  <img class=" rounded-xl w-full md:w-fit max-w-sm" {src}>
  <figcaption>{caption}</figcaption>
</Figure>