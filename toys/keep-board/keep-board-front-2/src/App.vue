

<template>
  <header>
    <ModeNav></ModeNav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ModeNav from "@/components/ModeNav.vue";
import { onMounted } from 'vue';
import { useNoteStore } from './stores/note';
import { useUserStore } from './stores/user';

const noteStore = useNoteStore();
const userStore = useUserStore();

onMounted(() => {
  noteStore.loadNotes();
  userStore.loadFromCache();
});

</script>

<style scoped>

</style>
