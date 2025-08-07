<template>
  <div class="flex justify-center items-center">
    <div class="pass-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <input @input="PassSender" v-model="InsertedPass" class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
             dir="rtl" type="password" id="pass-input">
      <div class="flex justify-center items-center">
        <label for="pass-input">گذرواژه</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedPass = ref("");

    function PassSender() {
      context.emit("PassSent", InsertedPass.value);
    }

    return {InsertedPass, PassSender};
  }
}
</script>

<style scoped>
.pass-input {
  padding: 0.5rem;
}

label {
  font-family: YekanBakh, sans-serif;
}
</style>
