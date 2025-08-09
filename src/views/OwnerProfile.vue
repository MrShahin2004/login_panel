<template>
  <div class="w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center">
    <div class="side-panel w-[20%] h-[100%] relative flex justify-center items-center">
      <div class="w-[80%] h-[92%] bg-[var(--body-bg)] rounded-[6px]">
        <div class="title-section text-[20px] font-bold w-[100%] h-[10%] flex justify-center items-center">
          <h2>{{ username }}</h2>
        </div>
        <hr>
        <div class="info-section w-[100%] h-[90%]"></div>
      </div>
    </div>
    <div class="main-content w-[80%] h-[100%] relative flex justify-center items-center">
      <div class="w-[95%] h-[92%] bg-[var(--body-bg)] rounded-[6px]"></div>
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

<style>
hr {
  border: none;
  border-top: 1px solid black;
}
</style>
