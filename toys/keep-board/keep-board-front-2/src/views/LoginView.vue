<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const handleLoginSuccess = (response: CredentialResponse) => {
  userStore.auth(response.credential!);
  router.push({name: 'home'});
};


</script>
<template>
  <main>
    <section class="hero is-fullheight has-background-warning">
      <div class="hero-body">
        <div class="container is-flex is-justify-content-center">
          <GoogleSignInButton
              @success="handleLoginSuccess"></GoogleSignInButton>
        </div>
      </div>
    </section>
  </main>
</template>

