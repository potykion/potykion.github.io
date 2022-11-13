<template>
  <nav class="navbar has-background-warning is-flex" role="navigation" aria-label="main navigation">
    <div class="navbar-brand ">
      <div class="navbar-item">
        <div class="is-size-4 is-size-6-mobile has-text-weight-bold">KeepBoard</div>
      </div>
    </div>

    <div
        class="navbar-menu is-active is-flex has-background-warning is-flex-grow-1 is-justify-content-space-between is-shadowless is-align-items-center">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <button
                :class="['button', 'btn-small-mobile', 'is-warning', {'has-text-weight-bold': modeStore.mode === 'daily'}]"
                @click="modeStore.setMode('daily')">
              Дни
            </button>
            <button
                :class="['button', 'btn-small-mobile', 'is-warning', {'has-text-weight-bold': modeStore.mode === 'weekly'}]"
                @click="modeStore.setMode('weekly')">
              Недели
            </button>
          </div>
        </div>
      </div>
       <div class="navbar-end">
                <div class="navbar-item">
                  <button class="button is-warning " @click="loadNotes(true)" :disabled="loading">
                    {{ loading ? '⏳' : '↻' }}
                  </button>
                </div>
                <div class="navbar-item">
                  <figure class="image" v-if="user">
                    <img class="is-rounded" :src="user.picture">
                  </figure>
                  <div id="google-auth" v-else></div>
                </div>
              </div> 
    </div>

  </nav>
</template>

<script setup lang="ts">
import { setupModal } from "@/logic/modal";
import {useModeStore} from "@/stores/mode";
import { useNoteStore } from "@/stores/note";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const modeStore = useModeStore();
const {loadNotes, loading} = useNoteStore();
const {user} = useUserStore();

</script>

<style scoped>

</style>