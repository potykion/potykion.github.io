<script lang="ts">
  export let href: string;
</script>

<a class="text-blue-400 hover:text-blue-500 underline" {href} target="_blank">
  <slot></slot>
</a>