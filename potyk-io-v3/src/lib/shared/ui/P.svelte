<script lang="ts">
  let class_: string = '';
  export { class_ as class };


</script>

<p class={`md:text-lg py-1 md:py-2 ${class_}`}>
  <slot />
</p>
