<script lang="ts">
  export let status: "new" | "wip";


  $: statusColor = status === "new"
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
</script>


<sup class={`px-2 py-1  rounded-full ${statusColor}`}>{status}</sup>