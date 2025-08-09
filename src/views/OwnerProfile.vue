<template>
  <div class="w-[100vw] h-[100vh] flex justify-center items-center">
    <div class="side-panel w-[20%] h-[100%]"></div>
    <div class="main-content w-[80%] h-[100%]">
      <h1>Welcome to your own panel, {{ username }}!</h1>
      <h1>You are the owner of this app.</h1>
      <button
          @click="ReturnToLogin"
          class="text-[white] bg-[var(--btn-bg)] rounded-[6px] cursor-pointer"
          style="padding: 0.5rem">Back to login
      </button>
    </div>
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

    return {ReturnToLogin, Router};
  }
};
</script>

<style></style>
