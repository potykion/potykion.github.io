<template>
  <nuxt-link :to="to"
             class="no-underline text-white visited:text-white font-display leading-none h-14  flex justify-center  items-center"
             active-class="font-bold border-b-4">
    <div>
      <span :class="emote ? 'hidden lg:inline' : ''">{{ title }}</span>
      <twitch-emote v-if="emote" :small="true" :emote="emote"></twitch-emote>
    </div>
  </nuxt-link>


</template>

<script lang="ts">

import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator"

@Component({})
export default class NavItem extends Vue {
  @Prop() to!: string;
  @Prop() title!: string;
  @Prop() emote!: string;
}
</script>
