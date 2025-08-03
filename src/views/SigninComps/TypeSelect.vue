<template>
  <div class="flex justify-center items-center">
    <div class="type-input select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[70%]">
      <select id="user-input" @change="TypeSender" v-model="InsertedType"
              class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
              dir="rtl">
        <option class="bg-[white]" value="Choose">انتخاب کنید</option>
        <option class="bg-[white]" value="کاربر ثبات">کاربر ثبات</option>
        <option class="bg-[white]" value="کاربر اداره کل">کاربر اداره کل</option>
      </select>
      <div class="flex justify-center items-center">
        <label for="user-input">انتخاب نقش</label>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(props, context) {
    let InsertedType = ref("");

    function TypeSender() {
      context.emit("TypeSent", InsertedType.value);
    }

    return {InsertedType, TypeSender};
  }
}
</script>

<style scoped>
.type-input {
  padding: 0.5rem;
}

label {
  font-family: "B Nazanin", cursive;
}

select {
  padding: 0.5rem;
}

option {
  font-family: "B Nazanin", cursive;
  padding: 0.5rem;
}
</style>
