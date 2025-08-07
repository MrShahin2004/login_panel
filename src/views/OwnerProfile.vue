<template>
  <div class="w-[100vw] h-[100vh]">
    <h1>Welcome to your own panel, {{ username }}!</h1>
    <h1>You are the owner of this app.</h1>
    <button
        @click="ReturnToLogin"
        class="text-[white] bg-[var(--btn-bg)] rounded-[6px] cursor-pointer"
        style="padding: 0.5rem">Back to login
    </button>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "OwnerProfile",
  props: {
    username: String
  },
  setup() {
    let Router = useRouter()

    function ReturnToLogin() {
      Router.push({name: "Home"});
    }

    return {ReturnToLogin};
  }
};
</script>

<style></style>
