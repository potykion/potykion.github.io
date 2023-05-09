<script>
  import H1 from "$lib/design-system/atoms/H1.svelte";
  import Breadcrumbs from "$lib/design-system/molecules/Breadcrumbs.svelte";
</script>

<div class="flex gap-2">
  <div class="text-2xl md:text-5xl font-black">
    <Breadcrumbs></Breadcrumbs>
  </div>
  <div class="flex flex-col gap-2">
    <H1>
      <slot></slot>
    </H1>
    <div class="text-xl">
      <slot name="desc"></slot>
    </div>
  </div>
</div>

<hr class="py-2">
