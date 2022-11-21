<script setup lang="ts">
import NoteBoard from '@/components/NoteBoard.vue';
import ModeNav from "@/components/ModeNav.vue";
import {useRouter} from 'vue-router'
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {useNoteStore} from "@/stores/note";

const userStore = useUserStore();
const noteStore = useNoteStore();
const router = useRouter();

onMounted(() => {
  userStore.loadFromCache();
  if (userStore.user) {
    noteStore.loadNotes();
  } else {
    router.push({name: 'login'});
  }
});

</script>

<template>
  <header>
    <ModeNav></ModeNav>
  </header>
  <main>
    <section class="pt-4">
      <div class="container is-fluid">
        <NoteBoard></NoteBoard>
      </div>
    </section>
  </main>
</template>

