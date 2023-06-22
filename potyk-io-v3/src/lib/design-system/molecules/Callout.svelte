<script lang="ts">
  export let icon: string = "💡";
</script>

<div class="rounded-xl shadow px-2 py-2 !my-4 md:p-4 bg-yellow-50 flex space-x-2 ">
  <div class="py-2 text-lg md:text-xl">
    {icon}
  </div>
  <div>
    <div class="text-lg md:text-xl font-bold py-2">
      <slot />
    </div>
    <div class="mb-2">
      <slot name="desc" />
    </div>
  </div>
</div>
