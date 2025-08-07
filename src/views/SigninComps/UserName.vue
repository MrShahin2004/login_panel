<template>
  <div class="flex justify-center items-center">
    <div class="user-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="UserSender" v-model="InsertedUser" class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="text" id="user-input">
      <div class="flex justify-center items-center">
        <label for="user-input">نام کاربری</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedUser = ref("");

    function UserSender() {
      context.emit("UserSent", InsertedUser.value);
    }

    return {InsertedUser, UserSender};
  }
}
</script>

<style scoped>
.user-input {
  padding: 0.5rem;
}

label {
  font-family: YekanBakh, sans-serif;
}
</style>
