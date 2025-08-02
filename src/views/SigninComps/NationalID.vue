<template>
  <div class="flex justify-center items-center">
    <div class="national-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="NationalSender" v-model="InsertedNational" class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="text" id="user-input">
      <div class="flex justify-center items-center">
        <label for="user-input">کد ملی</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedNational = ref("");

    function NationalSender() {
      context.emit("NationalSent", InsertedNational.value);
    }

    return {InsertedNational, NationalSender};
  }
}
</script>

<style scoped>
.national-input {
  padding: 0.5rem;
}

label {
  font-family: "B Nazanin", cursive;
}
</style>
