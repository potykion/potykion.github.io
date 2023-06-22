<script lang="ts">
  export let href: string;
</script>

<a class="text-blue-400 hover:text-blue-500 underline font-semibold" {href} target="_blank">
  <slot></slot>
</a>