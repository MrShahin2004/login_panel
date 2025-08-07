<template>
  <div class="flex justify-center items-center">
    <div class="last-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="LastSender" v-model="InsertedLastName" class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="text" id="last-input">
      <div class="flex justify-center items-center">
        <label for="last-input">نام خانوداگی</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedLastName = ref("");

    function LastSender() {
      context.emit("LastSent", InsertedLastName.value);
    }

    return {InsertedLastName, LastSender};
  }
}
</script>

<style scoped>
.last-input {
  padding: 0.5rem;
}

label {
  font-family: YekanBakh, sans-serif;
}
</style>
