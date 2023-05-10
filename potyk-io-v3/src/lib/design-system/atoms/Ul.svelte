<script lang="ts">
  let class_: string;
  export { class_ as class };

</script>

<ul class={`list-disc list-inside ${class_}`}>
  <slot></slot>
</ul>