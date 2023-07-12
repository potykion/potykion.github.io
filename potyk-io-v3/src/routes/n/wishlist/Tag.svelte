<script lang="ts">

  export let to: string;
  let class_ = "";
  export { class_ as class };
</script>

<a
  href={to}
  target="_blank"
  class={` rounded-lg inline-block px-2 py-1 font-semibold text-sm ${class_}`}
>
  <slot></slot>
</a>