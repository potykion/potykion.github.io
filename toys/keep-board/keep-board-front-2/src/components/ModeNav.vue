<script setup lang="ts">


import {useModeStore} from "@/stores/mode";
import {useUserStore} from "@/stores/user";

const modeStore = useModeStore();
const userStore = useUserStore();

</script>

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
              D
            </button>
            <button
                :class="['button', 'btn-small-mobile', 'is-warning', {'has-text-weight-bold': modeStore.mode === 'weekly'}]"
                @click="modeStore.setMode('weekly')">
              W
            </button>
            <button
                :class="['button', 'btn-small-mobile', 'is-warning', {'has-text-weight-bold': modeStore.mode === 'monthly'}]"
                @click="modeStore.setMode('monthly')">
              M
            </button>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <figure class="image" v-if="userStore.user">
            <img class="is-rounded" :src="userStore.user.picture">
          </figure>
        </div>
      </div>
    </div>

  </nav>
</template>


<style scoped>

</style>
