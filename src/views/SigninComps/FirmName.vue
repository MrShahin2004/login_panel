<template>
  <div class="flex justify-center items-center">
    <div class="firm-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="FirmSender" v-model="InsertedFirm" class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="text" id="firm-input">
      <div class="flex justify-center items-center">
        <label for="firm-input">نام شرکت</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedFirm = ref("");

    function FirmSender() {
      context.emit("FirmSent", InsertedFirm.value);
    }

    return {InsertedFirm, FirmSender};
  }
}
</script>

<style scoped>
.firm-input {
  padding: 0.5rem;
}

label {
  font-family: YekanBakh, sans-serif;
}
</style>
