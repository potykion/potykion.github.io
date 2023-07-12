<script lang="ts">
  export let to: string;

</script>

<a href={to} class="border-4 border-blue-200 rounded-lg hover:border-blue-500 px-4 py-8 text-xl ">
  <slot></slot>
</a>