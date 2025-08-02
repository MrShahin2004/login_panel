<template>
  <div class="flex justify-center items-center">
    <div class="first-input bg-[#f3f4f6] select-box h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="FirstSender"
             class="bg-[#dbeafe] w-[100%] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="text" id="user-input" v-model="InsertedFirstName">
      <div class="flex justify-center items-center">
        <label for="user-input">نام</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedFirstName = ref("");

    function FirstSender() {
      context.emit("FirstSent", InsertedFirstName.value);
    }

    return {InsertedFirstName, FirstSender};
  }
}
</script>

<style scoped>
.first-input {
  padding: 0.5rem;
}

label {
  font-family: "B Nazanin", cursive;
}
</style>
