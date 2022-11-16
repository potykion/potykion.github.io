<template>
  <div v-if="noteStore.loading">Грузим...</div>
  <div v-else class="columns is-variable is-1">
    <button class="button is-white" @click="dateRangeStore.shift(-1)">
      ◀ <span class="is-hidden-tablet">&nbsp; Туда</span>
    </button>
    <div class="column" v-for="col in noteStore.noteBoard.cols">
      <div class="block has-text-centered" v-html="col.title"></div>

      <template v-for="note in col.notes">
        <div class="card block">
          <div class="card-image" v-if="note.image">
            <figure class="image is-4by3">
              <img :src="note.image">
            </figure>
          </div>
          <div class="card-content">
            <div class="note-font-size" style="white-space: pre-line" v-html="note.text"></div>
          </div>
          <footer class="card-footer" v-if="userStore.user && userStore.user.isAdmin">
            <button class="button is-white card-footer-item note-font-size" @click="openEditNoteModal(note)">✏️
            </button>
            <a :href="note.url" target="_blank" class="button is-white card-footer-item note-font-size">🔗</a>
          </footer>
        </div>
      </template>

      <div v-if="col.isToday && col.notes.length === 0 && userStore.user && userStore.user.isAdmin ">
        <div class="card block">
          <footer class="card-footer">
            <button class="button is-white card-footer-item note-font-size" @click="openCreateNoteModal">➕
            </button>
          </footer>
        </div>
      </div>
    </div>

    <button class="button is-white" @click="dateRangeStore.shift(1)">
      <span class="is-hidden-tablet">Сюда &nbsp;</span>▶
    </button>
  </div>

  <NotePointFormModal v-model="opened"></NotePointFormModal>

</template>
<script setup lang="ts">


import {useDateRangeStore} from "@/stores/date-range";
import {useNoteStore} from "@/stores/note";
import {useUserStore} from "@/stores/user";
import {usePointStore} from "@/stores/point";
import NotePointFormModal from "./NotePointFormModal.vue";
import {ref} from "vue";
import type {Note} from "@/logic/note";

const dateRangeStore = useDateRangeStore();
const noteStore = useNoteStore();
const pointStore = usePointStore();

const userStore = useUserStore();

const opened = ref(false);

function openCreateNoteModal() {
  pointStore.openCreateNoteModal();
  opened.value = true;
}

function openEditNoteModal(note: Note) {
  pointStore.openEditNoteModal(note);
  opened.value = true;
}

</script>
<style scoped>

</style>