<template>
  <div class="flex justify-center items-center">
    <div class="email-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="EmailSender" v-model="InsertedEmail"
             class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="text" id="email-input">
      <div class="flex justify-center items-center">
        <label for="email-input">آدرس ایمیل</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedEmail = ref("");

    function EmailSender() {
      context.emit("EmailSent", InsertedEmail.value);
    }

    return {InsertedEmail, EmailSender};
  }
}
</script>

<style scoped>
.email-input {
  padding: 0.5rem;
}

label {
  font-family: "B Nazanin", cursive;
}
</style>
