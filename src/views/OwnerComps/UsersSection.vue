<template>
  <div class="w-[100%] h-[100%] flex justify-center items-center">
    <div class="main-container w-[90%] h-[93%] rounded-[6px] border border-black border-solid">
      <div class="title-div w-[100%] h-[10%] flex justify-center items-center">
        <h2 class="text-[24px]">فهرست کاربران عادی <i class="fas fa-user"></i></h2>
      </div>
      <div class="button-div w-[100%] h-[10%] flex justify-center items-center">
        <button class="h-fit bg-[var(--btn-bg)] rounded-[6px]"
                style="color: white; padding: 0.5rem">نمایش همه
        </button>
      </div>
      <div class="content-div w-[100%] h-[80%] flex justify-center items-center">
        <p class="big-placeholder text-[40px] opacity-50">.فعالیتی انجام نشده است</p>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  setup() {
    let AllUsersFromServer = reactive(["Yo", "This"]);

    return {AllUsersFromServer};
  }
}
</script>

<style scoped></style>
