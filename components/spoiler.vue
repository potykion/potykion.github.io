<template>
  <div class="inline">
    <div class="inline">
      <slot></slot>
      <span @click="open = !open" class="cursor-pointer ">
      <template v-if="open">🔼</template>
      <template v-else>🔽</template>
    </span>
    </div>


    <template v-if="open">
      <div>
        <slot name="spoiled"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">

import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator"

/**
 * Юзадж:
 *
 * <spoiler>op
 * <template v-slot:spoiled>oppa</template>
 * </spoiler>
 */
@Component({})
export default class Spoiler extends Vue {
  open = false;


}
</script>

<style scoped>


</style>
