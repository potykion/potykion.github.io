<script lang="ts">
  let class_: string;
  export { class_ as class };

  export let nested = false;

</script>

<ul class={`list-disc list-inside ${nested ? 'ml-6' : ''} ${class_}`}>
  <slot></slot>
</ul>